import { Form } from "antd";
import { Controller } from "react-hook-form";

type PHSelectProps = {
  label?: string;
  name: string;
  options?: { value: string; label: string; desabled?: boolean }[];
};
const PHSelect = ({ label, name, options }: PHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <select defaultValue="lucy" style={{ width: 120 }} {...field}>
            {options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.desabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
