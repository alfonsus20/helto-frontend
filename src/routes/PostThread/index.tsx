import Button from "../../components/Button";
import CardCollapse from "../../components/CardCollapse";
import Input from "../../components/Input";
import Thread from "./components/Thread";
import { HandIcon, KeyIcon } from "@heroicons/react/outline";

import { useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const PostThread = () => {
  const { pathname } = useLocation();

  const { userInfo } = useUserContext();

  return (
    <div className="py-28 px-8 flex gap-x-6 max-w-screen-2xl mx-auto w-full">
      <div className="flex-none w-80 hidden xl:flex flex-col">
        <h1 className="text-2xl font-semibold text-center pb-2 border-b-[1px] border-black mb-4">
          Halaman {pathname === "/komunitas" ? "Komunitas" : "Konsultasi"}
        </h1>
        <div className="flex gap-x-2 items-center mb-4">
          <div className="flex-shrink-0">
            <img
              src="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/shawn_mendes-rev1.jpg"
              alt="user"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <Input
            appearance="tertiary"
            className="flex-1"
            placeholder={`Apa yang Anda pikirkan, ${
              userInfo.name?.split(" ")[0] || "Loading..."
            }?`}
            fontSize="xs"
          />
        </div>
        <div className="shadow-md p-4 mb-4">
          <div className="flex gap-x-2">
            <div className="flex-shrink-0 pt-1">
              <KeyIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2">Claim Key untuk bisa berkonsultasi.</p>
              <div className="flex justify-end">
                <Button shape="pill">Claim</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-md p-4 mb-4">
          <div className="flex gap-x-2">
            <div className="flex-shrink-0 pt-1">
              <HandIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2">Konsultasikan Tanaman Anda!</p>
              <p className="text-sm">
                Konsultasikan tanaman kentang Anda dengan orang yang ahli
                dibidangnya dan dapatkan hasil kentang yang berkualitas.
              </p>
              <div className="flex justify-end">
                <Button shape="pill">Gabung</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-auto">
          <Button
            shape="rounded"
            pathname={pathname === "/konsultasi" ? "komunitas" : "konsultasi"}
          >
            Halaman {pathname === "/konsultasi" ? "Komunitas" : "Konsultasi"}
          </Button>
        </div>
      </div>
      <div className="flex-1 xl:shadow-lg ">
        <h1 className="text-2xl font-semibold text-center pb-2 border-b-[1px] border-black mb-4 xl:hidden">
          Halaman Komunitas
        </h1>
        <div className="flex gap-x-2 items-center my-2 xl:hidden max-w-3xl mx-auto">
          <div className="flex-shrink-0">
            <img
              src="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/shawn_mendes-rev1.jpg"
              alt="user"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <Input
            appearance="primary"
            className="flex-1"
            placeholder="Apa yang Anda pikirkan, Alfons?"
            fontSize="xs"
          />
        </div>
        <div className="xl:hidden max-w-3xl mx-auto">
          <div className="shadow-md p-4 mb-4">
            <div className="flex gap-x-2">
              <div className="flex-shrink-0 pt-1">
                <KeyIcon className="w-5 h-5" />
              </div>
              <div className="flex-auto">
                <p className="mb-2">Claim Key untuk bisa berkonsultasi.</p>
                <div className="flex justify-end">
                  <Button shape="pill">Claim</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-md p-4 mb-4">
            <div className="flex gap-x-2">
              <div className="flex-shrink-0 pt-1">
                <HandIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="mb-2">Konsultasikan Tanaman Anda!</p>
                <p className="text-sm mb-2">
                  Konsultasikan tanaman kentang Anda dengan orang yang ahli
                  dibidangnya dan dapatkan hasil kentang yang berkualitas.
                </p>
                <div className="flex justify-end">
                  <Button shape="pill">Gabung</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Thread />
          <Thread />
          <Thread />
        </div>
      </div>
      <div className="flex-none w-80 hidden xl:block">
        <h3 className="font-lg font-bold mb-2">
          Pilih Informasi berdasarkan Wilayah
        </h3>
        <CardCollapse />
      </div>
    </div>
  );
};

export default PostThread;
