import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import Button from "../../../components/Button";
import Input from "../../../components/Input";

import useEffectOnce from "../../../hooks/useEffectOnce";
import useError from "../../../hooks/useError";
import useForm from "../../../hooks/useForm";
import useSnackbar from "../../../hooks/useSnackbar";

import {
  createAgenda,
  editAgenda,
  getAgendaById,
} from "../../../models/agenda";

import { AgendaParams } from "../../../types/entities/agenda";
import { FormTemplate } from "../../../types/form";
import { useLoader } from "../../../context/LoaderContext";

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
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    handleChange,
    formData,
    errors,
    validateData,
    getDataToSubmit,
    setFormData,
  } = useForm<AgendaParams>(emptyFormData);
  const { handleError } = useError();
  const { loading, setLoading } = useLoader();

  const handleFetches = async () => {
    try {
      setLoading(true);
      const { data } = await getAgendaById(+id!);
      if (data.data) {
        console.log(data.data);
        setFormData({
          ...formData,
          name: { ...formData.name, value: data.data.name },
          date: {
            ...formData.date,
            value: dayjs(data.data.date).format("YYYY-MM-DD").toString(),
          },
        });
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (validateData()) {
      try {
        setLoading(true);
        await createAgenda(getDataToSubmit());
        snackbar.success("Data berhasil ditambahkan");
        navigate("/admin/agenda");
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (validateData()) {
      try {
        setLoading(true);
        await editAgenda(+id!, getDataToSubmit());
        snackbar.success("Data berhasil diperbarui");
        navigate("/admin/agenda");
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
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
        onSubmit={id ? handleEdit : handleSubmit}
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
          <div className="flex-none w-24">Tanggal</div>
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
          <Button appearance="edit" shape="rounded" disabled={loading}>
            SIMPAN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormAgenda;
