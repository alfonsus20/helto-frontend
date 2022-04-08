import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';

import Button from '../../components/Button';
import CardCollapse from '../../components/CardCollapse';
import Input from '../../components/Input';
import Thread from '../../components/Thread';
import { SkeletonThread } from '../../components/Skeleton';

import { useUserContext } from '../../context/UserContext';
import useError from '../../hooks/useError';
import useSnackbar from '../../hooks/useSnackbar';

import {
  getAllPrivateThreads,
  postNewPrivateThreadCommunity,
} from '../../models/thread';
import { getCities, getProvinces } from '../../models/location';

import { Thread as ThreadEntity } from '../../types/entities/thread';
import { City, Province } from '../../types/entities/location';

const skeletons = [...Array(6)].map((_, idx) => <SkeletonThread key={idx} />);

const Consultation = () => {
  const [threadList, setThreadList] = useState<Array<ThreadEntity>>([]);
  const [newThread, setNewThread] = useState<string>('');
  const [isPostingNewThread, setIsPostingNewThread] = useState<boolean>(false);
  const [isFetchingThread, setIsFetchingThread] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<Array<Province>>([]);
  const [cities, setCities] = useState<Array<City>>([]);

  const snackbar = useSnackbar();
  const { userInfo } = useUserContext();
  const { handleError } = useError();
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const { region, provinceId } = qs.parse(search);

  const fetchThreadList = async () => {
    try {
      setIsFetchingThread(true);
      const { data } = await getAllPrivateThreads(
        userInfo.thread?.key!,
        qs.stringify({
          offset: 0,
          limit: 20,
          region: qs.parse(search)['region'],
        })
      );
      if (data.data) {
        setThreadList(data.data.posts);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsFetchingThread(false);
    }
  };

  const getProvinceList = async () => {
    try {
      const { data } = await getProvinces();
      setProvinces(data.provinsi);
    } catch (err) {
      console.log(err);
    }
  };

  const getCityList = async () => {
    try {
      const selectedProvinceId = qs.parse(search)['provinceId']?.toString();
      const { data } = await getCities(selectedProvinceId || '');
      setCities(data.kota_kabupaten);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePostNewThread = async () => {
    try {
      setIsPostingNewThread(true);
      await postNewPrivateThreadCommunity(userInfo.thread?.key!, {
        content: newThread,
      });
      snackbar.success('Postingan berhasil diunggah');
      setNewThread('');
      fetchThreadList();
    } catch (error) {
      handleError(error);
    } finally {
      setIsPostingNewThread(false);
    }
  };

  useEffect(() => {
    if (Object.keys(userInfo).length > 1) {
      if (userInfo.joined) {
        fetchThreadList();
        getProvinceList();
        if (region) {
          getCityList();
        }
      } else {
        snackbar.error('Claim key terlebih dahulu');
        navigate('/komunitas');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  useEffect(() => {
    getCityList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceId]);

  useEffect(() => {
    if (userInfo.joined) {
      fetchThreadList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]);

  return (
    <div className="py-28 px-8 flex gap-x-6 max-w-screen-2xl mx-auto w-full">
      <div className="flex-none w-80 hidden xl:flex flex-col min-h-[600px]">
        <h1 className="text-2xl font-semibold text-center pb-2 border-b-[1px] border-black mb-4">
          Halaman Konsultasi
        </h1>
        <div className="flex gap-x-2 mb-4">
          <div className="flex-shrink-0">
            <img
              src="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/shawn_mendes-rev1.jpg"
              alt="user"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="flex-1 mt-2">
            <Input
              appearance="tertiary"
              className="flex-1"
              placeholder={
                userInfo.name
                  ? `Apa yang Anda pikirkan ${userInfo.name?.split(' ')[0]}?`
                  : 'Loading...'
              }
              fontSize="xs"
              value={newThread}
              onChange={(e) => setNewThread(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <Button
                shape="pill"
                disabled={isPostingNewThread || !newThread}
                onClick={handlePostNewThread}
              >
                Kirim
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-auto">
          <Button shape="rounded" pathname="komunitas">
            Halaman Komunitas
          </Button>
        </div>
      </div>
      <div className="flex-1 xl:shadow-lg max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-center pb-2 border-b-[1px] border-black mb-4 xl:hidden">
          Halaman Konsultasi
        </h1>
        <div className="flex gap-x-2 my-2 xl:hidden">
          <div className="flex-shrink-0">
            <img
              src="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/shawn_mendes-rev1.jpg"
              alt="user"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="flex-1">
            <Input
              appearance="primary"
              className="my-2"
              placeholder={
                userInfo.name
                  ? `Apa yang Anda pikirkan ${userInfo.name?.split(' ')[0]}?`
                  : 'Loading...'
              }
              fontSize="xs"
              value={newThread}
              onChange={(e) => setNewThread(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                shape="pill"
                disabled={isPostingNewThread || !newThread}
                onClick={handlePostNewThread}
              >
                Kirim
              </Button>
            </div>
          </div>
        </div>
        <div className="xl:hidden">
          <h3 className="font-lg font-bold">
            Pilih Informasi berdasarkan Wilayah
          </h3>
          <div className="flex">
            <div className="w-full">
              <CardCollapse
                title="Provinsi"
                onChange={(e) => {
                  navigate(
                    `${pathname}?${qs.stringify({
                      provinceId: e.target.value,
                    })}`
                  );
                }}
                choices={provinces.map((province) => ({
                  label: province.nama,
                  value: province.id.toString(),
                }))}
                name="provinsi"
                value={provinceId?.toString() || ''}
              />
            </div>
            <div className="w-full">
              <CardCollapse
                title="Kota"
                onChange={(e) => {
                  navigate(
                    `${pathname}?${qs.stringify({
                      ...qs.parse(search),
                      region: e.target.value,
                    })}`
                  );
                }}
                choices={cities.map((city) => ({
                  label: city.nama,
                  value: city.nama,
                }))}
                name="kota"
                value={region?.toString() || ''}
              />
            </div>
          </div>
        </div>
        <div className="py-4  min-h-[200px] md:min-h-full relative">
          {isFetchingThread ? (
            skeletons
          ) : threadList.length === 0 ? (
            <div className="flex justify-center items-center absolute left-0 right-0 bottom-0 top-0">
              Belum ada postingan
            </div>
          ) : (
            threadList.map((thread) => (
              <Thread
                id={thread.id}
                key={thread.id}
                userName={thread.author.username}
                content={thread.content}
                likeCount={thread.likesCount}
                commentCount={thread.replyCount}
                createdAt={thread.createdAt}
                liked={thread.likes.length === 1}
              />
            ))
          )}
        </div>
      </div>
      <div className="flex-none w-80 hidden xl:block">
        <h3 className="font-lg font-bold mb-2">
          Pilih Informasi berdasarkan Wilayah
        </h3>
        <CardCollapse
          title="Provinsi"
          onChange={(e) => {
            navigate(
              `${pathname}?${qs.stringify({ provinceId: e.target.value })}`
            );
          }}
          choices={provinces.map((province) => ({
            label: province.nama,
            value: province.id.toString(),
          }))}
          name="provinsi"
          value={provinceId?.toString() || ''}
        />
        <CardCollapse
          title="Kota"
          onChange={(e) => {
            navigate(
              `${pathname}?${qs.stringify({
                ...qs.parse(search),
                region: e.target.value,
              })}`
            );
          }}
          choices={cities.map((city) => ({
            label: city.nama,
            value: city.nama,
          }))}
          name="kota"
          value={region?.toString() || ''}
        />
      </div>
    </div>
  );
};

export default Consultation;
