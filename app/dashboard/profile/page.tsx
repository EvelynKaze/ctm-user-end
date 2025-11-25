"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setUserData, UserData } from "@/store/userSlice";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { updateUser, getStoredToken, getUserById } from "@/app/actions/auth";
import { setUserLoading, setUserError } from "@/store/userSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const profileSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  // Fetch user data if not available in Redux
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = typeof window !== "undefined" 
        ? localStorage.getItem("ctm_user_id") 
        : null;

      if (!userId) {
        dispatch(setUserError("No user ID found"));
        setIsInitialLoading(false);
        return;
      }

      // Fetch if we don't have user data or if we need to refresh
      if (!userData) {
        dispatch(setUserLoading(true));

        try {
          const token = getStoredToken();
          const userResponse = await getUserById(userId, token ? { token } : undefined);

          if (userResponse?.success && userResponse?.data) {
            dispatch(setUserData(userResponse.data as UserData));
          } else {
            dispatch(setUserError("Failed to fetch user data"));
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          dispatch(setUserError("Failed to fetch user data"));
        } finally {
          dispatch(setUserLoading(false));
        }
      }
    };

    fetchUserData();
  }, [dispatch, userData]);

  // Pre-fill form when userData is available
  useEffect(() => {
    if (userData && userData._id) {
      form.reset({
        username: userData.username || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
      });
      setIsInitialLoading(false);
    } else if (userData === null) {
      // If userData is explicitly null (not just undefined), stop loading
      setIsInitialLoading(false);
    }
  }, [userData, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!userData?._id) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    setIsLoading(true);
    try {
      const token = getStoredToken();
      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      const result = await updateUser(
        userData._id,
        {
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        { token }
      );

      if (result.success && result.data) {
        dispatch(setUserData(result.data as UserData));
        toast.success("Profile updated successfully!");
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="container mx-auto max-w-2xl py-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-6 w-6" />
            <CardTitle className="text-2xl">Edit Profile</CardTitle>
          </div>
          <CardDescription>
            Update your personal information and account details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        disabled
                        readOnly
                        className="bg-muted cursor-not-allowed"
                        aria-readonly="true"
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed. Contact support if you need to update your email address.
                    </p>
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isLoading}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* KYC Status Card */}
      {userData && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <CardTitle className="text-xl">KYC Verification</CardTitle>
            </div>
            <CardDescription>
              Complete your Know Your Customer verification to unlock all features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  Status:{" "}
                  <span className={userData.kycStatus ? "text-green-600" : "text-yellow-600"}>
                    {userData.kycStatus ? "Verified" : "Not Verified"}
                  </span>
                </p>
                {!userData.kycStatus && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Complete your KYC verification to access all platform features
                  </p>
                )}
              </div>
              {!userData.kycStatus && (
                <Link href="/dashboard/kyc">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Complete KYC
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

