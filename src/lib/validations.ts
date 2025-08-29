import { z } from "zod";

// Teacher form validation schema
export const teacherSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  department: z.string().min(1, "Department is required"),
  position: z.string().min(1, "Position is required"),
  address: z.string().optional(),
  emergency_contact: z.string().optional(),
  qualifications: z.string().optional(),
  notes: z.string().optional(),
});

// Work session form validation schema
export const workSessionSchema = z.object({
  teacher_id: z.string().min(1, "Teacher is required"),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  status: z.enum(["active", "break", "completed"]),
  break_project: z.string().optional(),
  total_hours: z.number().optional(),
});
