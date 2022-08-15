import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import "swiper/scss";
import Banner from "./components/banner/Banner";
import Main from "./components/layout/Main";
import { AuthProvider } from "./contexts/auth-context";
// import HomePage from "./pages/HomePage";
// import MovieDetailPage from "./pages/MovieDetailPage";
// import MoviePage from "./pages/MoviePage";
import NotFoundPage from "./pages/NotFoundPage";

// Dynamic import
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));

function App() {
  return (
    <AuthProvider>
      <Fragment>
        <Suspense fallback={<></>}>
          <Routes>
            <Route element={<Main></Main>}>
              <Route
                path="/"
                element={
                  <>
                    <Banner></Banner>
                    <HomePage></HomePage>
                  </>
                }
              ></Route>

              <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
              <Route
                path="/movies/:movieId"
                element={<MovieDetailPage></MovieDetailPage>}
              ></Route>
            </Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
        </Suspense>
      </Fragment>
    </AuthProvider>
  );
}

export default App;
