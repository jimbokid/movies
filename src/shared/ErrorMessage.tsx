import * as React from "react";
import Layout from "./Layout";
import Typography from "@material-ui/core/Typography";

interface Props {
  error?: {
    message: string;
    response: {
      data: {
        status_message: string;
      };
    };
  };
}

export const ErrorMessage: React.FC<Props> = ({ error }: Props) => {
  return (
    <Layout>
      <Typography variant="title" gutterBottom>
        Something goes wrong:
      </Typography>
      <Typography gutterBottom>{error?.message}</Typography>
      <Typography gutterBottom>
        {error?.response?.data?.status_message}
      </Typography>
    </Layout>
  );
};

export default ErrorMessage;
