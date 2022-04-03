import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";

import useEffectOnce from "../../../hooks/useEffectOnce";
import useForm from "../../../hooks/useForm";
import useSnackbar from "../../../hooks/useSnackbar";

import { FormTemplate } from "../../../types/form";
import { NewsParams } from "../../../types/entities/news";

import { createNews, editNews, getNewsById } from "../../../models/news";

import {  getImageURL } from "../../../utils/helper";
import { useLoader } from "../../../context/LoaderContext";
import useError from "../../../hooks/useError";

const emptyFormData: FormTemplate<NewsParams> = {
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

const FormNews = () => {
  const { id } = useParams<{ id: string }>();
  const {
    handleChange,
    formData,
    errors,
    validateData,
    getDataToSubmit,
    setFormData,
  } = useForm<NewsParams>(emptyFormData);
  const [imageURL, setImageURL] = useState<string>("");

  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const {setLoading, loading} = useLoader();
  const {handleError} = useError();

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
      const { data } = await getNewsById(+id!);
      if (data.data) {
        setFormData({
          ...formData,
          title: { ...formData.title, value: data.data.news.title },
          content: { ...formData.content, value: data.data.news.content },
        });
      }
      setImageURL(data.data?.news.image!);
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
        const dataToSubmit = getDataToSubmit();
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("title", dataToSubmit.title);
        formDataToSubmit.append("content", dataToSubmit.content);
        formDataToSubmit.append("image", dataToSubmit.image);
        await createNews(formDataToSubmit);
        snackbar.success("Data berhasil ditambahkan");
        navigate("/admin/berita");
      } catch (error) {
        handleError(error)
      } finally {
        setLoading(false);
      }
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
        await editNews(+id!, formDataToSubmit);
        snackbar.success("Data berhasil diperbarui");
        navigate("/admin/berita");
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
        {id ? "Edit" : "Tambah"} Berita Terkini
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

export default FormNews;
