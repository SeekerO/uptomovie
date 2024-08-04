import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingLanding from "../utils/components/LoadingLanding";
const Landingpage = lazy(() =>
  import("../layout/main/home/LandingPage/Landingpage")
);

const Movies = lazy(() => import("../layout/main/movies/Movies"));

const router = () => {
  return (
    <Suspense fallback={<LoadingLanding />}>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </Suspense>
  );
};

export default router;
