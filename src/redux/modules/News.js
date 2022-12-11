import { put } from "redux-saga/effects";
import { getCryptoAPIData } from "../../services/CryptoAPI";

export const SEND_NEWS_API_REQUEST = "SEND_NEWS_API_REQUEST";
export const RECEIVE_NEWS_API_RESPONSE = "RECEIVE_NEWS_API_RESPONSE";
export const RECEIVE_NEWS_API_ERROR = "RECEIVE_NEWS_API_ERROR";

const init = {
  loading: false,
  data: [],
  error: null,
};

export const newsApiReducer = (state = init, action) => {
  switch (action.type) {
    case SEND_NEWS_API_REQUEST:
      return { loading: true, data: [], error: null };

    case RECEIVE_NEWS_API_RESPONSE:
      return { loading: false, data: action.payload, error: null };

    case RECEIVE_NEWS_API_ERROR:
      return { loading: false, data: [], error: action.payload };

    default:
      return state;
  }
};

export const sendNewsAPIRequest = (query) => {
  return {
    type: SEND_NEWS_API_REQUEST,
    payload: query,
  };
};

export const receiveNewsAPIResponse = (data) => {
  return {
    type: RECEIVE_NEWS_API_RESPONSE,
    payload: data,
  };
};

export const receiveNewsAPIError = (error) => {
  return {
    type: RECEIVE_NEWS_API_ERROR,
    payload: error,
  };
};

export function* watcherNewsApi(action) {
  try {
    const header = {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "1f82075fdemsh3f0e18ead7e5ea9p165955jsna8c49db94c7c",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    };

    const res = yield getCryptoAPIData(
      "get",
      `https://bing-news-search1.p.rapidapi.com/news/search?q=${action.payload}&safeSearch=Off&textFormat=Raw&freshness=Day&count=12`,
      header
    );

    yield put(receiveNewsAPIResponse(res));
  } catch (error) {
    yield put(receiveNewsAPIError(error.message));
  }
}
