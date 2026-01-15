import { Form } from "antd";
import {
  FormProvider,
  useForm,
  type SubmitHandler,
  type FieldValues,
  type Resolver,
  type DefaultValues,
} from "react-hook-form";

type TFormConfig<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>;
  resolver?: Resolver<T>;
};

type TFormProps<T extends FieldValues> = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
} & TFormConfig<T>;

const PHForm = <T extends FieldValues>({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProps<T>) => {
  const methods = useForm<T>({
    defaultValues,
    resolver,
  });

  const submit: SubmitHandler<T> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
