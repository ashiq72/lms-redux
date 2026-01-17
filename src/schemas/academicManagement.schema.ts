import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string().min(1, "Please select a Name"),
  year: z.string().min(1, "Please select a Year"),
  startMonth: z.string().min(1, "Please select a Start Month"),
  endMonth: z.string().min(1, "Please select a End Month"),
});

export const academicFacultySchema = z.object({
  name: z.string().min(1, "Please write a name"),
});

export const academicDepartmentSchema = z.object({
  name: z.string().min(1, "Department name is required"),
  academicFaculty: z.string().min(1, "Faculty is required"),
});
