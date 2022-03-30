import { AxiosError, AxiosPromise } from "axios";
import React, { ChangeEvent, useState } from "react";
import { APIResponse } from "../types/apiResponse";
import { FormTemplate } from "../types/form";
import useSnackbar from "./useSnackbar";

function useForm<T, U>(
  formData: FormTemplate<T>,
  onSubmit: (params: T) => AxiosPromise<APIResponse<U>>
) {
  const [data, setData] = useState(formData);
  const [errors, setErrors] = useState<{
    [key in keyof FormTemplate<T>]: string;
  }>({} as { [key in keyof FormTemplate<T>]: string });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const snackbar = useSnackbar();

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [evt.target.name]: {
        ...data[evt.target.name as keyof FormTemplate<T>],
        value: evt.target.value,
      },
    });
  };

  const validateData = () => {
    let errorAll = {} as {
      [key in keyof FormTemplate<T>]: string;
    };
    Object.keys(data).forEach((key) => {
      const currentData = data[key as keyof FormTemplate<T>];
      if (currentData.required) {
        if (!currentData.value) {
          errorAll = { ...errorAll, [key]: `${key} tidak boleh kosong` };
        }
      }
    });
    setErrors(errorAll);
    const isErrorExist = Object.keys(errorAll).length > 0;
    return !isErrorExist;
  };

  const getDataToSubmit = () => {
    const dataToSubmit = Object.keys(data).reduce((prev, key) => {
      const currentData = data[key as keyof FormTemplate<T>];
      return { ...prev, [key]: currentData.value };
    }, {} as T);
    return dataToSubmit;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isDataValid = validateData();
    if (isDataValid) {
      try {
        setSubmitting(true);
        const {
          data: { message },
        } = await onSubmit(getDataToSubmit());
        snackbar.success(message);
        setData(formData);
      } catch (e) {
        snackbar.error((e as AxiosError).message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return {
    handleChange,
    errors,
    handleSubmit,
    formData: data,
    isSubmitting: submitting,
  };
}

export default useForm;
