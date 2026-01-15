import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInupt from "../../../components/form/PHInupt";
import { Button, Col, Divider, Row, Card } from "antd";
import { useGetAllAcademicManagementsQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelect from "../../../components/form/PHSelect";
import { useCreateStudentMutation } from "../../../redux/features/admin/userManagement.api";
//! This is only for development
//! Should be removed
const studentDefaultValues = {
  name: {
    firstName: "I am ",
    middleName: "Student",
    lastName: "Number 1",
  },
  gender: "male",

  bloogGroup: "A+",

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

  admissionSemester: "65bb60ebf71fdd1add63b1c0",
  academicDepartment: "65b4acae3dc8d4f3ad83e416",
};
export default function CreateStudent() {
  const [createStudent, { data, error }] = useCreateStudentMutation();
  console.log({ data, error });

  const { data: sData, isLoading: sIsLoading } =
    useGetAllAcademicManagementsQuery(undefined);
  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
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
          <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
            {/* ========== Personal Info ========== */}
            <Divider orientation="left">👤 Personal Information</Divider>
            <Row gutter={12}>
              <Col span={24} md={8}>
                <PHInupt type="text" name="name.firstName" label="First Name" />
              </Col>
              <Col span={24} md={8}>
                <PHInupt
                  type="text"
                  name="name.middleName"
                  label="Middle Name"
                />
              </Col>
              <Col span={24} md={8}>
                <PHInupt type="text" name="name.lastName" label="Last Name" />
              </Col>

              <Col span={24} md={8}>
                <PHInupt type="email" name="email" label="Email" />
              </Col>
              <Col span={24} md={8}>
                <PHInupt type="text" name="contactNo" label="Contact No" />
              </Col>
              <Col span={24} md={8}>
                <PHInupt
                  type="text"
                  name="emergencyContactNo"
                  label="Emergency Contact"
                />
              </Col>

              <Col span={24} md={8}>
                <PHInupt type="date" name="dateOfBirth" label="Date of Birth" />
              </Col>
              <Col span={24} md={8}>
                <PHInupt
                  type="text"
                  name="gender"
                  label="Gender (male/female)"
                />
              </Col>
              <Col span={24} md={8}>
                <PHInupt type="text" name="bloogGroup" label="Blood Group" />
              </Col>
            </Row>

            {/* ========== Address ========== */}
            <Divider orientation="left">🏠 Address</Divider>
            <Row gutter={12}>
              <Col span={24} md={12}>
                <PHInupt
                  type="text"
                  name="presentAddress"
                  label="Present Address"
                />
              </Col>
              <Col span={24} md={12}>
                <PHInupt
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
                <PHInupt
                  type="text"
                  name="guardian.fatherName"
                  label="Father Name"
                />
              </Col>
              <Col span={24} md={8}>
                <PHInupt
                  type="text"
                  name="guardian.fatherOccupation"
                  label="Father Occupation"
                />
              </Col>
              <Col span={24} md={8}>
                <PHInupt
                  type="text"
                  name="guardian.fatherContactNo"
                  label="Father Contact"
                />
              </Col>

              <Col span={24} md={8}>
                <PHInupt
                  type="text"
                  name="guardian.motherName"
                  label="Mother Name"
                />
              </Col>
              <Col span={24} md={8}>
                <PHInupt
                  type="text"
                  name="guardian.motherOccupation"
                  label="Mother Occupation"
                />
              </Col>
              <Col span={24} md={8}>
                <PHInupt
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
                <PHInupt type="text" name="localGuardian.name" label="Name" />
              </Col>
              <Col span={24} md={6}>
                <PHInupt
                  type="text"
                  name="localGuardian.occupation"
                  label="Occupation"
                />
              </Col>
              <Col span={24} md={6}>
                <PHInupt
                  type="text"
                  name="localGuardian.contactNo"
                  label="Contact No"
                />
              </Col>
              <Col span={24} md={6}>
                <PHInupt
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
                <PHInupt type="text" name="id" label="Student ID" />
              </Col>
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
                <PHInupt
                  type="text"
                  name="academicDepartment"
                  label="Department ID"
                />
              </Col>
              <Col span={24} md={8}>
                <PHInupt
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
