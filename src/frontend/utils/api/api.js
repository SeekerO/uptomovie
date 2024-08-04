import axios from "axios";
const pathname = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMBD_API_KEY;
export const apiTMDB = {
  getNowPlayingList: async function () {
    const options = {
      method: "GET",
      url: `${pathname}/movie/now_playing?language=en-US&page=1`,
      params: { language: "en-US", page: "1" },
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
  getPopularList: async function () {
    const options = {
      method: "GET",
      url: `${pathname}/movie/popular?language=en-US&page=1`,
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
  getTopRatedList: async function () {
    const options = {
      method: "GET",
      url: `${pathname}/movie/top_rated?language=en-US&page=1`,
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
  getUpcomingList: async function () {
    const options = {
      method: "GET",
      url: `${pathname}/movie/upcoming?language=en-US&page=1`,
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

  getSingleMovieData: async function (id) {
    const optionsDetails = {
      method: "GET",
      url: `${pathname}/movie/${id}?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const optionsVideos = {
      method: "GET",
      url: `${pathname}/movie/${id}/videos?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const optionsCredits = {
      method: "GET",
      url: `${pathname}/movie/${id}/credits?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const optionsReviews = {
      method: "GET",
      url: `${pathname}/movie/${id}/reviews?language=en-US&page=1`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const optionsRecommendation = {
      method: "GET",
      url: `${pathname}/movie/${id}/recommendations?language=en-US&page=1`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await axios.request(optionsDetails);
      const videos = await axios.request(optionsVideos);
      const credits = await axios.request(optionsCredits);
      const recom = await axios.request(optionsRecommendation);
      const reviews = await axios.request(optionsReviews);

      const combinedResponse = {
        ...response.data,
        videos: videos.data,
        credits: credits.data,
        recommendations: recom.data.results,
      };

      return combinedResponse;
    } catch (error) {
      console.log(error);
    }
  },
};
