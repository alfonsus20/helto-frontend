import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";

import useEffectOnce from "../../../hooks/useEffectOnce";
import useForm from "../../../hooks/useForm";
import useSnackbar from "../../../hooks/useSnackbar";
import useError from "../../../hooks/useError";
import { useLoader } from "../../../context/LoaderContext";

import {
  createTipsAndTrick,
  editTipsAndTrick,
  getTipsAndTrickById,
} from "../../../models/tipsAndTrick";

import { FormTemplate } from "../../../types/form";
import { TipsAndTrickParams } from "../../../types/entities/tipsAndTrick";

import { getImageURL } from "../../../utils/helper";

const emptyFormData: FormTemplate<TipsAndTrickParams> = {
  title: {
    required: true,
    value: "",
  },
  content: {
    required: true,
    value: "",
  },
  image: {
    required: true,
    value: null as any,
  },
};

const FormTipsAndTrik = () => {
  const { id } = useParams<{ id: string }>();
  const {
    handleChange,
    formData,
    errors,
    validateData,
    getDataToSubmit,
    setFormData,
  } = useForm<TipsAndTrickParams>(emptyFormData);
  const [imageURL, setImageURL] = useState<string>("");

  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoader();
  const { handleError } = useError();

  const { open: uploadImage } = useDropzone({
    accept: "image/jpeg, image/png",
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    onDrop: (files) =>
      setFormData({
        ...formData,
        image: { ...formData.image, value: files[0] },
      }),
  });

  const handleFetches = async () => {
    try {
      setLoading(true);
      const { data } = await getTipsAndTrickById(Number(id));
      if (data.data) {
        setFormData({
          ...formData,
          title: { ...formData.title, value: data.data.title },
          content: { ...formData.content, value: data.data.content },
        });
      }
      setImageURL(data.data?.image!);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!errors.title && !errors.content) {
      try {
        setLoading(true);
        const dataToSubmit = getDataToSubmit();
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("title", dataToSubmit.title);
        formDataToSubmit.append("content", dataToSubmit.content);
        if (dataToSubmit.image) {
          formDataToSubmit.append("image", dataToSubmit.image);
        }
        await editTipsAndTrick(+id!, formDataToSubmit);
        snackbar.success("Data berhasil diperbarui");
        navigate("/admin/tips-dan-trik");
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (validateData()) {
      try {
        setLoading(true);
        const dataToSubmit = getDataToSubmit();
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("title", dataToSubmit.title);
        formDataToSubmit.append("content", dataToSubmit.content);
        formDataToSubmit.append("image", dataToSubmit.image);
        await createTipsAndTrick(formDataToSubmit);
        snackbar.success("Data berhasil ditambahkan");
        navigate("/admin/tips-dan-trik");
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
        {id ? "Edit" : "Tambah"} Tips dan Trik
      </h1>
      <form
        onSubmit={id ? handleEdit : handleSubmit}
        className="bg-white p-5 rounded-md"
      >
        <div className="flex gap-x-6 w-full mb-4">
          <div className="flex-none w-24">Judul</div>
          <div className="flex-auto max-w-xl">
            <Input
              name="title"
              value={formData.title.value}
              onChange={handleChange}
              isError={!!errors.title}
              helperText={errors.title}
            />
          </div>
        </div>
        <div className="flex gap-x-6 w-full mb-4">
          <div className="flex-none w-24">Keterangan</div>
          <div className="flex-auto max-w-xl">
            <TextArea
              name="content"
              value={formData.content.value}
              onChange={handleChange}
              isError={!!errors.content}
              helperText={errors.content}
            />
          </div>
        </div>
        <div className="flex gap-x-6 w-full mb-6">
          <div className="flex-none w-24">Gambar</div>
          <div className="flex-auto max-w-xl">
            <div className="w-60 h-60 mb-4">
              {(getDataToSubmit().image && (
                <img
                  src={URL.createObjectURL(getDataToSubmit().image)}
                  alt="contoh"
                  className="w-full h-full object-cover object-center"
                />
              )) ||
                (imageURL && <img src={getImageURL(imageURL)} alt="contoh" />)}
            </div>
            <Button shape="pill" type="button" onClick={uploadImage}>
              Pilih File
            </Button>
            {errors.image && !imageURL && (
              <p className="text-red-500 text-xs">{errors.image}</p>
            )}
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

export default FormTipsAndTrik;
