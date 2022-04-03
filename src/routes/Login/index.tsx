import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { LockClosedIcon, UserIcon } from "@heroicons/react/outline";

import Background from "../../images/bg-masuk.webp";
import Logo from "../../images/logo-white.png";

import useForm from "../../hooks/useForm";
import useSnackbar from "../../hooks/useSnackbar";
import useError from "../../hooks/useError";
import { useUserContext } from "../../context/UserContext";

import { login } from "../../models/auth";

import { LoginParams } from "../../types/entities/auth";
import { FormTemplate } from "../../types/form";

const emptyFormData: FormTemplate<LoginParams> = {
  email: {
    value: "",
    required: true,
  },
  password: {
    value: "",
    required: true,
  },
};

const Login = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { handleChange, formData, errors, validateData, getDataToSubmit } =
    useForm<LoginParams>(emptyFormData);
  const snackbar = useSnackbar();
  const { loginUser } = useUserContext();
  const { handleError } = useError();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isDataValid = validateData();
    if (isDataValid) {
      try {
        setSubmitting(true);
        const { data } = await login(getDataToSubmit());
        snackbar.success(data.message);
        loginUser(data.data?.token!, data.data?.user.id!);
      } catch (e) {
        handleError(e);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center bg-pink-300 bg-cover"
      style={{ backgroundImage: `url("${Background}")` }}
    >
      <form
        onSubmit={handleSubmit}
        className="py-28 flex justify-center flex-col items-center max-w-xs w-full"
      >
        <img src={Logo} alt="logo" className="w-32 h-auto mb-4" />
        <Input
          appearance="secondary"
          placeholder="Email"
          className="mb-4 rounded-md"
          icon={<UserIcon className="w-5 h-5 text-white" />}
          name="email"
          onChange={handleChange}
          value={formData.email.value}
          isError={!!errors.email}
          helperText={errors.email}
        />
        <Input
          appearance="secondary"
          placeholder="Kata sandi"
          className="mb-8 rounded-md"
          type="password"
          icon={<LockClosedIcon className="w-5 h-5 text-white" />}
          name="password"
          onChange={handleChange}
          value={formData.password.value}
          isError={!!errors.password}
          helperText={errors.password}
        />
        <Button appearance="tertiary" width="full" disabled={submitting}>
          MASUK
        </Button>
      </form>
    </div>
  );
};

export default Login;
