import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./output.css";
import HomePage from "./pages/HomePage";
import MovieDetail from "./pages/MovieDetail";
import SeriesPage from "./pages/SeriesPage";
import MoviePage from "./pages/MoviePage";
import TvShowPage from "./pages/TvShowPage";
import MovieWithCountry from "./pages/MovieWithCountry";
import MovieWithGenre from "./pages/MovieWithGerne";
import MovieWithYear from "./pages/MovieWithYear";
import { BrowserRouter, Routes, Route } from "react-router";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:slug" element={<MovieDetail />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/tv-show" element={<TvShowPage />} />
        <Route path="/country" element={<MovieWithCountry />} />
        <Route path="/genre" element={<MovieWithGenre />} />
        <Route path="/year" element={<MovieWithYear />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
