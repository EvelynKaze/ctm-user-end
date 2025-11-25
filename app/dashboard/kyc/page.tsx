"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { uploadFile } from "@/app/actions/upload";
import { submitKYC } from "@/app/actions/kyc";
import { getStoredToken } from "@/app/actions/auth";
import { Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const kycSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  validId: z.custom<File>((val) => val instanceof File && val.size > 0, {
    message: "Valid ID is required",
  }),
  passport: z.custom<File>((val) => val instanceof File && val.size > 0, {
    message: "Passport is required",
  }),
});

type KYCFormValues = z.infer<typeof kycSchema>;

export default function KYCPage() {
  const { userData } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [validIdPreview, setValidIdPreview] = useState<string | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);

  const form = useForm<KYCFormValues>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      fullName: userData?.fullName || "",
      dateOfBirth: "",
      phoneNumber: "",
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
  });

  const handleFileChange = (
    field: "validId" | "passport",
    file: File | null,
    onChange: (file: File) => void
  ) => {
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, or WebP)");
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error("File size must be less than 10MB");
      return;
    }

    onChange(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      if (field === "validId") {
        setValidIdPreview(reader.result as string);
      } else {
        setPassportPreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: KYCFormValues) => {
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

      // Upload valid ID
      toast.loading("Uploading valid ID...", { id: "upload-valid-id" });
      const validIdResult = await uploadFile(data.validId, token);
      if (!validIdResult || !validIdResult.success) {
        toast.error("Failed to upload valid ID", { id: "upload-valid-id" });
        setIsLoading(false);
        return;
      }
      toast.success("Valid ID uploaded successfully", { id: "upload-valid-id" });

      // Upload passport
      toast.loading("Uploading passport...", { id: "upload-passport" });
      const passportResult = await uploadFile(data.passport, token);
      if (!passportResult || !passportResult.success) {
        toast.error("Failed to upload passport", { id: "upload-passport" });
        setIsLoading(false);
        return;
      }
      toast.success("Passport uploaded successfully", { id: "upload-passport" });

      // Submit KYC
      toast.loading("Submitting KYC information...", { id: "submit-kyc" });
      const kycData = {
        fullName: data.fullName,
        dateOfBirth: data.dateOfBirth,
        phoneNumber: data.phoneNumber,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          country: data.country,
          postalCode: data.postalCode,
        },
        validIdUrl: validIdResult.data.url,
        passportUrl: passportResult.data.url,
        validIdFileName: validIdResult.data.filename,
        passportFileName: passportResult.data.filename,
        validIdFileSize: validIdResult.data.size.toString(),
        passportFileSize: passportResult.data.size.toString(),
      };

      const kycResult = await submitKYC(kycData, token);
      if (!kycResult || !kycResult.success) {
        toast.error(kycResult?.message || "Failed to submit KYC", { id: "submit-kyc" });
        setIsLoading(false);
        return;
      }

      toast.success("KYC submitted successfully! Your application is under review.", {
        id: "submit-kyc",
      });
      
      // Reset form
      form.reset();
      setValidIdPreview(null);
      setPassportPreview(null);

      // Redirect after a delay
      setTimeout(() => {
        router.push("/dashboard/profile");
      }, 2000);
    } catch (error) {
      console.error("Error submitting KYC:", error);
      toast.error("An error occurred while submitting your KYC", { id: "submit-kyc" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <CardTitle className="text-2xl">Complete KYC Verification</CardTitle>
          </div>
          <CardDescription>
            Please provide your personal information and upload required documents for identity verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Address Information</h3>
                
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province</FormLabel>
                        <FormControl>
                          <Input placeholder="NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="USA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Document Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Document Upload</h3>
                
                <FormField
                  control={form.control}
                  name="validId"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>Valid ID (Driver&apos;s License, National ID, etc.)</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileChange("validId", file, onChange);
                              }
                            }}
                            {...field}
                          />
                          {validIdPreview && (
                            <div className="relative w-full h-48 border rounded-md overflow-hidden">
                              <Image
                                src={validIdPreview}
                                alt="Valid ID preview"
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground">
                        Accepted formats: JPEG, PNG, WebP (Max 10MB)
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passport"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>Passport</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileChange("passport", file, onChange);
                              }
                            }}
                            {...field}
                          />
                          {passportPreview && (
                            <div className="relative w-full h-48 border rounded-md overflow-hidden">
                              <Image
                                src={passportPreview}
                                alt="Passport preview"
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground">
                        Accepted formats: JPEG, PNG, WebP (Max 10MB)
                      </p>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isLoading ? "Submitting..." : "Submit KYC Application"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

