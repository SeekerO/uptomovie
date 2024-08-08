import axios from "axios";
const pathname = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMBD_API_KEY;
export const apiTMDB = {
  getAllMovieLists: async function () {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const endpoints = [
      `${pathname}/movie/now_playing?language=en-US&page=1`,
      `${pathname}/movie/popular?language=en-US&page=1`,
      `${pathname}/movie/top_rated?language=en-US&page=1`,
      `${pathname}/movie/upcoming?language=en-US&page=1`,
    ];

    try {
      const [
        nowPlayingResponse,
        popularResponse,
        topRatedResponse,
        upcomingResponse,
      ] = await Promise.all(endpoints.map((url) => axios.get(url, options)));

      const nowPlayingList = nowPlayingResponse.data;
      const popularList = popularResponse.data;
      const topRatedList = topRatedResponse.data;
      const upcomingList = upcomingResponse.data;

      return {
        nowPlayingList,
        popularList,
        topRatedList,
        upcomingList,
      };
    } catch (error) {
      console.log(error);
    }
  },

  getSingleMovieData: async function (id) {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const endpoints = [
      `${pathname}/movie/${id}?language=en-US`,
      `${pathname}/movie/${id}/videos?language=en-US`,
      `${pathname}/movie/${id}/credits?language=en-US`,
      `${pathname}/movie/${id}/recommendations?language=en-US&page=1`,
      `${pathname}/movie/${id}/reviews?language=en-US&page=1`,
    ];

    const [details, videos, credits, recommendations, reviews] =
      await Promise.all(endpoints.map((url) => axios.get(url, options)));

    try {
      const combinedResponse = {
        ...details.data,
        videos: videos.data,
        credits: credits.data,
        recommendations: recommendations.data.results,
        reviews: reviews.data,
      };

      return combinedResponse;
    } catch (error) {}
  },

  getSearchMovieByParam: async function (param) {
    const options = {
      method: "GET",
      url: `${pathname}/search/movie?query=${param.searchParam}&include_adult=false&language=${param.languageParam}&page=${param.pageParam}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
