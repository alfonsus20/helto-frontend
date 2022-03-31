import dayjs from "dayjs";
import React, { ChangeEvent, useState } from "react";
import { FormTemplate } from "../types/form";

function useForm<T>(formData: FormTemplate<T>) {
  const [data, setData] = useState(formData);
  const [errors, setErrors] = useState<{
    [key in keyof FormTemplate<T>]: string;
  }>({} as { [key in keyof FormTemplate<T>]: string });

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
      return {
        ...prev,
        [key]:
          currentData.type === "date"
            ? dayjs(`${currentData.value}`).format("DD-MM-YYYY")
            : currentData.value,
      };
    }, {} as T);
    return dataToSubmit;
  };

  const resetData = () => {
    setData(formData);
  };

  return {
    handleChange,
    errors,
    formData: data,
    setFormData: setData,
    resetData,
    validateData,
    getDataToSubmit,
  };
}

export default useForm;
