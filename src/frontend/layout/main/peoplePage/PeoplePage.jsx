import { useState, useEffect } from "react";
import LoadingScreen from "../../../utils/components/loading/LoadingScreen";
import { apiTMDB } from "../../../utils/api/api";
import { useNavigate, useParams } from "react-router-dom";
import DisplayPeople from "../../../utils/components/display_component/DisplayPeople";
import Pagination from "../../../utils/components/Pagination";
const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const peopleParams = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await apiTMDB.getPeopleList(peopleParams);
      setPeople(response);
    };
    fetchPeople();
  }, [peopleParams]);

  const handlePageChange = ({ selected }) => {
    const pageNumber = selected + 1;
    nav("/people/" + pageNumber);
  };

  return (
    <div className="w-full h-full md:px-20 px-10 flex flex-col">
      {people.length !== 0 ? (
        <div className="mt-24 flex flex-col">
          <h1 className="text-[30px] font-bold md:px-0 px-5">Popular People</h1>
          <DisplayPeople meta_data={people} />

          <div className="mt-10 w-full justify-center flex mb-10">
            <Pagination
              activePageNumber={parseInt(people.page) - 1}
              total_items={people.total_results}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      ) : (
        <>
          <LoadingScreen />
        </>
      )}
    </div>
  );
};

export default PeoplePage;
