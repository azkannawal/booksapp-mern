import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axiosInstance
      .delete(`/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <h3 className="text-xl">Are You Sure You want to delete this book?</h3>

        <button
          className="p-2 bg-red-600 text-white m-4 w-full rounded-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
