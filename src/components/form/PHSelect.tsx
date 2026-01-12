import { Form, Space } from "antd";

const PHSelect = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <Form.Item>
      <select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="jack">Jack</option>
        <option value="lucy">Lucy</option>
        <option value="disabled" disabled>
          Disabled
        </option>
        <option value="Yiminghe">yiminghe</option>
      </select>
    </Form.Item>
  );
};

export default PHSelect;
