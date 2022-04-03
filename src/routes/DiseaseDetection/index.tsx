import { useState } from "react";
import { useDropzone } from "react-dropzone";

import Button from "../../components/Button";

import UploadImage from "../../images/upload.png";

import useSnackbar from "../../hooks/useSnackbar";
import useError from "../../hooks/useError";

import { predictImage } from "../../models/predictImage";

import { Prediction } from "../../types/entities/prediction";

const DiseaseDetection = () => {
  const [image, setImage] = useState<File>();
  const [result, setResult] = useState<Prediction>({} as Prediction);
  const [loading, setLoading] = useState<boolean>(false);

  const snackbar = useSnackbar();
  const {handleError} = useError();
  const { getRootProps, getInputProps, open, isDragActive, acceptedFiles } =
    useDropzone({
      accept: "image/jpeg, image/png",
      noClick: true,
      noKeyboard: true,
      maxFiles: 1,
      onDrop: (files) => setImage(files[0]),
    });

  const handleSearch = async () => {
    if (image) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", image);
        const { data } = await predictImage(formData);
        if (data.data) {
          setResult(data.data);
        }
      } catch (e) {
        handleError(e);
      } finally {
        setLoading(false);
      }
    } else {
      snackbar.error("Gambar belum diinput");
    }
  };

  return (
    <div className="px-8 pt-32 pb-20 flex flex-col md:flex-row mx-auto max-w-6xl w-full gap-8">
      <div className="md:w-1/2">
        <div
          {...getRootProps({ className: "dropzone" })}
          className="rounded-lg shadow-lg flex flex-col items-center p-8 mb-6 justify-center"
          style={{ minHeight: 250 }}
        >
          <input {...getInputProps()} />
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              className="w-72 h-72 object-cover"
              alt={image.name}
            />
          ) : (
            <>
              <div>
                <img src={UploadImage} alt="upload" />
              </div>
              <p className="text-blue-marker font-medium mb-5">
                {acceptedFiles.length !== 0
                  ? acceptedFiles[0].name
                  : isDragActive
                  ? "Letakkan di sini"
                  : "Unggah gambar kamu disini"}
              </p>
              <Button shape="pill" onClick={open} disabled={loading}>
                Pilih File
              </Button>
            </>
          )}
        </div>
        <div className="flex flew-row gap-4 justify-center">
          {result.variant && (
            <Button appearance="secondary" onClick={open} disabled={loading}>
              Unggah Ulang
            </Button>
          )}
          <Button onClick={handleSearch} disabled={loading}>
            Cari
          </Button>
        </div>
      </div>
      <div className="md:w-1/2 p-4 shadow-lg rounded-lg min-h-[12rem]">
        <h3 className="font-brown-500 font-semibold text-lg">Hasil :</h3>
        <div>
          <h4>{result.variant}</h4>
          <h4>{result.description}</h4>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
