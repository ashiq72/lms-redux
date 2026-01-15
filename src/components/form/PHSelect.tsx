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
  disabled?: boolean;
};

const PHSelect = ({
  label,
  name,
  options,
  placeholder,
  disabled,
}: PHSelectProps) => {
  const { control } = useFormContext();

  return (
    <>
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
                disabled={disabled}
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </>
          )}
        />
      </Form.Item>
    </>
  );
};

export default PHSelect;
