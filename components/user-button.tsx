"use client"
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData, setUserError, UserData } from "@/store/userSlice";
import { clearCopyTrade } from "@/store/copyTradeSlice";
import { clearStockOption } from "@/store/stockOptionsSlice";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useRouter } from "next/navigation";

// Utility to remove cookie by name
function deleteCookie(name: string) {
  if (typeof document !== "undefined") {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
  }
}

interface LogoutDropdownProps {
  onLogout: () => void;
  onClose: () => void;
  isOpen: boolean;
  anchorRef: React.RefObject<HTMLDivElement>;
}

function LogoutDropdown({ onLogout, onClose, isOpen, anchorRef }: LogoutDropdownProps) {
  // Close dropdown on click outside
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        // Just close the dropdown, don't logout
        onClose();
      }
    }
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [isOpen, anchorRef, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-14 z-50 bg-white dark:bg-appDarkCard shadow-md border rounded px-4 py-2 min-w-[130px]">
      <button
        className="text-red-600 font-semibold py-1 px-2 w-full hover:bg-red-50 dark:hover:bg-appDark/40 rounded"
        onClick={onLogout}
        type="button"
      >
        Log out
      </button>
    </div>
  );
}

interface UserButtonProps {
  userName?: string | null;
}

export function UserButton({ userName }: UserButtonProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const router = useRouter()

  const handleLogout = () => {
    // Close dropdown first
    setDropdownOpen(false);

    // Clear local storage
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("ctm_token");
      window.localStorage.removeItem("ctm_user_id");
    }

    // Clear cookies
    deleteCookie("token");
    deleteCookie("ctm_user_id");

    // Clear Redux state
    dispatch(setUserData({} as UserData)); // Use empty object instead of null
    dispatch(setUserError("")); // Use empty string instead of null
    dispatch(clearCopyTrade());
    dispatch(clearStockOption());

    // Optional: Redirect to login page or reload
    // window.location.href = "/login";
    router.push("/sign-in")
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Get initials for avatar
  const getInitials = () => {
    if (userName && typeof userName === "string" && userName.trim().length > 0) {
      return userName.trim().charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <div className="relative" ref={avatarRef}>
      <button
        aria-label="Open account options"
        onClick={handleDropdownToggle}
        className="focus:outline-none"
        type="button"
      >
        <Avatar>
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
      </button>
      <LogoutDropdown
        onLogout={handleLogout}
        onClose={handleDropdownClose}
        isOpen={dropdownOpen}
        anchorRef={avatarRef as React.RefObject<HTMLDivElement>}
      />
    </div>
  );
}