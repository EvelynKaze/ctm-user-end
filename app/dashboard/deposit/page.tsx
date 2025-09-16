"use client";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearStockOption } from "@/store/stockOptionsSlice";
import { clearCopyTrade } from "@/store/copyTradeSlice";
import { type Hex, parseEther } from "viem";
import { type BaseError, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import DepositFunds from "@/components/user-deposit/DepositFunds";
import type { DepositCryptocurrency} from "@/types";
import { fetchCryptocurrencies } from "@/app/actions/fetch-crypto";
// import { createStockPurchase } from "@/app/actions/stockPurchase";
import { createCopyTrade } from "@/app/actions/copytrade";
import { createDeposit } from "@/app/actions/deposit";

const depositSchema = z.object({
  currency: z.string().nonempty("Please select a cryptocurrency."),
  amount: z.number().positive("Amount must be a positive number."),
});

type DepositFormData = z.infer<typeof depositSchema>;

const Deposit = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const stockOption = useSelector((state: RootState) => state.stockOption);
  const copyTrade = useSelector((state: RootState) => state.copyTrade);
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

          // Create copy trade record if copy trade data exists with valid structure
          if (copyTrade?.copy && 
              copyTrade.copy.title && 
              copyTrade.copy.title.trim() !== "" && 
              copyTrade.copy.trade_min !== undefined && 
              copyTrade.copy.trade_max !== undefined &&
              copyTrade.copy.trade_roi_min !== undefined &&
              copyTrade.copy.trade_roi_max !== undefined &&
              copyTrade.copy.trade_risk) {
            await createCopyTrade({ 
              data: {
                trade_min: copyTrade.copy.trade_min,
                trade_max: copyTrade.copy.trade_max,
                trade_roi_min: copyTrade.copy.trade_roi_min,
                trade_roi_max: copyTrade.copy.trade_roi_max,
                trade_risk: copyTrade.copy.trade_risk,
              }, 
              trade_title: copyTrade.copy.title,
              user: userData?._id, 
              initial_investment: form.getValues().amount,
              trade_token: form.getValues().currency,
              trade_token_address: selectedAddress,
              trade_duration: copyTrade.copy.trade_duration || 30,
              trade_status: "pending"              
            });
          }

          // TODO: Add stock purchase logic here if needed
          // if (stockOption?.stock && stockOption.stock.total > 0) {
          //   await createStockPurchase({...});
          // }

          toast("Success", { description: "Transaction completed successfully!" });
        } catch (err) {
          const error = err as Error
          toast("Error", { description: `Failed to create transaction: ${error.message}` });
        } finally {
          setIsLoading(false);
          dispatch(clearStockOption());
          dispatch(clearCopyTrade());
        }
      };
      handleTransactionSuccess();
    }
  }, [isConfirmed, copyTrade.copy, dispatch, form, userData?._id, selectedAddress, stockOption.stock]);


  const handleCurrencyChange = (currency: string) => {
    const selectedCrypto: DepositCryptocurrency | undefined = cryptocurrencies.find(crypto => crypto.value === currency);
    setSelectedAddress(selectedCrypto?.address || "");
    form.setValue("currency", currency);
  };

  return (
    <DepositFunds
      form={form}
      cryptocurrencies={cryptocurrencies}
      selectedAddress={selectedAddress}
      handleCurrencyChange={handleCurrencyChange}
      onSubmit={onSubmit}
      isLoading={isLoading || isConfirming}
      stockOption={stockOption}
      copyTrade={copyTrade}
      baseError={baseError}
      tranHash={tranHash || ""}
    />
  );
};

export default Deposit;
