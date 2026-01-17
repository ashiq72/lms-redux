import type { SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Divider, Row, Card } from "antd";
import {
  useGetAcademicFacultiesQuery,
  useGetAllAcademicSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHSelect from "../../../components/form/PHSelect";
import { useCreateStudentMutation } from "../../../redux/features/admin/userManagement.api";
import type { TStudentForm } from "../../../types/userManagement.type";
import PHInput from "../../../components/form/PHInput";
//! This is only for development
//! Should be removed
const studentDefaultValues: TStudentForm = {
  name: {
    firstName: "I am ",
    middleName: "Student",
    lastName: "Number 1",
  },
  gender: "male",

  bloodGroup: "A+",

  contactNo: "1235678",
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

  // admissionSemester: "65bb60ebf71fdd1add63b1c0",
  // academicDepartment: "65b4acae3dc8d4f3ad83e416",
};
export default function CreateStudent() {
  const [createStudent, { data, error }] = useCreateStudentMutation();
  console.log({ data, error });

  const { data: sData, isLoading: sIsLoading } =
    useGetAllAcademicSemestersQuery(undefined);
  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const { data: fData, isLoading: fIsLoading } =
    useGetAcademicFacultiesQuery(undefined);
  const facultyOptions = fData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const onSubmit: SubmitHandler<TStudentForm> = (data) => {
    const studentData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    createStudent(formData);
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <Card bordered style={{ borderRadius: 12 }}>
          <PHForm<TStudentForm>
            onSubmit={onSubmit}
            defaultValues={studentDefaultValues}
          >
            {/* ========== Personal Info ========== */}
            <Divider orientation="left">👤 Personal Information</Divider>
            <Row gutter={12}>
              <Col span={24} md={8}>
                <PHInput type="text" name="name.firstName" label="First Name" />
              </Col>
              <Col span={24} md={8}>
                <PHInput
                  type="text"
                  name="name.middleName"
                  label="Middle Name"
                />
              </Col>
              <Col span={24} md={8}>
                <PHInput type="text" name="name.lastName" label="Last Name" />
              </Col>

              <Col span={24} md={8}>
                <PHInput type="email" name="email" label="Email" />
              </Col>
              <Col span={24} md={8}>
                <PHInput type="text" name="contactNo" label="Contact No" />
              </Col>
              <Col span={24} md={8}>
                <PHInput
                  type="text"
                  name="emergencyContactNo"
                  label="Emergency Contact"
                />
              </Col>

              <Col span={24} md={8}>
                <PHInput type="date" name="dateOfBirth" label="Date of Birth" />
              </Col>
              <Col span={24} md={8}>
                <PHInput
                  type="text"
                  name="gender"
                  label="Gender (male/female)"
                />
              </Col>
              <Col span={24} md={8}>
                <PHInput type="text" name="bloodGroup" label="Blood Group" />
              </Col>
            </Row>

            {/* ========== Address ========== */}
            <Divider orientation="left">🏠 Address</Divider>
            <Row gutter={12}>
              <Col span={24} md={12}>
                <PHInput
                  type="text"
                  name="presentAddress"
                  label="Present Address"
                />
              </Col>
              <Col span={24} md={12}>
                <PHInput
                  type="text"
                  name="permanentAddress"
                  label="Permanent Address"
                />
              </Col>
            </Row>

            {/* ========== Guardian Info ========== */}
            <Divider orientation="left">👨‍👩‍👧 Guardian Information</Divider>
            <Row gutter={12}>
              <Col span={24} md={8}>
                <PHInput
                  type="text"
                  name="guardian.fatherName"
                  label="Father Name"
                />
              </Col>
              <Col span={24} md={8}>
                <PHInput
                  type="text"
                  name="guardian.fatherOccupation"
                  label="Father Occupation"
                />
              </Col>
              <Col span={24} md={8}>
                <PHInput
                  type="text"
                  name="guardian.fatherContactNo"
                  label="Father Contact"
                />
              </Col>

              <Col span={24} md={8}>
                <PHInput
                  type="text"
                  name="guardian.motherName"
                  label="Mother Name"
                />
              </Col>
              <Col span={24} md={8}>
                <PHInput
                  type="text"
                  name="guardian.motherOccupation"
                  label="Mother Occupation"
                />
              </Col>
              <Col span={24} md={8}>
                <PHInput
                  type="text"
                  name="guardian.motherContactNo"
                  label="Mother Contact"
                />
              </Col>
            </Row>

            {/* ========== Local Guardian ========== */}
            <Divider orientation="left">🏘 Local Guardian</Divider>
            <Row gutter={12}>
              <Col span={24} md={6}>
                <PHInput type="text" name="localGuardian.name" label="Name" />
              </Col>
              <Col span={24} md={6}>
                <PHInput
                  type="text"
                  name="localGuardian.occupation"
                  label="Occupation"
                />
              </Col>
              <Col span={24} md={6}>
                <PHInput
                  type="text"
                  name="localGuardian.contactNo"
                  label="Contact No"
                />
              </Col>
              <Col span={24} md={6}>
                <PHInput
                  type="text"
                  name="localGuardian.address"
                  label="Address"
                />
              </Col>
            </Row>

            {/* ========== Academic Info ========== */}
            <Divider orientation="left">🎓 Academic Info</Divider>
            <Row gutter={12}>
              <Col span={24} md={8}>
                <PHSelect
                  options={semesterOptions}
                  disabled={sIsLoading}
                  name="admissionSemester"
                  label="Admission Semester ID"
                  placeholder="Select Admission Semester"
                />
              </Col>
              <Col span={24} md={8}>
                <PHSelect
                  options={facultyOptions}
                  disabled={fIsLoading}
                  name="academicFaculty"
                  label="Academic Faculty ID"
                  placeholder="Select Academic faculty"
                />
              </Col>

              <Col span={24} md={8}>
                <PHInput
                  type="text"
                  name="academicFaculty"
                  label="Faculty ID"
                />
              </Col>
            </Row>

            {/* ========== Submit ========== */}
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
