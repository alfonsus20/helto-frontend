import React, { useEffect, useState } from "react";
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
import useForm from "../../hooks/useForm";
import { FormTemplate, SelectItem } from "../../types/form";
import { RegisterParams } from "../../types/entities/auth";
import { register } from "../../models/auth";
import useEffectOnce from "../../hooks/useEffectOnce";
import { getCities, getProvinces } from "../../models/location";
import useSnackbar from "../../hooks/useSnackbar";
import { AxiosError } from "axios";
import { useUserContext } from "../../context/UserContext";
import Logo from "../../images/logo-white.png";

const emptyFormData: FormTemplate<RegisterParams> = {
  name: {
    value: "",
    required: true,
  },
  email: {
    value: "",
    required: true,
  },
  password: {
    value: "",
    required: true,
  },
  phone: {
    value: "",
    required: true,
  },
  region: {
    value: "",
    required: true,
  },
  province: {
    value: "",
    required: true,
  },
};

const Register = () => {
  const [provinces, setProvinces] = useState<Array<SelectItem>>([]);
  const [cities, setCities] = useState<Array<SelectItem>>([]);
  const [selectedProvince, setSelectedProvince] = useState<SelectItem>({
    label: "",
    value: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const {
    handleChange,
    formData,
    setFormData,
    errors,
    validateData,
    getDataToSubmit,
  } = useForm<RegisterParams>(emptyFormData);
  const snackbar = useSnackbar();
  const { loginUser } = useUserContext();

  const getProvinceList = async () => {
    try {
      setLoading(true);
      const { data } = await getProvinces();
      const provinceData = data.provinsi.map((prov) => ({
        label: prov.nama,
        value: prov.id.toString(),
      }));
      setProvinces(provinceData);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const getCityList = async () => {
    try {
      setLoading(true);
      const { data } = await getCities(selectedProvince.value);
      const provinceData = data.kota_kabupaten.map((prov) => ({
        label: prov.nama,
        value: prov.nama,
      }));
      setCities(provinceData);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isDataValid = validateData();
    if (isDataValid) {
      try {
        setSubmitting(true);
        const { data } = await register(getDataToSubmit());
        snackbar.success(data.message);
        loginUser(data.data?.token!, data.data?.user.id!);
      } catch (e) {
        snackbar.error((e as AxiosError).response?.data.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  useEffectOnce(() => {
    getProvinceList();
  });

  useEffect(() => {
    setFormData({
      ...formData,
      region: { ...emptyFormData.region, value: "" },
    });
    getCityList();
  }, [selectedProvince]);

  return (
    <div
      className="min-h-screen flex justify-center bg-pink-300 bg-cover"
      style={{ backgroundImage: `url("${Background}")` }}
    >
      <form
        onSubmit={handleSubmit}
        className="py-28 flex justify-center flex-col items-center max-w-xs w-full"
      >
        <img src={Logo} alt="logo" className="w-32 h-auto" />
        <Input
          appearance="secondary"
          placeholder="Nama Lengkap"
          className="mb-4 rounded-md"
          icon={<UserIcon className="w-5 h-5 text-white" />}
          name="name"
          onChange={handleChange}
          isError={!!errors.name}
          helperText={errors.name}
        />
        <Input
          appearance="secondary"
          placeholder="Email"
          className="mb-4 rounded-md"
          icon={<MailIcon className="w-5 h-5 text-white" />}
          name="email"
          onChange={handleChange}
          isError={!!errors.email}
          helperText={errors.email}
        />
        <Input
          appearance="secondary"
          placeholder="Kata sandi"
          className="mb-4 rounded-md"
          type="password"
          onChange={handleChange}
          icon={<LockClosedIcon className="w-5 h-5 text-white" />}
          name="password"
          isError={!!errors.password}
          helperText={errors.password}
        />
        <Input
          appearance="secondary"
          placeholder="No Telepon"
          type="tel"
          onChange={handleChange}
          className="mb-4 rounded-md"
          icon={<PhoneIcon className="w-5 h-5 text-white" />}
          name="phone"
          isError={!!errors.phone}
        />
        <Select
          name="province"
          defaultText="PILIH PROVINSI"
          items={provinces}
          icon={<MapIcon className="w-5 h-5" />}
          value={selectedProvince.label}
          onChange={(e) => {
            handleChange(e);
            const res = provinces.find(
              (province) => province.value === e.target.value
            );
            setSelectedProvince({ label: res!.label, value: res!.value });
          }}
          className="mb-4"
          isError={!!errors.province}
          helperText={errors.province}
        />
        <Select
          value={formData.region.value}
          name="region"
          defaultText="PILIH DAERAH"
          items={cities}
          icon={<LocationMarkerIcon className="w-5 h-5" />}
          onChange={handleChange}
          className="mb-6"
          loading={loading}
          isError={!!errors.region}
          helperText={errors.region}
        />
        <Button appearance="tertiary" width="full" disabled={submitting}>
          DAFTAR
        </Button>
      </form>
    </div>
  );
};

export default Register;
