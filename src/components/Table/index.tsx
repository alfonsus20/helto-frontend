import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../Input";
import qs from "query-string";
import useEffectOnce from "../../hooks/useEffectOnce";
import { SearchIcon } from "@heroicons/react/outline";
import Button from "../Button";
import { AxiosError, AxiosPromise } from "axios";
import useSnackbar from "../../hooks/useSnackbar";
import dayjs from "dayjs";
import { getImageURL } from "../../utils/helper";
import classNames from "classnames";
import Modal from "../Modal";
import Search from "../Search";

type TableData<T extends Object> = {
  [key in keyof T]: {
    type: "text" | "image" | "date";
    title?: string;
    wrapped?: boolean;
  };
};

type TableProps<T> = {
  body: TableData<T>;
  deleteFunc: (id: number) => AxiosPromise;
  data: (T & {
    id: number;
  })[];
  searchPlaceholder: string;
  fetchFunc: () => void;
};

const Table = <T extends Object>({
  body,
  deleteFunc,
  fetchFunc,
  data,
  searchPlaceholder,
}: TableProps<T>) => {
  const [keyword, setKeyword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const snackbar = useSnackbar();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`${pathname}?${qs.stringify({ keyword })}`);
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await deleteFunc(id);
      snackbar.success("Data berhasil dihapus");
      fetchFunc();
    } catch (error) {
      snackbar.error((error as AxiosError).response?.data.message);
    } finally {
      setLoading(false);
      setIsModalShown(false);
    }
  };

  const showModal = (id: number) => {
    setSelectedId(id);
    setIsModalShown(true);
  };

  const hideModal = () => {
    setSelectedId(null);
    setIsModalShown(false);
  };

  useEffectOnce(() => {
    const keywordFromURL = qs.parse(search)["keyword"]?.toString();
    if (keywordFromURL) {
      setKeyword(keywordFromURL);
    }
  });

  return (
    <div className="w-full">
      <Modal isOpen={isModalShown} onClose={hideModal}>
        <div className="mt-8">
          <p className="text-lg mb-4">
            Apakah anda yakin ingin menghapus artikel ini?
          </p>
          <div className="flex gap-x-2 justify-center">
            <Button
              shape="rounded"
              onClick={() => handleDelete(selectedId!)}
              disabled={loading}
            >
              Hapus
            </Button>
            <Button
              shape="rounded"
              appearance="default"
              onClick={hideModal}
              disabled={loading}
            >
              Batal
            </Button>
          </div>
        </div>
      </Modal>
      <div className="flex justify-between my-2 mb-6">
        <Search
          placeholder={searchPlaceholder}
          fetchFunc={fetchFunc}
          className="max-w-xs"
        />
        <Button shape="rounded" onClick={() => navigate(`${pathname}/tambah`)}>
          Tambah
        </Button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F3F6F9]">
            <tr className="font-bold">
              <td className="px-3 py-4">No.</td>
              {Object.keys(body)
                .filter((keyBody) => body[keyBody as keyof T].title)
                .map((keyBody, idx) => (
                  <td className="px-3 py-4" key={idx}>
                    {body[keyBody as keyof T].title}
                  </td>
                ))}
              <td className="px-3 py-4">Aksi</td>
            </tr>
          </thead>
          <tbody>
            {data.map((entryData, index) => (
              <tr key={entryData.id}>
                <td className="px-3 py-4">{index + 1}</td>
                {Object.keys(body)
                  .filter((keyBody) => body[keyBody as keyof T].title)
                  .map((key, idx) => {
                    const { wrapped, type } = body[key as keyof T];
                    return (
                      <td
                        key={idx}
                        className={classNames(
                          "px-3",
                          {
                            "whitespace-normal min-w-[400px] line-clamp-4 my-4":
                              wrapped,
                          },
                          { "whitespace-nowrap py-4": !wrapped },
                          { "min-w-[12rem]": type === "image" }
                        )}
                      >
                        {type === "date" ? (
                          dayjs(`${entryData[key as keyof T]}`)
                            .format("DD MMM YYYY")
                            .toString()
                        ) : type === "image" ? (
                          <img
                            src={getImageURL(`${entryData[key as keyof T]}`)}
                            className="w-40 h-40 object-cover object-center"
                            alt="table-img"
                          />
                        ) : (
                          entryData[key as keyof T]
                        )}
                      </td>
                    );
                  })}
                <td className="flex gap-x-2">
                  <Button
                    appearance="edit"
                    shape="rounded"
                    onClick={() => navigate(`${pathname}/${entryData.id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    appearance="delete"
                    shape="rounded"
                    onClick={() => showModal(entryData.id)}
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
