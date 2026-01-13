import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInupt from "../../../components/form/PHInupt";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

const CreateAcademicSemester = () => {
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    const semesterData = {
      name: data.name,
      code: data.value,
    };
    console.log(semesterData);
  };

  const nameOptions = [
    { value: "01", label: "Autumn" },
    { value: "02", label: "Summer" },
    { value: "03", label: "Fall" },
  ];
  return (
    <Flex justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={6}>
        <PHForm onSubmit={onsubmit}>
          <PHInupt type="text" name="name" label="Name" />
          <PHSelect label="Name" name="name" options={nameOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
