"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearCopyTrade } from "@/store/copyTradeSlice";
import { setUserError, setUserData, UserData, setUserLoading } from "@/store/userSlice";
import { getUserById } from "../actions/auth";
import { useDispatch } from "react-redux";
import { clearStockOption } from "@/store/stockOptionsSlice";

export default function LoadingPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Fetch user data from backend using action
  useEffect(() => {
    const fetchUserData = async () => {
      // Move localStorage access inside useEffect
      const userId = typeof window !== "undefined" 
        ? localStorage.getItem("ctm_user_id") 
        : null;

      if (!userId) {
        // If no userId, redirect to login
        router.push("/login");
        return;
      }

      dispatch(setUserLoading(true));

      try {
        const userResponse = await getUserById(userId);
        console.log("User data from backend:", userResponse?.data);

        if (userResponse?.success && userResponse?.data) {
          dispatch(setUserData(userResponse.data as UserData));
          dispatch(clearStockOption());
          dispatch(clearCopyTrade());
          router.push("/dashboard");
        } else {
          dispatch(setUserError("Failed to fetch user data"));
          router.push("/login");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        dispatch(setUserError("Failed to fetch user data"));
        router.push("/login");
      } finally {
        dispatch(setUserLoading(false));
      }
    };

    fetchUserData();
  }, [dispatch, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="w-16 h-16 border-4 border-appGold-500 border-t-transparent rounded-full animate-spin mb-6"></div>
      <p className="text-white text-lg">Loading your account...</p>
    </div>
  );
}