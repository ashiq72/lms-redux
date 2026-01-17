import { Button, Card, Col, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import PHInput from "../../../components/form/PHInput";

type TAcademicFacultyForm = z.infer<typeof academicFacultySchema>;

const CreateAcademicFaculty = () => {
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();

  const onSubmit: SubmitHandler<TAcademicFacultyForm> = async (data) => {
    const toastId = toast.loading("Creating academic faculty...");

    try {
      await createAcademicFaculty({ name: data.name }).unwrap();

      toast.success("Academic faculty created successfully", { id: toastId });
    } catch {
      toast.error("Failed to create academic faculty", {
        id: toastId,
      });
    }
  };

  return (
    <Flex justify="center" align="top" style={{ minHeight: "100vh" }}>
      <Col xs={22} sm={18} lg={8}>
        <Card bordered={false} style={{ borderRadius: 12 }}>
          <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
            Create Academic Faculty
          </Title>

          <PHForm<TAcademicFacultyForm>
            onSubmit={onSubmit}
            resolver={zodResolver(academicFacultySchema)}
          >
            <PHInput
              label="Faculty Name"
              placeholder="Write a faculty"
              type="text"
              name="name"
            />

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{ marginTop: 16 }}
            >
              Create Faculty
            </Button>
          </PHForm>
        </Card>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
