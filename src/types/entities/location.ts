export type Province = { id: number; nama: string };

export type Provinces = {
  provinsi: Province[];
};

export type City = { id: number; id_provinsi: string; nama: string };

export type Cities = {
  kota_kabupaten: City[];
};
