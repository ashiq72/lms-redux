import { Form } from "antd";
import { Controller } from "react-hook-form";

interface PHInputProps {
  type: string;
  name: string;
  label?: string;
}

const PHInupt = ({ type, name, label }: PHInputProps) => {
  return (
    <div
      style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}
    >
      {/* {label ? label : null} */}
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label} name={name}>
            <input type={type} id={name} {...field} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInupt;
