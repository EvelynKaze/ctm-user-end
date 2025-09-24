import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { closeModal } from "@/store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { createDeposit } from "@/app/actions/deposit";
import { toast } from "sonner";

const DepositModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, modalProps } = useSelector((state: RootState) => state.modal);
  const { address, currency, amount, userData } = modalProps;
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [copied, setCopied] = useState(false);
  const [depositCreated, setDepositCreated] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset states when modal closes
      setDepositCreated(false);
      setCopied(false);
      setTimeLeft(600);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      
      // Create the deposit record when user copies the address (indicating intent to deposit)
      if (!depositCreated) {
        await createDepositRecord();
      }
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  const createDepositRecord = async () => {
    try {
      // Create the deposit record
      await createDeposit({
        token_name: currency,
        amount: amount,
        token_deposit_address: address,
        user: userData?._id,
      });

      setDepositCreated(true);
      toast.success("Deposit request created successfully!");
    } catch (error) {
      console.error("Error creating deposit record:", error);
      toast.error("Failed to create deposit record");
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={() => dispatch(closeModal())}>
        <DialogContent className="text-xs max-w-[425px]">
          <DialogHeader className="w-full">
            <DialogTitle className="text-start text-base">
              Deposit Instructions
            </DialogTitle>
          </DialogHeader>
          <div className="grid w-10/12 gap-4 py-4">
            <p>Please follow these steps to complete your deposit:</p>
            <ol className="list-decimal sm:w-full w-10/12 list-inside space-y-2">
              <li>Open your {currency} wallet</li>
              <li>
                Send {amount} {currency} to the following address:
              </li>
              <div className="flex items-center sm:w-full w-10/12 justify-between bg-secondary p-2 rounded">
                <p className="text-xs break-words sm:w-full truncate w-2/3">
                  {address}
                </p>
                <Button variant="ghost" size="sm" onClick={handleCopyAddress}>
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>

              <li className="">
                Wait for the transaction to be confirmed on the blockchain
              </li>
            </ol>
            <p className="font-semibold">
              Time remaining:{" "}
              <span className="text-primary">{formatTime(timeLeft)}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Please complete the transaction before <br />
              the timer expires to ensure it&apos;s processed correctly.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
      <Drawer open={isOpen} onOpenChange={() => dispatch(closeModal())}>
        <DrawerContent>
          <DrawerHeader className="w-full">
            <DrawerTitle className="text-start text-base">Deposit Instructions</DrawerTitle>
          </DrawerHeader>
          <div className="grid w-10/12 gap-4 py-4 p-5">
            <p>Please follow these steps to complete your deposit:</p>
            <ol className="list-decimal sm:w-full w-10/12 list-inside space-y-2">
              <li>Open your {currency} wallet</li>
              <li>
                Send {amount} {currency} to the following address:
              </li>
              <div className="flex items-center sm:w-full w-10/12 justify-between bg-secondary p-2 rounded">
                <p className="text-xs break-words sm:w-full truncate w-2/3">
                  {address}
                </p>
                <Button variant="ghost" size="sm" onClick={handleCopyAddress}>
                  <Copy className="h-4 w-4"/>
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>

              <li className="">
                Wait for the transaction to be confirmed on the blockchain
              </li>
            </ol>
            <p className="font-semibold">
              Time remaining:{" "}
              <span className="text-primary">{formatTime(timeLeft)}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Please complete the transaction before <br/>
              the timer expires to ensure it&apos;s processed correctly.
            </p>
          </div>
        </DrawerContent>
      </Drawer>
  )
}

export default DepositModal;
