import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Card, Col, Flex, Typography } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateAcademicManagementMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import type { TResponse } from "../../../types/global";

const { Title } = Typography;

const nameOptions = [
  { value: "01", label: "Autumn" },
  { value: "02", label: "Summer" },
  { value: "03", label: "Fall" },
];

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4, 5].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [createAcademic] = useCreateAcademicManagementMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester...");

    const name = nameOptions.find((item) => item.value === data.name)?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const result = (await createAcademic(semesterData)) as TResponse;

      if (result.error) {
        toast.success(result.error?.data?.message, { id: toastId });
      } else {
        toast.success("Academic semester created successfully", {
          id: toastId,
        });
      }
    } catch {
      toast.error("Failed to create academic semester", { id: toastId });
    }
  };
  const academicSemesterSchema = z.object({
    name: z.enum(["01", "02", "03"], {
      message: "Semester name is required",
    }),
    year: z.string().regex(/^\d{4}$/, "Invalid year"),
    startMonth: z.enum(
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      {
        message: "Start month is required",
      }
    ),
    endMonth: z.enum(
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      {
        message: "End month is required",
      }
    ),
  });

  return (
    <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
      <Col xs={22} sm={18} md={12} lg={8}>
        <Card bordered={false} style={{ borderRadius: 12 }}>
          <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
            Create Academic Semester
          </Title>

          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicSemesterSchema)}
          >
            <PHSelect
              label="Semester Name"
              name="name"
              placeholder="Select semester"
              options={nameOptions}
            />

            <PHSelect
              label="Year"
              name="year"
              placeholder="Select year"
              options={yearOptions}
            />

            <PHSelect
              label="Start Month"
              name="startMonth"
              placeholder="Select start month"
              options={monthOptions}
            />

            <PHSelect
              label="End Month"
              name="endMonth"
              placeholder="Select end month"
              options={monthOptions}
            />

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{ marginTop: 16 }}
            >
              Create Semester
            </Button>
          </PHForm>
        </Card>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
