import { Button, Card, Col, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import {
  useCreateAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import PHInput from "../../../components/form/PHInput";

type TAcademicDepartmentForm = z.infer<typeof academicDepartmentSchema>;

interface IAcademicFaculty {
  _id: string;
  name: string;
}

const CreateAcademicDepartment = () => {
  const [createAcademicDepartment] = useCreateAcademicDepartmentMutation();

  const { data: fData, isLoading: fIsLoading } =
    useGetAcademicFacultiesQuery(undefined);

  const facultyOptions = fData?.data?.map((item: IAcademicFaculty) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<TAcademicDepartmentForm> = async (data) => {
    const toastId = toast.loading("Creating academic department...");

    try {
      await createAcademicDepartment(data).unwrap();

      toast.success("Academic department created successfully", {
        id: toastId,
      });
    } catch (error: unknown) {
      const apiError = error as { data?: { message?: string } };
      toast.error(
        apiError?.data?.message || "Failed to create academic department",
        { id: toastId }
      );
    }
  };

  return (
    <Flex justify="center" align="top" style={{ minHeight: "100vh" }}>
      <Col xs={22} sm={18} lg={8}>
        <Card bordered={false} style={{ borderRadius: 12 }}>
          <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
            Create Academic Department
          </Title>

          <PHForm<TAcademicDepartmentForm>
            onSubmit={onSubmit}
            resolver={zodResolver(academicDepartmentSchema)}
          >
            <PHInput
              label="Department Name"
              placeholder="Enter department name"
              type="text"
              name="name"
            />

            <PHSelect
              options={facultyOptions}
              disabled={fIsLoading}
              name="academicFaculty"
              label="Faculty"
              placeholder="Select faculty"
            />

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{ marginTop: 16 }}
            >
              Create Department
            </Button>
          </PHForm>
        </Card>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
