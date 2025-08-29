/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "lucide-react";
import Link from "next/link";

export default function WorkSessionsPage() {
  const t = useTranslations("teacher");
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchSessions() {
      setLoading(true);
      const { data, error } = await supabase
        .from("work_sessions")
        .select("*, teacher:teachers(full_name)")
        .order("start_time", { ascending: false });
      if (!error && data) {
        setSessions(data);
      }
      setLoading(false);
    }
    fetchSessions();
  }, []);

  const filteredSessions = sessions.filter((session: any) => {
    const matchesStatus =
      statusFilter === "all" || session.status === statusFilter;
    const teacherName = session.teacher?.full_name || "";
    const matchesSearch =
      teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (session.break_project &&
        session.break_project.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "break":
        return "bg-orange-100 text-orange-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t("workSessions")}
            </h1>
            <p className="text-gray-600">
              View and manage teacher work sessions
            </p>
          </div>
          <Button asChild>
            <Link href="/teachers">Back to Teachers</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search by teacher or project..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="break">On Break</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-gray-600">
                Showing {filteredSessions.length} of {sessions.length} sessions
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start Time</TableHead>
                      <TableHead>End Time</TableHead>
                      <TableHead>Total Hours</TableHead>
                      <TableHead>Break Project</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSessions.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center text-gray-500 py-8"
                        >
                          No work sessions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSessions.map((session: any) => (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {session.teacher?.full_name || "Unknown"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`text-xs ${getStatusColor(
                                session.status
                              )}`}
                            >
                              {session.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {session.start_time
                              ? new Date(session.start_time).toLocaleString()
                              : "-"}
                          </TableCell>
                          <TableCell>
                            {session.end_time
                              ? new Date(session.end_time).toLocaleString()
                              : "-"}
                          </TableCell>
                          <TableCell>{session.total_hours ?? "-"}</TableCell>
                          <TableCell>{session.break_project ?? "-"}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
