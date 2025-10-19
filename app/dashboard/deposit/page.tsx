"use client";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { type Hex, parseEther } from "viem";
import { type BaseError, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import DepositFunds from "@/components/user-deposit/DepositFunds";
import type { DepositCryptocurrency} from "@/types";
import { fetchCryptocurrencies } from "@/app/actions/fetch-crypto";
import { createDeposit } from "@/app/actions/deposit";
import { getUserById } from "@/app/actions/auth";
import { setUserData, setUserLoading, setUserError, UserData } from "@/store/userSlice";

const depositSchema = z.object({
  currency: z.string().nonempty("Please select a cryptocurrency."),
  amount: z.number().positive("Amount must be a positive number."),
});

type DepositFormData = z.infer<typeof depositSchema>;

const Deposit = () => {
  const dispatch = useDispatch();
  const { userData, isLoading: userLoading, error: userError } = useSelector((state: RootState) => state.user);
  const { data: hash, error, sendTransaction } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [cryptocurrencies, setCryptocurrencies] = useState<{ id: string; name: string; value: string; address: string }[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    defaultValues: { currency: "", amount: 0 },
    mode: "onChange",
  });

  // Fetch user data by user ID on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = typeof window !== "undefined" 
        ? localStorage.getItem("ctm_user_id") 
        : null;

      if (!userId) {
        dispatch(setUserError("No user ID found"));
        toast("Error fetching user data", {
          description: 'No user Id found. Kindly logout and log back in.',
        });
        return;
      }

      // Only fetch if we don't already have user data
      if (!userData) {
        dispatch(setUserLoading(true));

        try {
          const userResponse = await getUserById(userId);
          console.log("User data from backend:", userResponse?.data);

          if (userResponse?.success && userResponse?.data) {
            dispatch(setUserData(userResponse.data as UserData));
          } else {
            dispatch(setUserError("Failed to fetch user data"));
            toast("Error", {
              description: "Failed to fetch user data. Please try again.",
            });
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          dispatch(setUserError("Failed to fetch user data"));
          toast("Error", {
            description: "Failed to fetch user data. Please try again.",
          });
        } finally {
          dispatch(setUserLoading(false));
        }
      }
    };

    fetchUserData();
  }, [dispatch, userData]);

  useEffect(() => {
    const getCryptocurrencies = async () => {
      try {
        const response = await fetchCryptocurrencies();
        if (response && response.success && response.data) {
          // Transform the API response to match the expected format
          const transformedCryptocurrencies = response.data.map((crypto) => ({
            id: crypto._id,
            name: crypto.token_name,
            value: crypto.token_symbol,
            address: crypto.token_address,
          }));
          setCryptocurrencies(transformedCryptocurrencies);
        } else {
          throw new Error("Failed to fetch cryptocurrency data");
        }
      } catch (error) {
        console.error("Error fetching cryptocurrencies:", error);
        toast("Error", {
          description: "Failed to fetch cryptocurrency data.",
        });
      }
    };

    getCryptocurrencies();
  }, []);

  interface FormData {
    currency: string;
    amount: number;
  }

  const onSubmit = async (data: FormData) => {
    const to: Hex = selectedAddress as Hex;
    const value = parseEther(data.amount.toString());
    sendTransaction({ to, value });
    setIsLoading(true);
  };

  const baseError = error as BaseError || undefined;
  const tranHash = hash || undefined;

  useEffect(() => {
    if (isConfirmed) {
      const handleTransactionSuccess = async () => {
        try {
          const formValues = form.getValues();
          
          // Create deposit record for wallet transactions
          await createDeposit({
            token_name: formValues.currency,
            amount: typeof formValues.amount === "number" ? formValues.amount : Number(formValues.amount),
            token_deposit_address: selectedAddress,
            user: userData?._id,
          });

          toast("Success", { description: "Transaction completed successfully!" });
        } catch (err) {
          const error = err as Error
          toast("Error", { description: `Failed to create transaction: ${error.message}` });
        } finally {
          setIsLoading(false);
        }
      };
      handleTransactionSuccess();
    }
  }, [isConfirmed, form, userData?._id, selectedAddress]);

  const handleCurrencyChange = (currency: string) => {
    const selectedCrypto: DepositCryptocurrency | undefined = cryptocurrencies.find(crypto => crypto.value === currency);
    setSelectedAddress(selectedCrypto?.address || "");
    form.setValue("currency", currency);
  };

  // Show loading state while fetching user data
  if (userLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-foreground text-lg">Loading your account...</p>
      </div>
    );
  }

  // Show error state
  if (userError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-destructive text-lg mb-4">Error: {userError}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <DepositFunds
      form={form}
      cryptocurrencies={cryptocurrencies}
      selectedAddress={selectedAddress}
      handleCurrencyChange={handleCurrencyChange}
      onSubmit={onSubmit}
      isLoading={isLoading || isConfirming}
      baseError={baseError}
      tranHash={tranHash || ""}
    />
  );
};

export default Deposit;
