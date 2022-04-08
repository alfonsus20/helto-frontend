import { useState } from "react";

import Table from "../../../components/Table";

import useError from "../../../hooks/useError";
import { useLocation } from "react-router-dom";
import { useLoader } from "../../../context/LoaderContext";

import { getFeedbackList } from "../../../models/feedback";
import { FeedbackData } from "../../../types/entities/feedback";

const AdminFeedback = () => {
  const [feedbackList, setFeedbackList] = useState<Array<FeedbackData>>([]);
  const [totalData, setTotalData] = useState<number>(0);

  const { setLoading } = useLoader();
  const { search } = useLocation();
  const { handleError } = useError();

  const fetchFeedbackList = async () => {
    try {
      setLoading(true);
      const { data } = await getFeedbackList(search);
      if (data.data) {
        setFeedbackList(data.data.feedback);
        setTotalData(data.data.totalData);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Daftar Feedback</h1>
      <div className="bg-white p-5">
        <Table
          fetchFunc={fetchFeedbackList}
          body={{
            id: { type: "text" },
            name: { type: "text", title: "Nama" },
            email: { type: "text", title: "Email" },
            feedback: { type: "text", title: "Feedback" },
            UpdatedAt: { type: "date", title: "Tanggal" },
            createdAt: { type: "date" },
          }}
          noActions={true}
          data={feedbackList}
          searchPlaceholder="Cari Feedback"
          totalData={totalData}
        />
      </div>
    </div>
  );
};
export default AdminFeedback;
