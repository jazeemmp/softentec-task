import { useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

interface Data {
  name: string;
  language: string;
  id: string;
  bio: string;
  version: number;
}
const PaginatedData = () => {
  const [data, setData] = useState<Data[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/data.json");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  const totalPages = Math.ceil(data.length / 5);
  const startIndex = (currentPage - 1) * 5;
  const paginatedData = data.slice(startIndex, startIndex + 5);
  return (
      <div className="p-4 max-w-lg mx-auto ">
        <h2 className="text-3xl font-bold mb-4 text-center ">Paginated List</h2>

        {loading ? (
          <p>Loading data...</p>
        ) : (
          <>
            <ul>
              {paginatedData.map((item) => (
                <li
                  key={item.id}
                  className="p-4  shadow-md mb-2 rounded bg-gray-00"
                >
                  <div className="font-semibold text-center mb-2 text-xl">
                    {item.name}
                  </div>
                  <div className="font-medium">
                    Language :{" "}
                    <span className="font-normal"> {item.language}</span>
                  </div>
                  <div className="font-medium">
                    Bio : <span className="font-normal">{item.bio}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                <GrPrevious />
              </button>

              <span className="px-4 py-2">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="bg-blue-500 text-white px-4 py-2 flex items-center justify-center rounded disabled:opacity-50"
              >
                <GrNext />
              </button>
            </div>
          </>
        )}
      </div>
  );
};

export default PaginatedData;
