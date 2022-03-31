import { AxiosError } from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import useEffectOnce from "../../../hooks/useEffectOnce";
import useForm from "../../../hooks/useForm";
import useSnackbar from "../../../hooks/useSnackbar";
import { createAgenda, getAgendaById } from "../../../models/agenda";
import { AgendaParams } from "../../../types/entities/agenda";
import { FormTemplate } from "../../../types/form";
import { errorHandler } from "../../../utils/helper";

const emptyFormData: FormTemplate<AgendaParams> = {
  name: {
    required: true,
    value: "",
  },
  date: {
    required: true,
    value: "",
    type: "date",
  },
};

const FormAgenda = () => {
  const { id } = useParams<{ id: string }>();
  const {
    handleChange,
    formData,
    errors,
    validateData,
    getDataToSubmit,
    setFormData,
  } = useForm<AgendaParams>(emptyFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const handleFetches = async () => {
    try {
      setIsFetching(true);
      const { data } = await getAgendaById(+id!);
      if (data.data) {
        console.log(data.data);
        setFormData({
          ...formData,
          name: { ...formData.name, value: data.data.name },
          date: {
            ...formData.name,
            value: dayjs(data.data.date).format("YYYY-MM-DD").toString(),
          },
        });
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (validateData()) {
      try {
        setIsSubmitting(true);
        await createAgenda(getDataToSubmit());
        snackbar.success("Data berhasil ditambahkan");
        navigate("/admin/agenda");
      } catch (error) {
        errorHandler(error as AxiosError);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffectOnce(() => {
    if (id) {
      handleFetches();
    }
  });

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">
        {id ? "Edit" : "Tambah"} Agenda Terkini
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-md"
        action=""
      >
        <div className="flex gap-x-6 w-full mb-4">
          <div className="flex-none w-24">Judul</div>
          <div className="flex-auto max-w-xl">
            <Input
              name="name"
              value={formData.name.value}
              onChange={handleChange}
              isError={!!errors.name}
              helperText={errors.name}
            />
          </div>
        </div>
        <div className="flex gap-x-6 w-full mb-4">
          <div className="flex-none w-24">Keterangan</div>
          <div className="flex-auto max-w-xl">
            <Input
              name="date"
              value={formData.date.value}
              type="date"
              onChange={handleChange}
              isError={!!errors.date}
              helperText={errors.date}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button appearance="edit" shape="rounded" disabled={isSubmitting}>
            SIMPAN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormAgenda;
