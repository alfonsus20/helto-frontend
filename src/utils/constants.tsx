import { DuplicateIcon } from "@heroicons/react/outline";
import {
  DocumentIcon,
  GlobeIcon,
  HandIcon,
  SearchIcon,
  StarIcon,
  ThumbUpIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";

type Program = {
  icon: React.ReactNode;
  iconBgColor: "pink" | "yellow" | "brown";
  title: string;
  content: string;
};

export const PROGRAMS: Program[] = [
  {
    icon: <HandIcon className="w-8 h-8 text-white" />,
    iconBgColor: "pink",
    title: "Konsultasi",
    content:
      "Konsultasikan tanaman kentang Anda dengan orang yang ahli dibidangnya untuk menjawab pertanyaan Anda.",
  },
  {
    icon: <UserGroupIcon className="w-8 h-8 text-white" />,
    iconBgColor: "yellow",
    title: "Komunitas",
    content:
      "Gabung dalam komunitas tanaman kentang untuk mendapatkan dan saling bertukar informasi. ",
  },
  {
    icon: <SearchIcon className="w-8 h-8 text-white" />,
    iconBgColor: "brown",
    title: "Tips dan Trik",
    content:
      "Dapatkan Tips dan Trik untuk menjaga dan merawat tanaman kentang Anda agar mendapat hasil yang terbaik.",
  },
  {
    icon: <DocumentIcon className="w-8 h-8 text-white" />,
    iconBgColor: "pink",
    title: "Berita Terkini",
    content:
      "Dapatkan berita terkini seputar kentang untuk membantu Anda mengoptimalkan produksi kentang Anda",
  },
  {
    icon: <DuplicateIcon className="w-8 h-8 text-white" />,
    iconBgColor: "yellow",
    title: "Ketahui Penyakit",
    content:
      "Ketahui penyakit pada tanaman kentang Anda, serta cara menyembuhkan dan membasmi penyakit yang ada.",
  },
];

export const IMAGE_URL = "http://helto-be-feminovialina.vercel.app/public";

export const DAYS_OF_THE_WEEK = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

export const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "November",
  "Desember",
];
