import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUsers, useToggleUserStatus } from "@/query/useAdmin";
import { Loader2, UserCheck, UserX, Users } from "lucide-react";
import { useState } from "react";

export default function UserInfo() {
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    fullName: string;
    status: string;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, isError } = useGetUsers({
    page,
    limit: 10,
  });

  const toggleStatusMutation = useToggleUserStatus();

  const handleToggleStatus = async () => {
    if (selectedUser) {
      await toggleStatusMutation.mutateAsync(selectedUser.id);
      setIsDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const users = data?.data?.users || [];
  const pagination = data?.data?.pagination;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              Manage Users
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              View and manage user accounts, status, and permissions.
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <span className="text-sm font-medium text-slate-600">
              Total Users:{" "}
            </span>
            <span className="text-lg font-bold text-blue-600">
              {pagination?.totalUsers || 0}
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl mt-8">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-slate-600 font-medium">Loading users data...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-red-50 rounded-2xl border border-red-100 shadow-xl mt-8 p-8 text-center">
            <div className="bg-red-100 p-3 rounded-full mb-4">
              <UserX className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-red-900 mb-2">
              Failed to load users
            </h3>
            <p className="text-red-700 max-w-md">
              There was an error fetching the user list. Please check your
              connection and try again.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-6 bg-red-600 hover:bg-red-700"
            >
              Retry Connection
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                    <TableHead className="font-bold text-slate-700 py-5">
                      User
                    </TableHead>
                    <TableHead className="font-bold text-slate-700">
                      Email Address
                    </TableHead>
                    <TableHead className="font-bold text-slate-700">
                      Access Level
                    </TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">
                      Current Status
                    </TableHead>
                    <TableHead className="font-bold text-slate-700 text-right">
                      Administrative Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-20 text-slate-500"
                      >
                        <div className="flex flex-col items-center">
                          <Users className="h-12 w-12 text-slate-300 mb-3" />
                          <p className="text-lg font-medium">
                            No users found in the system
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow
                        key={user.id}
                        className="hover:bg-blue-50/30 transition-all group"
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                              {user.fullName.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-slate-900">
                              {user.fullName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600 font-medium">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 transition-colors"
                                : "bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100 transition-colors"
                            }
                          >
                            {user.role.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={
                              user.status === "active"
                                ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 transition-colors"
                                : "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200 transition-colors"
                            }
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full mr-2 ${
                                user.status === "active"
                                  ? "bg-emerald-500"
                                  : "bg-rose-500"
                              }`}
                            />
                            {user.status.charAt(0).toUpperCase() +
                              user.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedUser({
                                id: user.id,
                                fullName: user.fullName,
                                status: user.status,
                              });
                              setIsDialogOpen(true);
                            }}
                            className={
                              user.status === "active"
                                ? "border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 transition-all opacity-0 group-hover:opacity-100"
                                : "border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all opacity-0 group-hover:opacity-100"
                            }
                          >
                            {user.status === "active" ? (
                              <>
                                <UserX className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-2 py-4">
                <p className="text-sm text-slate-500 font-medium">
                  Showing page{" "}
                  <span className="text-slate-900 font-bold">{page}</span> of{" "}
                  <span className="text-slate-900 font-bold">
                    {pagination.totalPages}
                  </span>
                </p>
                <Pagination className="mx-0 w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) setPage(page - 1);
                        }}
                        className={
                          page === 1
                            ? "pointer-events-none opacity-50 bg-white border-slate-200"
                            : "cursor-pointer bg-white border-slate-200 hover:bg-slate-50 shadow-sm"
                        }
                      />
                    </PaginationItem>

                    {Array.from(
                      { length: Math.min(5, pagination.totalPages) },
                      (_, i) => {
                        let pageNum;
                        if (pagination.totalPages <= 5) {
                          pageNum = i + 1;
                        } else {
                          if (page <= 3) pageNum = i + 1;
                          else if (page >= pagination.totalPages - 2)
                            pageNum = pagination.totalPages - 4 + i;
                          else pageNum = page - 2 + i;
                        }

                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setPage(pageNum);
                              }}
                              isActive={page === pageNum}
                              className="cursor-pointer bg-white border-slate-200 data-[active=true]:bg-blue-600 data-[active=true]:text-white data-[active=true]:border-blue-600 shadow-sm"
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page < pagination.totalPages) setPage(page + 1);
                        }}
                        className={
                          page === pagination.totalPages
                            ? "pointer-events-none opacity-50 bg-white border-slate-200"
                            : "cursor-pointer bg-white border-slate-200 hover:bg-slate-50 shadow-sm"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none shadow-2xl">
            <div
              className={`h-2 w-full ${
                selectedUser?.status === "active"
                  ? "bg-rose-500"
                  : "bg-emerald-500"
              }`}
            />
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  {selectedUser?.status === "active" ? (
                    <UserX className="h-6 w-6 text-rose-500" />
                  ) : (
                    <UserCheck className="h-6 w-6 text-emerald-500" />
                  )}
                  {selectedUser?.status === "active"
                    ? "Deactivate Account"
                    : "Activate Account"}
                </DialogTitle>
                <DialogDescription className="text-base text-slate-600 pt-3">
                  Are you absolutely sure you want to{" "}
                  {selectedUser?.status === "active"
                    ? "deactivate"
                    : "activate"}{" "}
                  user{" "}
                  <span className="font-bold text-slate-900 underline decoration-2 decoration-blue-200 underline-offset-2">
                    {selectedUser?.fullName}
                  </span>
                  ?
                  <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-100 italic">
                    {selectedUser?.status === "active"
                      ? "The user will lose all system access immediately. They will not be able to log in until reactivated by an administrator."
                      : "The user will regain full access to the platform and their previous permissions will be restored."}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-3 sm:gap-2 pt-8">
                <Button
                  variant="ghost"
                  onClick={() => setIsDialogOpen(false)}
                  className="font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                >
                  Dismiss
                </Button>
                <Button
                  className={
                    selectedUser?.status === "active"
                      ? "bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-200 px-6 font-bold"
                      : "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 px-6 font-bold"
                  }
                  onClick={handleToggleStatus}
                  disabled={toggleStatusMutation.isLoading}
                >
                  {toggleStatusMutation.isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : selectedUser?.status === "active" ? (
                    <UserX className="h-4 w-4 mr-2" />
                  ) : (
                    <UserCheck className="h-4 w-4 mr-2" />
                  )}
                  Confirm{" "}
                  {selectedUser?.status === "active"
                    ? "Deactivation"
                    : "Activation"}
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
