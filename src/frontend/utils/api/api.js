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

  getSingleTvShowData: async function (id) {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const endpoints = [
      `${pathname}/tv/${id}?language=en-US`,
      `${pathname}/tv/${id}/videos?language=en-US`,
      `${pathname}/tv/${id}/credits?language=en-US`,
      `${pathname}/tv/${id}/recommendations?language=en-US&page=1`,
      `${pathname}/tv/${id}/reviews?language=en-US&page=1`,
      `${pathname}/tv/${id}/account_states`,
      `${pathname}/tv/${id}/images`,
      `${pathname}/tv/${id}/keywords`,
      `${pathname}/tv/latest`,
      `${pathname}/tv/${id}/similar?language=en-US&page=1`,
      `${pathname}/tv/${id}/watch/providers`,
    ];

    const [
      details,
      videos,
      credits,
      recommendations,
      reviews,
      account_states,
      images,
      keywords,
      latest,
      similar,
      providers,
    ] = await Promise.all(endpoints.map((url) => axios.get(url, options)));

    try {
      const combinedResponse = {
        ...details.data,
        videos: videos.data,
        credits: credits.data,
        recommendations: recommendations.data.results,
        reviews: reviews.data,
        account_states: account_states.data,
        images: images.data,
        keywords: keywords.data,
        latest: latest.data,
        similar: similar.data,
        providers: providers.data,
      };

      return combinedResponse;
    } catch (error) {}
  },

  getSearchMovieByParam: async function (param) {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const endpoints = [
      `${pathname}/search/tv?query=${param.id}}&include_adult=false&language=${param.language}&page=${param.page}`,
      `${pathname}/search/movie?query=${param.id}&include_adult=false&language=${param.language}&page=${param.page}`,
    ];

    try {
      const [tvshows, movies] = await Promise.all(
        endpoints.map((url) => axios.get(url, options))
      );

      const MoviesData = movies.data;
      const TvShows = tvshows.data;
      const combinedData = {
        page: MoviesData.page, // or choose a logic to combine pages
        results: [...MoviesData.results, ...TvShows.results],
        total_pages: Math.max(MoviesData.total_pages, TvShows.total_pages), // or another logic if needed
        total_results: MoviesData.total_results + TvShows.total_results,
      };

      return combinedData;
    } catch (error) {
      console.log(error);
    }
  },

  getAllTrendingMovies: async function (params) {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${params}&sort_by=popularity.desc`,
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
  getAllTvShows: async function (params) {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${params}&sort_by=popularity.desc`,
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
  getPeopleList: async function (params) {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/person/popular?language=en-US&page=${params.page}`,
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
  getPersonAllData: async function (data) {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const endpoints = [
      `${pathname}/person/${data.id}?language=en-US`,
      `${pathname}/person/${data.id}/combined_credits?language=en-US`,
    ];

    try {
      const [details, credits] = await Promise.all(
        endpoints.map((url) => axios.get(url, options))
      );

      const DetailsData = details.data;
      const CreditsData = credits.data;

      const combinedData = {
        ...data,
        other_details: DetailsData,
        credits: CreditsData,
      };
      return combinedData;
    } catch (error) {}
  },
};
