import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../Input";
import qs from "query-string";
import useEffectOnce from "../../hooks/useEffectOnce";
import { SearchIcon } from "@heroicons/react/outline";
import Button from "../Button";
import { AxiosError, AxiosPromise } from "axios";
import useSnackbar from "../../hooks/useSnackbar";
import { useModalContext } from "../../context/ModalContext";
type TableData<T extends Object> = {
  [key in keyof T]: {
    type: "text" | "image" | "date";
    title?: string;
    minW?: number;
  };
};

type TableProps<T> = {
  body: TableData<T>;
  editURL: string;
  deleteFunc: (id: number) => AxiosPromise;
  data: (T & {
    id: number;
  })[];
};

const Table = <T extends Object>({
  body,
  editURL,
  deleteFunc,
  data,
}: TableProps<T>) => {
  const [keyword, setKeyword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const snackbar = useSnackbar();
  const { openModal, closeModal } = useModalContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`${pathname}?${qs.stringify({ keyword })}`);
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await deleteFunc(id);
    } catch (error) {
      snackbar.error((error as AxiosError).response?.data.message);
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const showDeleteConfirmation = (id: number) => {
    openModal(
      <div className="mt-8">
        <p className="text-lg mb-4">
          Apakah anda yakin ingin menghapus artikel ini?
        </p>
        <div className="flex gap-x-2 justify-center">
          <Button
            shape="rounded"
            onClick={() => handleDelete(id)}
            disabled={loading}
          >
            Hapus
          </Button>
          <Button
            shape="rounded"
            appearance="default"
            onClick={closeModal}
            disabled={loading}
          >
            Batal
          </Button>
        </div>
      </div>
    );
  };

  useEffectOnce(() => {
    const keywordFromURL = qs.parse(search)["keyword"]?.toString();
    if (keywordFromURL) {
      setKeyword(keywordFromURL);
    }
  });

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Cari Tips dan Trik"
            className="max-w-xs"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            icon={<SearchIcon className="w-5 h-5" />}
          />
        </form>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-[#F3F6F9]">
            <tr className="font-bold">
              <td className="px-3 py-3">No.</td>
              {Object.keys(body).map((keyBody, idx) => {
                const { title, minW } = body[keyBody as keyof T];
                if (title) {
                  return (
                    <td
                      className="px-3 py-3"
                      key={idx}
                      style={{ minWidth: minW }}
                    >
                      {title}
                    </td>
                  );
                }
              })}
              <td className="px-3 py-3">Aksi</td>
            </tr>
          </thead>
          <tbody>
            {data.map((entryData, index) => (
              <tr key={entryData.id}>
                <td className="px-3 py-2">{index + 1}</td>
                {Object.keys(body).map((key) => {
                  const { title, minW } = body[key as keyof T];
                  if (title) {
                    return (
                      <td className="px-3 py-2" style={{ minWidth: minW }}>
                        {entryData[key as keyof T]}
                      </td>
                    );
                  }
                })}
                <td className="flex gap-x-2">
                  <Button
                    appearance="edit"
                    shape="rounded"
                    onClick={() => navigate(`${pathname}/${entryData.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    appearance="delete"
                    shape="rounded"
                    onClick={() => showDeleteConfirmation(entryData.id)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
