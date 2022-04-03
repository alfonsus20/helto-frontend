import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Button from "../Button";
import TextArea from "../TextArea";
import Input from "../Input";
import { MailIcon, PhoneIcon } from "@heroicons/react/outline";
import Logo from "../../images/logo.png";

import useForm from "../../hooks/useForm";
import useSnackbar from "../../hooks/useSnackbar";

import { postFeedback } from "../../models/feedback";

import { Feedback } from "../../types/entities/feedback";
import { FormTemplate } from "../../types/form";
import { AxiosError } from "axios";

const emptyFormData: FormTemplate<Feedback> = {
  name: {
    value: "",
    required: true,
  },
  email: { value: "", required: true },
  feedback: { value: "", required: true },
};

const Footer = () => {
  const {
    formData,
    handleChange,
    errors,
    validateData,
    getDataToSubmit,
    resetData,
  } = useForm<Feedback>(emptyFormData);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const snackbar = useSnackbar();
  const { pathname } = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isDataValid = validateData();
    if (isDataValid) {
      try {
        setSubmitting(true);
        const {
          data: { message },
        } = await postFeedback(getDataToSubmit());
        snackbar.success(message);
        resetData();
      } catch (e) {
        snackbar.error((e as AxiosError).response?.data.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div
      className={`mt-auto bg-[#F3F0E9] ${
        pathname.includes("admin") ||
        pathname.includes("login") ||
        pathname.includes("register")
          ? "hidden"
          : "block"
      }`}
    >
      <div className="grid grid-cols-12 mx-auto max-w-6xl py-10 gap-6 px-8">
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <Link to="/" className="px-6 w-max">
            <img src={Logo} alt="logo" className="w-24 h-20" />
          </Link>
          <p className="mb-2">Rawat Kentangmu bersama Healtho</p>
          <div className="flex gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 30 30"
              style={{ fill: "#000000" }}
            >
              <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ fill: "#000000" }}
            >
              <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"></path>
            </svg>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <h5 className="font-bold text-lg mb-4">Contact info</h5>
          <ul>
            <li className="flex gap-x-2 mb-2">
              <PhoneIcon className="w-5 h-5 flex-shrink-0" />
              <p>08113552304</p>
            </li>
            <li className="flex gap-x-2 mb-2">
              <MailIcon className="w-5 h-5 flex-shrink-0" />
              <p>Healtho_id@gmail.com</p>
            </li>
          </ul>
        </div>
        <div className="col-span-12 md:col-span-6">
          <h5 className="font-bold text-lg mb-4">
            Tanya dan Beri Masukan Kami
          </h5>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Nama Kamu"
              className="mb-4"
              name="name"
              value={formData.name.value}
              onChange={handleChange}
              isError={!!errors.name}
              helperText={errors.name}
            />
            <Input
              placeholder="Email Kamu"
              type="email"
              className="mb-4"
              name="email"
              value={formData.email.value}
              onChange={handleChange}
              isError={!!errors.email}
              helperText={errors.email}
            />
            <TextArea
              placeholder="Pesan atau pertanyaan kamu"
              className="mb-4"
              name="feedback"
              value={formData.feedback.value}
              onChange={handleChange}
              isError={!!errors.feedback}
              helperText={errors.feedback}
            />
            <Button type="submit" shape="pill" disabled={submitting}>
              Kirim
            </Button>
          </form>
        </div>
      </div>
      <footer className="text-center text-sm py-4 border-t-2 border-gray-300">
        &copy; 2022 HelTho, All rights reserved
      </footer>
    </div>
  );
};

export default Footer;
