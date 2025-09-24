"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PriorityBadge } from "./PriorityBadge"
import { toast } from "sonner"
import { createSupport } from "@/app/actions/createSupport"

interface SupportRequestFormProps {
    email?: string
    full_name?: string | null
    user?: string | null
}

export default function SupportRequestForm({ full_name, email, user}: SupportRequestFormProps) {
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [priority, setPriority] = useState<"high" | "medium" | "low">("medium")

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
          const supportData = {
            user,
            full_name,
            email,
            title,
            message,
            priority,
          };
      
          const support = await createSupport(supportData);
          
          if (support) {
            console.log("Support opened", support);
            
            // Reset form on success
            setTitle("");
            setMessage("");
            setPriority("medium");
            
            toast("Support Ticket Opened", {
              description: "We'll send you an email once the issue has been resolved.",
            });
          } else {
            throw new Error("Failed to create support ticket");
          }
        } catch (error) {
          console.error("Support ticket error:", error);
          toast("Support Ticket Failed", {
            description: "There was an error opening the support ticket. Please try again.",
          });
        } finally {
          setIsLoading(false);
        }
      };


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Brief description of your issue"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your issue or question"
                    required

                />
            </div>


            <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority as (value: string) => void}>
                    <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="high">
                            <div className="flex items-center space-x-2">
                                <PriorityBadge priority="high" />
                                <span>High</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="medium">
                            <div className="flex items-center space-x-2">
                                <PriorityBadge priority="medium" />
                                <span>Medium</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="low">
                            <div className="flex items-center space-x-2">
                                <PriorityBadge priority="low" />
                                <span>Low</span>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit" className="w-full">
                {isLoading ? "Opening ticket..." : "Submit Request"}
            </Button>
        </form>
    )
}

