import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInupt from "../../../components/form/PHInupt";
import { Button } from "antd";

const CreateAcademicSemester = () => {
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <PHForm onSubmit={onsubmit}>
        <PHInupt type="text" name="name" label="Name" />
        <Button htmlType="submit">Submit</Button>
      </PHForm>
    </div>
  );
};

export default CreateAcademicSemester;
