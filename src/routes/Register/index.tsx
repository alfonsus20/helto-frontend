import React from "react";
import CartImage from "../../images/cart.png";
import Input from "../../components/Input";
import {
  LocationMarkerIcon,
  LockClosedIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Button from "../../components/Button";

const Register = () => {
  return (
    <div className="min-h-screen bg-pink-300 flex justify-center">
      <div className="py-32 flex justify-center flex-col items-center max-w-xs w-full">
        <img src={CartImage} alt="logo" className="w-32 h-auto mb-4" />
        <Input
          appearance="secondary"
          placeholder="Nama Lengkap"
          className="mb-4 px-2 rounded-md"
          icon={<UserIcon className="w-5 h-5 text-white" />}
        />
        <Input
          appearance="secondary"
          placeholder="Email"
          className="mb-4 px-2 rounded-md"
          icon={<MailIcon className="w-5 h-5 text-white" />}
        />
        <Input
          appearance="secondary"
          placeholder="Kata sandi"
          className="mb-4 px-2 rounded-md"
          type="password"
          icon={<LockClosedIcon className="w-5 h-5 text-white" />}
        />
        <Input
          appearance="secondary"
          placeholder="No Telepon"
          type="tel"
          className="mb-4 px-2 rounded-md"
          icon={<PhoneIcon className="w-5 h-5 text-white" />}
        />
        <Input
          appearance="secondary"
          placeholder="Daerah Pertanian"
          type="tel"
          className="mb-8 px-2 rounded-md"
          icon={<LocationMarkerIcon className="w-5 h-5 text-white" />}
        />
        <Button appearance="tertiary" width="full">
          DAFTAR
        </Button>
      </div>
    </div>
  );
};

export default Register;
