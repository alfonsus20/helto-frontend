import React, { useState } from "react";
import Button from "../../components/Button";
import { useDropzone } from "react-dropzone";
import UploadImage from "../../images/upload.png";

const DiseaseDetection = () => {
  const [image, setImage] = useState<File>();
  const [result, setResult] = useState<string>("");

  const { getRootProps, getInputProps, open, isDragActive, acceptedFiles } =
    useDropzone({
      accept: "image/jpeg, image/png",
      noClick: true,
      noKeyboard: true,
      maxFiles: 1,
      onDrop: (files) => setImage(files[0]),
    });

  return (
    <div className="pt-32 pb-20 flex mx-auto max-w-6xl w-full gap-8">
      <div className="w-1/2">
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
              <Button shape="pill" onClick={open}>
                Pilih File
              </Button>
            </>
          )}
        </div>
        <div className="flex flew-row gap-4 justify-center">
          {result && <Button appearance="secondary">Unggah Ulang</Button>}
          <Button>Cari</Button>
        </div>
      </div>
      <div className="w-1/2 p-4 shadow-lg rounded-lg">
        <h3 className="font-brown-500 font-semibold text-lg">Hasil :</h3>
      </div>
    </div>
  );
};

export default DiseaseDetection;
