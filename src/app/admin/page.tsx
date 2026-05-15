"use client";

import { useState } from "react";
import { 
  Users, 
  ShieldCheck, 
  UserX, 
  Search, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const MOCK_USERS = [
  { id: "1", name: "Pankaj Kumar", phone: "9876543210", status: "PENDING", trustScore: 45 },
  { id: "2", name: "Ananya Sharma", phone: "9123456789", status: "VERIFIED", trustScore: 92 },
  { id: "3", name: "Rohan Thakur", phone: "9988776655", status: "REJECTED", trustScore: 12 },
];

export default function AdminDashboard() {
  const [users, setUsers] = useState(MOCK_USERS);

  const handleVerify = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: "VERIFIED", trustScore: 90 } : u));
  };

  const handleBlock = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: "REJECTED" } : u));
  };

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Admin Console</h1>
            <p className="text-slate-500 font-medium">Manage users and verification status.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-500" />
                <span className="font-bold">{users.length} Total Users</span>
             </div>
          </div>
        </header>

        <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input 
              placeholder="Search by name or phone..." 
              className="h-12 pl-12 rounded-xl bg-slate-50 border-none"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-none bg-slate-50">
                <TableHead className="rounded-l-xl font-bold text-slate-900">Name</TableHead>
                <TableHead className="font-bold text-slate-900">Phone</TableHead>
                <TableHead className="font-bold text-slate-900">Status</TableHead>
                <TableHead className="font-bold text-slate-900">Trust Score</TableHead>
                <TableHead className="rounded-r-xl font-bold text-slate-900 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-all">
                  <TableCell className="font-bold text-slate-700 py-6">{user.name}</TableCell>
                  <TableCell className="font-medium text-slate-500">{user.phone}</TableCell>
                  <TableCell>
                    <Badge className={`rounded-lg px-3 py-1 font-bold ${
                      user.status === "VERIFIED" ? "bg-emerald-50 text-emerald-600" :
                      user.status === "PENDING" ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                    }`}>
                      {user.status === "VERIFIED" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {user.status === "PENDING" && <AlertCircle className="w-3 h-3 mr-1" />}
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${user.trustScore > 70 ? "bg-emerald-500" : user.trustScore > 30 ? "bg-amber-500" : "bg-rose-500"}`} 
                          style={{ width: `${user.trustScore}%` }} 
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-500">{user.trustScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {user.status !== "VERIFIED" && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-emerald-600 font-bold hover:bg-emerald-50"
                        onClick={() => handleVerify(user.id)}
                      >
                        Verify
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-rose-600 font-bold hover:bg-rose-50"
                      onClick={() => handleBlock(user.id)}
                    >
                      Block
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
