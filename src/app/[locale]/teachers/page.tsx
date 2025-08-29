import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building,
  User,
  Download,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// Mock data for demonstration
const mockTeachers = [
  {
    id: "1",
    full_name: "John Doe",
    email: "john.doe@school.edu",
    phone: "+976-1234-5678",
    department: "Mathematics",
    position: "Senior Teacher",
    created_at: "2024-01-15T08:00:00Z",
    status: "active",
  },
  {
    id: "2",
    full_name: "Jane Smith",
    email: "jane.smith@school.edu",
    phone: "+976-2345-6789",
    department: "English Literature",
    position: "Head Teacher",
    created_at: "2024-01-10T09:00:00Z",
    status: "active",
  },
  {
    id: "3",
    full_name: "Mike Johnson",
    email: "mike.johnson@school.edu",
    phone: "+976-3456-7890",
    department: "Science",
    position: "Teacher",
    created_at: "2024-01-08T10:00:00Z",
    status: "inactive",
  },
  {
    id: "4",
    full_name: "Sarah Wilson",
    email: "sarah.wilson@school.edu",
    phone: "+976-4567-8901",
    department: "History",
    position: "Senior Teacher",
    created_at: "2024-01-05T11:00:00Z",
    status: "active",
  },
  {
    id: "5",
    full_name: "David Brown",
    email: "david.brown@school.edu",
    phone: "+976-5678-9012",
    department: "Physical Education",
    position: "Teacher",
    created_at: "2024-01-03T12:00:00Z",
    status: "active",
  },
];

// Teacher Card Component for mobile view
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TeacherCard({ teacher, onEdit, onDelete, onViewDetails }: any) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{teacher.full_name}</h3>
              <Badge
                variant={teacher.status === "active" ? "default" : "secondary"}
              >
                {teacher.status}
              </Badge>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{teacher.email}</span>
              </div>
              {teacher.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{teacher.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                <span>{teacher.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{teacher.position}</span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails(teacher)}>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(teacher)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(teacher.id)}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

// Edit Teacher Dialog
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EditTeacherDialog({ teacher, open, onClose, onSave }: any) {
  const [formData, setFormData] = useState(teacher || {});

  useEffect(() => {
    setFormData(teacher || {});
  }, [teacher]);

  const handleSave = () => {
    if (!formData.full_name || !formData.email) {
      toast.error("Please fill in required fields");
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Teacher</DialogTitle>
          <DialogDescription>Update teacher information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Full Name *</Label>
            <Input
              id="edit-name"
              value={formData.full_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="edit-email">Email *</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="edit-phone">Phone</Label>
            <Input
              id="edit-phone"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="edit-department">Department</Label>
            <Input
              id="edit-department"
              value={formData.department || ""}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="edit-position">Position</Label>
            <Input
              id="edit-position"
              value={formData.position || ""}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function TeachersListPage() {
  const t = useTranslations("teacher");
  const [teachers, setTeachers] = useState(mockTeachers);
  const [filteredTeachers, setFilteredTeachers] = useState(mockTeachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Get unique departments for filter
  const departments = [...new Set(teachers.map((t) => t.department))];

  // Filter teachers based on search and filters
  useEffect(() => {
    let filtered = teachers;

    if (searchTerm) {
      filtered = filtered.filter(
        (teacher) =>
          teacher.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter(
        (teacher) => teacher.department === departmentFilter
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((teacher) => teacher.status === statusFilter);
    }

    setFilteredTeachers(filtered);
  }, [teachers, searchTerm, departmentFilter, statusFilter]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (teacher: any) => {
    setEditingTeacher(teacher);
    setIsEditDialogOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = (updatedTeacher: any) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t))
    );
    toast.success("Teacher updated successfully!");
  };

  const handleDelete = (teacherId: string) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      setTeachers((prev) => prev.filter((t) => t.id !== teacherId));
      toast.success("Teacher deleted successfully!");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewDetails = (teacher: any) => {
    // Navigate to teacher details page
    window.location.href = `/teachers/${teacher.id}`;
  };

  const exportToCSV = () => {
    const csvData = filteredTeachers.map((teacher) => ({
      Name: teacher.full_name,
      Email: teacher.email,
      Phone: teacher.phone || "",
      Department: teacher.department,
      Position: teacher.position,
      Status: teacher.status,
      "Created Date": new Date(teacher.created_at).toLocaleDateString(),
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map((row) =>
        Object.values(row)
          .map((val) => `"${val}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `teachers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Teachers data exported successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t("teacherList")}
            </h1>
            <p className="text-gray-600">
              Manage and view all registered teachers
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={exportToCSV}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button asChild className="flex items-center gap-2">
              <Link href="/teachers/create">
                <Plus className="w-4 h-4" />
                {t("createTeacher")}
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {teachers.length}
              </div>
              <div className="text-sm text-gray-600">Total Teachers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {teachers.filter((t) => t.status === "active").length}
              </div>
              <div className="text-sm text-gray-600">Active Teachers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {departments.length}
              </div>
              <div className="text-sm text-gray-600">Departments</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">
                {teachers.filter((t) => t.position.includes("Senior")).length}
              </div>
              <div className="text-sm text-gray-600">Senior Teachers</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Search teachers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                <Select
                  value={departmentFilter}
                  onValueChange={setDepartmentFilter}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-sm text-gray-600">
                Showing {filteredTeachers.length} of {teachers.length} teachers
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden md:block rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center text-gray-500 py-8"
                      >
                        No teachers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell className="font-medium">
                          {teacher.full_name}
                        </TableCell>
                        <TableCell>{teacher.email}</TableCell>
                        <TableCell>{teacher.phone || "N/A"}</TableCell>
                        <TableCell>{teacher.department}</TableCell>
                        <TableCell>{teacher.position}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              teacher.status === "active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {teacher.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(teacher.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleViewDetails(teacher)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(teacher)}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(teacher.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredTeachers.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No teachers found
                </div>
              ) : (
                filteredTeachers.map((teacher) => (
                  <TeacherCard
                    key={teacher.id}
                    teacher={teacher}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onViewDetails={handleViewDetails}
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <EditTeacherDialog
          teacher={editingTeacher}
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
