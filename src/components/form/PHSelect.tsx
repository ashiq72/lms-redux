import { Form, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type PHSelectProps = {
  label?: string;
  name: string;
  options?: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  placeholder?: string;
};

const PHSelect = ({ label, name, options, placeholder }: PHSelectProps) => {
  const { control } = useFormContext();

  return (
    <Form.Item label={label}>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              {...field}
              placeholder={placeholder}
              size="large"
              style={{ width: "100%" }}
              options={options}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </>
        )}
      />
    </Form.Item>
  );
};

export default PHSelect;
