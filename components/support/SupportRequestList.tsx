"use client"
import { useEffect, useState } from "react"
import type { SupportRequest } from "./type"
import { PriorityBadge } from "./PriorityBadge"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { SupportRequestDetails } from "./SupportRequestDetails"
import { TableSkeleton } from "@/skeletons"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { fetchSupport } from "@/app/actions/fetchSupport"


export function SupportRequestList() {
    const [selectedRequest, setSelectedRequest] = useState<SupportRequest | null>(null)
    const [userRequests, setUserRequests] = useState<SupportRequest[]>([])
    const { userData } = useSelector((state: RootState) => state.user)
    const user_id = userData?._id || "";
    const isMobile = useMediaQuery("(max-width: 640px)")
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const getSupportRequests = async () => {
          if (!user_id) {
            console.log("No user ID available, skipping support fetch");
            return;
          }
          
          setIsLoading(true);
          try {
            const supportData = await fetchSupport(user_id);
            if (supportData) {
              setUserRequests(supportData);
              console.log("Successfully fetched support", supportData);
            } else {
              setUserRequests([]);
              console.log("No support data returned");
            }
          } catch (error) {
            console.error("Failed to fetch support requests:", error);
            setUserRequests([]);
          } finally {
            setIsLoading(false);
          }
        };
      
        getSupportRequests();
      }, [user_id]);

    const handleRequestClick = (request: SupportRequest) => {
        setSelectedRequest(request)
    }

    return (
        <>
            {isLoading ? (
                <TableSkeleton />
            ) : (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="hidden md:table-cell">Created</TableHead>
                        <TableHead className="hidden md:table-cell">Updated</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userRequests?.map((request) => (
                        <TableRow
                            key={request.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => handleRequestClick(request)}
                        >
                            <TableCell className="font-medium">
                                {request.title.length > 30 ? `${request.title.substring(0, 30)}...` : request.title}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        request.status === "open" ? "default" : request.status === "in-progress" ? "secondary" : "outline"
                                    }
                                    className={`${request.status === "open" ? "bg-gray-400" : request?.status === "in-progress" ? "bg-yellow-400"  : "bg-green-400"}`}
                                >
                                    {request.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <PriorityBadge priority={request.priority} />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="hidden md:table-cell">{new Date(request.updatedAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            )}
            <SupportRequestDetails
                request={selectedRequest}
                isOpen={!!selectedRequest}
                onClose={() => setSelectedRequest(null)}
                isMobile={isMobile}
            />
        </>
    )
}

