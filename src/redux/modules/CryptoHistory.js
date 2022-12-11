import { put } from "redux-saga/effects";
import { getCryptoAPIData } from "../../services/CryptoAPI";

export const SEND_CRYPTO_HISTORY_REQUEST = "SEND_CRYPTO_HISTORY_REQUEST";
export const RECEIVE_CRYPTO_HISTORY_RESPONSE =
  "RECEIVE_CRYPTO_HISTORY_RESPONSE";
export const RECEIVE_CRYPTO_HISTORY_ERROR = "RECEIVE_CRYPTO_HISTORY_ERROR";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const cryptoHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_CRYPTO_HISTORY_REQUEST:
      return { loading: true, data: [], error: null };

    case RECEIVE_CRYPTO_HISTORY_RESPONSE:
      return { loading: false, data: action.payload, error: null };

    case RECEIVE_CRYPTO_HISTORY_ERROR:
      return { loading: false, data: [], error: action.payload };

    default:
      return state;
  }
};

export const sendCryptoHistoryRequest = (query, time) => {
  return {
    type: SEND_CRYPTO_HISTORY_REQUEST,
    payload: query,
    time,
  };
};

export const receiveCryptoHistoryResponse = (data) => {
  return {
    type: RECEIVE_CRYPTO_HISTORY_RESPONSE,
    payload: data,
  };
};

export const receiveCryptoHistoryError = (error) => {
  return {
    type: RECEIVE_CRYPTO_HISTORY_ERROR,
    payload: error,
  };
};

export function* watcherCryptoHistory(action) {
  try {
    const header = {
      "X-RapidAPI-Key": "1f82075fdemsh3f0e18ead7e5ea9p165955jsna8c49db94c7c",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    };

    const res = yield getCryptoAPIData(
      "get",
      `https://coinranking1.p.rapidapi.com/coin/${action.payload}/history?timeperiod=${action.time}`,
      header
    );
    yield put(receiveCryptoHistoryResponse(res));
  } catch (error) {
    yield put(receiveCryptoHistoryError(error.message));
  }
}
