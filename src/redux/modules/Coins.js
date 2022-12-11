import { put } from "redux-saga/effects";
import { getCryptoAPIData } from "../../services/CryptoAPI";

export const SEND_COINS_REQUEST = "SEND_COINS_REQUEST";
export const RECEIVE_COINS_RESPONSE = "RECEIVE_COINS_RESPONSE";
export const RECEIVE_COINS_ERROR = "RECEIVE_COINS_ERROR";

const init = {
  loading: false,
  data: [],
  error: null,
};

export const coinsReducer = (state = init, action) => {
  switch (action.type) {
    case SEND_COINS_REQUEST:
      return { loading: true, data: [], error: null };

    case RECEIVE_COINS_RESPONSE:
      return { loading: false, data: action.payload, error: null };

    case RECEIVE_COINS_ERROR:
      return { loading: false, data: [], error: action.payload };

    default:
      return state;
  }
};

export const sendCoinsRequest = (query) => {
  return {
    type: SEND_COINS_REQUEST,
    payload: query,
  };
};

export const receiveCoinsResponse = (data) => {
  return {
    type: RECEIVE_COINS_RESPONSE,
    payload: data,
  };
};

export const receiveCoinsError = (error) => {
  return {
    type: RECEIVE_COINS_ERROR,
    payload: error,
  };
};

export function* watcherCoins() {
  try {
    const header = {
      "X-RapidAPI-Key": "1f82075fdemsh3f0e18ead7e5ea9p165955jsna8c49db94c7c",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    };

    const res = yield getCryptoAPIData(
      "get",
      "https://coinranking1.p.rapidapi.com/coins",
      header
    );

    yield put(receiveCoinsResponse(res));
  } catch (error) {
    yield put(receiveCoinsError(error.message));
  }
}
