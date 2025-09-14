
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

// Use environment variable or fallback to localhost for development
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function LoadingPage() {
	const router = useRouter();
	const { user, isLoaded } = useUser();

	useEffect(() => {
		if (!isLoaded) return;
		if (!user) return;

		const checkAndCreateUser = async () => {
			const clerkId = user.id;
			console.log("Checking/creating user for Clerk ID:", clerkId);
			// First, check if user exists
            try {
                // Check if user exists
                const res = await fetch(`${apiUrl}/users/clerk/${clerkId}`);
                console.log("User existence check response:", res);
                if (res.ok) {
                    // User exists, redirect
                    router.replace("/dashboard");
                    return;
                }
            } catch (e) {
                // If error is not 404, optionally handle/log
                console.error("Error checking user existence:", e);
            }
			// User does not exist, create
			const body = {
				clerkId: user.id,
				email: user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || "",
				username: user.username 
					|| ((user?.firstName?.toLowerCase?.() ?? "") + (user?.lastName?.toLowerCase?.() ?? "")) 
					|| ("user" + user.id.slice(-6)),
				firstName: user.firstName || "",
				lastName: user.lastName || "",
				roi: 0,
				role: "user",
				kycStatus: false,
				currentValue: 0,
				accountStatus: true,
				totalInvestment: 0,
			};
            console.log("Creating user with body:", body);
			await fetch(`${apiUrl}/users/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			router.replace("/dashboard");
		};
		checkAndCreateUser();
	}, [isLoaded, user, router]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-black">
			<div className="w-16 h-16 border-4 border-appGold-500 border-t-transparent rounded-full animate-spin mb-6"></div>
			<p className="text-white text-lg">Loading your account...</p>
		</div>
	);
}
