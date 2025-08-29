export interface Teacher {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  department?: string;
  position?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkSession {
  id: string;
  teacher_id: string;
  start_time: string;
  end_time?: string;
  status: "active" | "break" | "completed";
  break_project?: string;
  total_hours?: number;
  created_at: string;
  updated_at: string;
  teacher?: Teacher;
}

export interface BreakLog {
  id: string;
  session_id: string;
  break_start: string;
  break_end?: string;
  project_description?: string;
  created_at: string;
}

export interface CreateTeacherData {
  email: string;
  full_name: string;
  phone?: string;
  department?: string;
  position?: string;
}

export interface UpdateWorkSessionData {
  end_time?: string;
  status?: "active" | "break" | "completed";
  break_project?: string;
  total_hours?: number;
}
