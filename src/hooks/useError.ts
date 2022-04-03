import useSnackbar from "./useSnackbar";
import { AxiosError } from "axios";

function useError() {
  const snackbar = useSnackbar();
  const handleError = (err: unknown) => {
    snackbar.error((err as AxiosError).response?.data.message);
  };

  return { handleError };
}

export default useError;
