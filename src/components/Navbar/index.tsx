import {
  ChevronDownIcon,
  DocumentDuplicateIcon,
  NewspaperIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";
import HamburgerMenu from "react-hamburger-menu";
import { useSidebarContext } from "../../context/SidebarContext";

const Navbar = () => {
  const [isColored, setIsColored] = useState<boolean>(false);

  const { pathname } = useLocation();
  const { isOpened, toogleIsOpened } = useSidebarContext();

  useEffect(() => {
    if (pathname === "/") {
      const checkViewPort = () => {
        if (window.scrollY > 80) {
          setIsColored(true);
        } else {
          setIsColored(false);
        }
      };

      setIsColored(false);

      window.addEventListener("scroll", checkViewPort);

      return () => {
        window.removeEventListener("scroll", checkViewPort);
      };
    } else {
      setIsColored(true);
    }
  }, [pathname]);

  return (
    <nav
      className={classNames(
        "px-8 py-5 fixed left-0 right-0 w-full z-20 transition-colors duration-300",
        {
          "bg-transparent": !isColored,
          "bg-white shadow-md": isColored,
          hidden: pathname.includes("admin"),
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="px-6 py-3 bg-brown-200">
          <Link to="/">Logo</Link>
        </div>
        <div className="gap-x-5 text-brown-600 hidden lg:flex">
          <Link to="/" className="px-2">
            Beranda
          </Link>
          <Link to="/" className="px-2">
            Konsultasi
          </Link>
          <div className="px-2 flex items-center gap-x-1 group relative">
            Pelajari Tanamanmu <ChevronDownIcon className="w-3 h-3" />
            <div
              className="hidden group-hover:block absolute top-[100%] -left-1/2 -right-1/2 mx-auto max-w-[18rem] bg-white px-4 py-2 rounded-md before:content-[''] 
            before:absolute before:border-[10px] before:border-b-white before:border-t-transparent before:border-l-transparent 
            before:border-r-transparent before:w-5 before:h-5 before:-top-4 before:left-0 before:right-0 before:mx-auto"
            >
              <Link to="/tips-dan-trik">
                <div className="flex gap-x-4 py-2">
                  <div className="flex-shrink-0 p-3 rounded-full bg-[#FFF4F0]">
                    <SearchIcon className="w-5 h-5 text-[#FF784C]" />
                  </div>
                  <div>
                    <h4 className="font-bold">Tips dan Trik</h4>
                    <p className="text-sm text-gray-400">Menanam Kentang</p>
                  </div>
                </div>
              </Link>
              <Link to="/berita">
                <div className="flex gap-x-4 py-2">
                  <div className="flex-shrink-0 p-3 rounded-full bg-[#FFF4F0]">
                    <NewspaperIcon className="w-5 h-5 text-[#FF784C]" />
                  </div>
                  <div>
                    <h4 className="font-bold">Berita Terkini</h4>
                    <p className="text-sm text-gray-400">Tentang Kentang</p>
                  </div>
                </div>
              </Link>
              <Link to="/deteksi-penyakit">
                <div className="flex gap-x-4 py-2">
                  <div className="flex-shrink-0 p-3 rounded-full bg-[#FFF4F0]">
                    <DocumentDuplicateIcon className="w-5 h-5 text-[#FF784C]" />
                  </div>
                  <div>
                    <h4 className="font-bold">Ketahui Penyakit</h4>
                    <p className="text-sm text-gray-400">Pada Kentang</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <Link to="/komunitas" className="px-2">
            Komunitas
          </Link>
        </div>
        <div className="gap-x-4 items-center text-brown-600 hidden lg:flex">
          <Link to="/login" className="px-6">
            Masuk
          </Link>
          <Button shape="pill" pathname="register">
            Daftar
          </Button>
        </div>
        <div className="block lg:hidden">
          <HamburgerMenu
            isOpen={isOpened}
            menuClicked={toogleIsOpened}
            width={18}
            height={15}
            strokeWidth={2}
            rotate={0}
            color="black"
            borderRadius={2}
            animationDuration={0.5}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
