export type TError = {
  data: {
    message: string;
    stack?: string;
    success?: boolean;
  };
  status: number;
};

export type TResponse = {
  data?: unknown;
  error?: TError;
  success: boolean;
};
