import {
  Controller,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { Button, Col, Divider, Row, Card, Form, Input } from "antd";

import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";

import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
  useGetAllAcademicSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";

import { useCreateStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

// ⚠️ Only for development (remove later)
const studentDefaultValues = {
  name: {
    firstName: "I am",
    middleName: "Student",
    lastName: "Number 1",
  },
  gender: "male",
  bloodGroup: "A+",
  contactNo: "1235679",
  emergencyContactNo: "987-654-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-222-3333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "444-555-6666",
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "777-888-9999",
    address: "789 Pine St, Villageton",
  },
};

export default function CreateStudent() {
  /* ---------------- Mutations ---------------- */
  const [createStudent, { data, error }] = useCreateStudentMutation();
  console.log("Create Student:", data, error);

  /* ---------------- Queries ---------------- */
  const { data: sData, isLoading: sIsLoading } =
    useGetAllAcademicSemestersQuery(undefined);

  const { data: fData, isLoading: fIsLoading } = useGetAcademicFacultiesQuery(
    undefined,
    { skip: sIsLoading },
  );

  const { data: dData, isLoading: dIsLoading } = useGetAcademicDepartmentsQuery(
    undefined,
    { skip: fIsLoading },
  );

  /* ---------------- Options ---------------- */
  const semesterOptions =
    sData?.data?.map((item) => ({
      value: item._id,
      label: `${item.name} ${item.year}`,
    })) || [];

  const facultyOptions =
    fData?.data?.map((item) => ({
      value: item._id,
      label: item.name,
    })) || [];

  const departmentOptions =
    dData?.data?.map((item) => ({
      value: item._id,
      label: item.name,
    })) || [];

  /* ---------------- Submit ---------------- */
  const onSubmit: SubmitHandler<FieldValues> = async (formValues) => {
    const toastId = toast.loading("Creating student...");

    const studentData = {
      password: "student123",
      student: formValues,
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(studentData));
      if (formValues.image) {
        formData.append("file", formValues.image);
      }

      await createStudent(formData).unwrap();

      toast.success("Student created successfully", { id: toastId });
    } catch (err) {
      toast.error("Failed to create student", { id: toastId });
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <Row justify="center">
      <Col span={24}>
        <Card bordered style={{ borderRadius: 12 }}>
          <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
            {/* ===== Personal Info ===== */}
            <Divider orientation="left">👤 Personal Information</Divider>
            <Row gutter={12}>
              <Col span={24} md={8}>
                <PHInput name="name.firstName" label="First Name" />
              </Col>
              <Col span={24} md={8}>
                <PHInput name="name.middleName" label="Middle Name" />
              </Col>
              <Col span={24} md={8}>
                <PHInput name="name.lastName" label="Last Name" />
              </Col>

              <Col span={24} md={8}>
                <PHInput type="email" name="email" label="Email" />
              </Col>
              <Col span={24} md={8}>
                <PHInput name="contactNo" label="Contact No" />
              </Col>
              <Col span={24} md={8}>
                <PHInput name="emergencyContactNo" label="Emergency Contact" />
              </Col>

              <Col span={24} md={8}>
                <PHInput type="date" name="dateOfBirth" label="Date of Birth" />
              </Col>
              <Col span={24} md={8}>
                <PHInput name="gender" label="Gender" />
              </Col>
              <Col span={24} md={8}>
                <PHInput name="bloodGroup" label="Blood Group" />
              </Col>
              <Col span={24} md={8}>
                <Controller
                  name="image"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Form.Item label="Picture">
                      <Input
                        type="file"
                        value={value?.fileName}
                        {...field}
                        onChange={(e) => onChange(e.target.files?.[0])}
                      />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>

            {/* ===== Address ===== */}
            <Divider orientation="left">🏠 Address</Divider>
            <Row gutter={12}>
              <Col span={24} md={12}>
                <PHInput name="presentAddress" label="Present Address" />
              </Col>
              <Col span={24} md={12}>
                <PHInput name="permanentAddress" label="Permanent Address" />
              </Col>
            </Row>

            {/* ===== Guardian Info ===== */}
            <Divider orientation="left">👨‍👩‍👧 Guardian Information</Divider>
            <Row gutter={12}>
              <Col span={24} md={8}>
                <PHInput name="guardian.fatherName" label="Father Name" />
              </Col>
              <Col span={24} md={8}>
                <PHInput
                  name="guardian.fatherOccupation"
                  label="Father Occupation"
                />
              </Col>
              <Col span={24} md={8}>
                <PHInput
                  name="guardian.fatherContactNo"
                  label="Father Contact"
                />
              </Col>

              <Col span={24} md={8}>
                <PHInput name="guardian.motherName" label="Mother Name" />
              </Col>
              <Col span={24} md={8}>
                <PHInput
                  name="guardian.motherOccupation"
                  label="Mother Occupation"
                />
              </Col>
              <Col span={24} md={8}>
                <PHInput
                  name="guardian.motherContactNo"
                  label="Mother Contact"
                />
              </Col>
            </Row>

            {/* ===== Local Guardian ===== */}
            <Divider orientation="left">🏘 Local Guardian</Divider>
            <Row gutter={12}>
              <Col span={24} md={6}>
                <PHInput name="localGuardian.name" label="Name" />
              </Col>
              <Col span={24} md={6}>
                <PHInput name="localGuardian.occupation" label="Occupation" />
              </Col>
              <Col span={24} md={6}>
                <PHInput name="localGuardian.contactNo" label="Contact No" />
              </Col>
              <Col span={24} md={6}>
                <PHInput name="localGuardian.address" label="Address" />
              </Col>
            </Row>

            {/* ===== Academic Info ===== */}
            <Divider orientation="left">🎓 Academic Info</Divider>
            <Row gutter={12}>
              <Col span={24} md={8}>
                <PHSelect
                  name="admissionSemester"
                  label="Admission Semester"
                  options={semesterOptions}
                  disabled={sIsLoading}
                  placeholder="Select Admission Semester"
                />
              </Col>

              <Col span={24} md={8}>
                <PHSelect
                  name="academicFaculty"
                  label="Academic Faculty"
                  options={facultyOptions}
                  disabled={fIsLoading}
                  placeholder="Select Academic Faculty"
                />
              </Col>

              <Col span={24} md={8}>
                <PHSelect
                  name="academicDepartment"
                  label="Academic Department"
                  options={departmentOptions}
                  disabled={dIsLoading}
                  placeholder="Select Academic Department"
                />
              </Col>
            </Row>

            {/* ===== Submit ===== */}
            <Divider />
            <Row justify="end">
              <Button type="primary" htmlType="submit">
                Create Student
              </Button>
            </Row>
          </PHForm>
        </Card>
      </Col>
    </Row>
  );
}
