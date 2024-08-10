import React from "react";
import PeopleConfigProfile from "../../config/PeopleConfigProfile";

const DisplayPeople = ({ meta_data }) => {
  return (
    <div className="grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(30dvh,1fr))] grid-cols-2 w-full mx-auto px-0.5 gap-y-2 gap-x-4 mt-5">
      {meta_data?.results.map((people) => (
        <PeopleConfigProfile key={people.id} people={people} />
      ))}
    </div>
  );
};

export default DisplayPeople;
