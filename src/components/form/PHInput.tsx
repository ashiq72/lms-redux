import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface PHInputProps {
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
}

const PHInput = ({ type = "text", name, label, placeholder }: PHInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Input
            {...field}
            type={type}
            placeholder={placeholder || label}
            size="large"
          />
        </Form.Item>
      )}
    />
  );
};

export default PHInput;
