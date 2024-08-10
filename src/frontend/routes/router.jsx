import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Landingpage = lazy(() =>
  import("../layout/main/LandingPage/Landingpage")
);

const Movies = lazy(() => import("../layout/main/movies/Movies"));
const TvShows = lazy(() => import("../layout/main/tvshows/TvShows"));
const SearchitemPage = lazy(() =>
  import("../layout/main/searchedItemPage/SearchitemPage")
);
const LoadingLanding = lazy(() => import("../utils/components/loading/LoadingLanding"));
const PeoplePage = lazy(() => import("../layout/main/peoplePage/PeoplePage"));
const router = () => {
  return (
    <Suspense fallback={<LoadingLanding />}>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/movies/:page" element={<Movies />} />
        <Route
          path="/searchedItem/:id/:page/:language"
          element={<SearchitemPage />}
        />
        <Route path="/tvshows/:page" element={<TvShows />} />
        <Route path="/people/:page" element={<PeoplePage />} />
      </Routes>
    </Suspense>
  );
};

export default router;
