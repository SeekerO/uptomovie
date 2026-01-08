import axios from "axios";
const pathname = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMBD_API_KEY;

export const apiTMDB = {
  getDiscoveryByGenre: async function (genreId, page = 1) {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`, // Ensure this is your LONG Read-Access Token, not the short API Key
      },
    };


    try {
      const [movieRes, tvRes] = await Promise.all([
        axios.get(`${pathname}/discover/movie?with_genres=${genreId}&language=en-US&page=${page}&sort_by=popularity.desc`, options),
        axios.get(`${pathname}/discover/tv?with_genres=${genreId}&language=en-US&page=${page}&sort_by=popularity.desc`, options)
      ]);

      const movies = movieRes.data.results.map((m) => ({ ...m, media_type: "movie" }));
      const tvShows = tvRes.data.results.map((t) => ({ ...t, media_type: "tv" }));

      return [...movies, ...tvShows].sort((a, b) => b.popularity - a.popularity);
    } catch (error) {
      // Detailed Error Log
      console.error("API Error Details:", error.response ? error.response.data : error.message);
      return [];
    }
  },

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

      return {
        nowPlayingList: nowPlayingResponse.data,
        popularList: popularResponse.data,
        topRatedList: topRatedResponse.data,
        upcomingList: upcomingResponse.data,
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

    try {
      const [details, videos, credits, recommendations, reviews] =
        await Promise.all(endpoints.map((url) => axios.get(url, options)));

      return {
        ...details.data,
        videos: videos.data,
        credits: credits.data,
        recommendations: recommendations.data.results,
        reviews: reviews.data,
      };
    } catch (error) {
      console.log(error)
    }
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

    try {
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

      return {
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
    } catch (error) {
      console.log(error)
    }
  },

  getSearchMovieByParam: async function (param) {
    const options = {
      method: "GET",
      url: `${pathname}/search/multi?query=${param.id}&include_adult=false&language=${param.language}&page=${param.page}`,
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
      url: `${pathname}/tv/popular?language=en-US&page=${params}`,
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

  getPersonAllData: async function (id) {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const endpoints = [
      `${pathname}/person/${id}?language=en-US`,
      `${pathname}/person/${id}/combined_credits?language=en-US`,
      `${pathname}/person/${id}/tagged_images?page=1`,
    ];

    try {
      const [details, credits, tagimages] = await Promise.all(
        endpoints.map((url) => axios.get(url, options))
      );

      return {
        ...details.data,
        credits: credits.data,
        taggedImages: tagimages.data,
      };
    } catch (error) {
      console.log(error)
    }
  },
};