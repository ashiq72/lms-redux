import { useFormContext } from "react-hook-form";

interface PHInputProps {
  type: string;
  name: string;
  label?: string;
}

const PHInupt = ({ type, name, label }: PHInputProps) => {
  const { register } = useFormContext();
  return (
    <>
      {label && <label htmlFor={name}>{label}:</label>}
      <input type={type} id={name} {...register(name)} />
    </>
  );
};

export default PHInupt;
