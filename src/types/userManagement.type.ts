export type TStudentForm = {
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  email?: string;
  gender: string;
  bloodGroup: string;
  contactNo: string;
  emergencyContactNo: string;
  dateOfBirth?: string;
  presentAddress: string;
  permanentAddress: string;

  guardian: {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
  };

  localGuardian: {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
  };

  admissionSemester?: string;
  academicDepartment?: string;
  academicFaculty?: string;
};
