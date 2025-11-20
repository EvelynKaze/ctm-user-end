"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import WithdrawalModal from "@/components/modals/withdrawal-modal";
import { toast } from "sonner"
import { clearStockOption } from "@/store/stockOptionsSlice";
import { clearCopyTrade } from "@/store/copyTradeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { withdraw } from "@/app/actions/withdraw";
import { fetchAvailableTokens } from "@/app/actions/fetchAvailableTokens";
import { validateWithdrawal } from "@/app/actions/validateWithdrawal";
import { getStoredToken } from "@/app/actions/auth";

const withdrawalSchema = z.object({
    currency: z.string().nonempty("Please select a cryptocurrency."),
    amount: z.number().positive("Amount must be a positive number."),
    address: z.string().nonempty("Please enter a wallet address."),
});

type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;

const Withdrawal = () => {
    const { userData } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [availableTokens, setAvailableTokens] = useState<{ tokenName: string; amount: number; averagePrice: number }[]>([]);
    const [isLoadingTokens, setIsLoadingTokens] = useState(true);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [usdValue, setUsdValue] = useState<number | null>(null);
    const [isValidating, setIsValidating] = useState(false);
    const form = useForm<WithdrawalFormValues>({
        resolver: zodResolver(withdrawalSchema),
        defaultValues: {
            currency: "",
            amount: 0,
            address: "",
        },
        mode: "onChange",
    });

    // Fetch available tokens from user's portfolio
    useEffect(() => {
        const getAvailableTokens = async () => {
          setIsLoadingTokens(true);
          try {
            const token = getStoredToken();
            
            if (!token) {
              toast("Error", {
                description: "Authentication token not found. Please log in again.",
              });
              setIsLoadingTokens(false);
              return;
            }

            const tokens = await fetchAvailableTokens(token);
            
            if (tokens && tokens.length > 0) {
              setAvailableTokens(tokens);
            } else {
              setAvailableTokens([]);
              toast("Info", {
                description: "You don't have any tokens in your portfolio to withdraw.",
              });
            }
          } catch (error) {
            console.error("Error fetching available tokens:", error);
            toast("Error", {
              description: "Failed to fetch available tokens.",
            });
            setAvailableTokens([]);
          } finally {
            setIsLoadingTokens(false);
          }
        };
    
        getAvailableTokens();
        dispatch(clearStockOption());
        dispatch(clearCopyTrade());
      }, [dispatch]);

    // Watch form values for validation
    const watchedCurrency = useWatch({ control: form.control, name: "currency" });
    const watchedAmount = useWatch({ control: form.control, name: "amount" });

    // Validate withdrawal when token or amount changes
    useEffect(() => {
        const validate = async () => {
          if (!watchedCurrency || !watchedAmount || watchedAmount <= 0) {
            setValidationError(null);
            setUsdValue(null);
            setIsValidating(false);
            return;
          }

          setIsValidating(true);
          setValidationError(null);
          
          try {
            const token = getStoredToken();
            
            if (!token) {
              setValidationError("Authentication token not found. Please log in again.");
              setIsValidating(false);
              return;
            }

            const validation = await validateWithdrawal(
              {
                tokenName: watchedCurrency,
                amount: watchedAmount,
              },
              token
            );

            if (!validation) {
              setValidationError("Failed to validate withdrawal. Please try again.");
              setUsdValue(null);
              return;
            }

            if (validation.valid) {
              setValidationError(null);
              setUsdValue(validation.usdValue);
            } else {
              setValidationError(validation.reason);
              setUsdValue(null);
              
              // Show specific error messages
              if (validation.code === "INSUFFICIENT_TOKEN_BALANCE" && validation.available !== undefined) {
                form.setError("amount", {
                  type: "manual",
                  message: `Insufficient balance. Available: ${validation.available}`,
                });
              } else if (validation.code === "TOKEN_NOT_IN_PORTFOLIO") {
                form.setError("currency", {
                  type: "manual",
                  message: validation.reason,
                });
              }
            }
          } catch (error) {
            console.error("Validation error:", error);
            setValidationError("Failed to validate withdrawal.");
            setUsdValue(null);
          } finally {
            setIsValidating(false);
          }
        };

        // Debounce validation
        const timeoutId = setTimeout(validate, 500);
        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [watchedCurrency, watchedAmount, form.setError]);

    const onSubmit = async (data: WithdrawalFormValues) => {
        setIsValidating(true);
        try {
          const token = getStoredToken();
          
          if (!token) {
            toast("Error", {
              description: "Authentication token not found. Please log in again.",
            });
            setIsValidating(false);
            return;
          }

          const validation = await validateWithdrawal(
            {
              tokenName: data.currency,
              amount: data.amount,
            },
            token
          );

          if (!validation || !validation.valid) {
            const errorMessage = validation?.reason || "Invalid withdrawal request. Please check your balance.";
            toast("Error", {
              description: errorMessage,
            });
            setValidationError(errorMessage);
            setIsValidating(false);
            return;
          }

          // Proceed with withdrawal
          // Note: user ID should come from JWT token on backend, but keeping for backward compatibility
          const withdrawPayload = {
            token_name: data.currency,
            amount: data.amount,
            token_withdraw_address: data.address,
            user: userData?._id || null,
          };

          const transaction = await withdraw(withdrawPayload);
      
          if (transaction) {
            toast("Success", {
              description: `Withdrawal request created successfully. USD Value: $${validation.usdValue.toFixed(2)}`,
            });
            
            // Reset form and validation state on success
            form.reset({
              currency: "",
              amount: 0,
              address: "",
            });
            setValidationError(null);
            setUsdValue(null);
            
            console.log("Withdrawal Transaction:", transaction);
          } else {
            throw new Error("Failed to create withdrawal request");
          }
        } catch (error) {
          console.error("Error creating withdrawal:", error);
          toast("Error", {
            description: "Failed to create withdrawal transaction.",
          });
        } finally {
          setIsValidating(false);
        }
      };

    return (
        <div className="flex h-full justify-center items-center w-full">
            <div className="p-2 sm:p-4 md:p-8 grid justify-items-center">
                <h1 className="text-2xl md:text-4xl font-bold">Withdraw Funds</h1>
                <p className="mb-10 text-sm md:text-base">to Crypto Wallet</p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="w-[300px] sm:w-[350px]">
                        <CardHeader>
                            <CardDescription className="text-xs sm:text-sm">
                                Select your cryptocurrency, enter the amount and destination
                                address.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormProvider {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-4"
                                >
                                    {/* Cryptocurrency Select */}
                                    <FormField
                                        control={form.control}
                                        name="currency"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cryptocurrency</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full text-start text-xs p-2 border border-appGold20">
                                                            <SelectValue placeholder="Select a currency" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="dark:bg-appDark rounded text-xs">
                                                        {isLoadingTokens ? (
                                                            <SelectItem value="loading" disabled>
                                                                Loading tokens...
                                                            </SelectItem>
                                                        ) : availableTokens.length === 0 ? (
                                                            <SelectItem value="no-tokens" disabled>
                                                                No tokens available
                                                            </SelectItem>
                                                        ) : (
                                                            availableTokens.map((token) => (
                                                                <SelectItem
                                                                    className="hover:bg-appGold20 outline-none hover:border-none rounded"
                                                                    key={token.tokenName}
                                                                    value={token.tokenName}
                                                                >
                                                                    {token.tokenName} ({token.amount.toFixed(6)} available)
                                                                </SelectItem>
                                                            ))
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* Amount Input */}
                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Amount</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.00000001"
                                                        placeholder="Enter withdrawal amount (e.g., 0.01)"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                    />
                                                </FormControl>
                                                {validationError && (
                                                  <p className="text-sm text-red-500 mt-1">{validationError}</p>
                                                )}
                                                {usdValue !== null && !validationError && (
                                                  <p className="text-sm text-green-500 mt-1">
                                                    USD Value: ${usdValue.toFixed(2)}
                                                  </p>
                                                )}
                                                {isValidating && (
                                                  <p className="text-sm text-muted-foreground mt-1">Validating...</p>
                                                )}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* Wallet Address Input */}
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Destination Address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter destination wallet address"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="w-full text-appDarkCard bg-appCardGold"
                                        disabled={isValidating || !!validationError || !watchedCurrency || !watchedAmount || watchedAmount <= 0}
                                    >
                                        {isValidating ? "Validating..." : "Withdraw"}
                                    </Button>
                                </form>
                            </FormProvider>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
            <WithdrawalModal />
        </div>
    );
};

export default Withdrawal;
