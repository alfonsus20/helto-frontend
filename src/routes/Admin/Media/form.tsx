import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";

import useEffectOnce from "../../../hooks/useEffectOnce";
import useError from "../../../hooks/useError";
import useForm from "../../../hooks/useForm";
import useSnackbar from "../../../hooks/useSnackbar";
import { useLoader } from "../../../context/LoaderContext";

import { createMedia, editMedia, getMediaById } from "../../../models/media";

import { MediaParams } from "../../../types/entities/media";
import { FormTemplate } from "../../../types/form";

const emptyFormData: FormTemplate<MediaParams> = {
  link: {
    required: true,
    value: "",
  },
  description: {
    required: true,
    value: "",
  },
};

const FormMedia = () => {
  const { id } = useParams<{ id: string }>();
  const {
    handleChange,
    formData,
    errors,
    validateData,
    getDataToSubmit,
    setFormData,
  } = useForm<MediaParams>(emptyFormData);

  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const {handleError} = useError();
  const {loading, setLoading} = useLoader();

  const handleFetches = async () => {
    try {
      setLoading(true);
      const { data } = await getMediaById(+id!);
      if (data.data) {
        setFormData({
          ...formData,
          link: { ...formData.link, value: data.data.link },
          description: {
            ...formData.description,
            value: data.data.description,
          },
        });
      }
    } catch (error) {
     handleError(error)
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (validateData()) {
      try {
        setLoading(true);
        await createMedia(getDataToSubmit());
        snackbar.success("Data berhasil ditambahkan");
        navigate("/admin/media");
      } catch (error) {
       handleError(error)
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (validateData()) {
      console.log(getDataToSubmit());
      try {
        setLoading(true);
        await editMedia(+id!, getDataToSubmit());
        snackbar.success("Data berhasil ditambahkan");
        navigate("/admin/media");
      } catch (error) {
       handleError(error)
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
        {id ? "Edit" : "Tambah"} Media Terkini
      </h1>
      <form
        onSubmit={id ? handleEdit : handleSubmit}
        className="bg-white p-5 rounded-md"
      >
        <div className="flex gap-x-6 w-full mb-4">
          <div className="flex-none w-24">Link</div>
          <div className="flex-auto max-w-xl">
            <Input
              name="link"
              value={formData.link.value}
              onChange={handleChange}
              isError={!!errors.link}
              helperText={errors.link}
            />
          </div>
        </div>
        <div className="flex gap-x-6 w-full mb-4">
          <div className="flex-none w-24">Deskripsi</div>
          <div className="flex-auto max-w-xl">
            <TextArea
              name="description"
              value={formData.description.value}
              onChange={handleChange}
              isError={!!errors.description}
              helperText={errors.description}
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

export default FormMedia;
