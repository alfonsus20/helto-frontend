import React, { ChangeEvent } from "react";
import CartImage from "../../images/cart.png";
import Input from "../../components/Input";
import {
  LocationMarkerIcon,
  LockClosedIcon,
  MailIcon,
  MapIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Button from "../../components/Button";
import Background from "../../images/bg-daftar.webp";
import Select from "../../components/Select";

const Register = () => {
  const handleChange = (e: ChangeEvent) => {};

  return (
    <div
      className="min-h-screen flex justify-center bg-pink-300 bg-cover"
      style={{ backgroundImage: `url("${Background}")` }}
    >
      <div className="py-28 flex justify-center flex-col items-center max-w-xs w-full">
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
        <Select
          name="provinsi"
          defaultText="PILIH PROVINSI"
          items={[
            { label: "Sulawesi", value: "sulawesi" },
            { label: "papua", value: "papua" },
          ]}
          icon={<MapIcon className="w-5 h-5" />}
          onChange={handleChange}
          className="mb-4"
        />
        <Select
          name="provinsi"
          defaultText="PILIH PROVINSI"
          items={[
            { label: "MAKASSAR", value: "makassar" },
            { label: "asdas", value: "adas" },
          ]}
          icon={<LocationMarkerIcon className="w-5 h-5 text-white" />}
          onChange={handleChange}
          className="mb-6"
        />
        <Button appearance="tertiary" width="full">
          DAFTAR
        </Button>
      </div>
    </div>
  );
};

export default Register;
