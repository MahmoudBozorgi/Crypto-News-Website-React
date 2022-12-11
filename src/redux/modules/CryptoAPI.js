import { put } from "redux-saga/effects";
import { getCryptoAPIData } from "../../services/CryptoAPI";

export const SEND_CRYPTO_API_REQUEST = "SEND_CRYPTO_API_REQUEST";
export const RECEIVE_CRYPTO_API_RESPONSE = "RECEIVE_CRYPTO_API_RESPONSE";
export const RECEIVE_CRYPTO_API_ERROR = "RECEIVE_CRYPTO_API_ERROR";

const init = {
  loading: false,
  data: [],
  error: null,
};

export const cryptoApiReducer = (state = init, action) => {
  switch (action.type) {
    case SEND_CRYPTO_API_REQUEST:
      return { loading: true, data: [], error: null };

    case RECEIVE_CRYPTO_API_RESPONSE:
      return { loading: false, data: action.payload, error: null };

    case RECEIVE_CRYPTO_API_ERROR:
      return { loading: false, data: [], error: action.payload };

    default:
      return state;
  }
};

export const sendCryptiAPIRequest = (query) => {
  return {
    type: SEND_CRYPTO_API_REQUEST,
    payload: query,
  };
};

export const receiveCryptiAPIResponse = (data) => {
  return {
    type: RECEIVE_CRYPTO_API_RESPONSE,
    payload: data,
  };
};

export const receiveCryptoAPIError = (error) => {
  return {
    type: RECEIVE_CRYPTO_API_ERROR,
    payload: error,
  };
};

export function* watcherCryptoApi() {
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

    yield put(receiveCryptiAPIResponse(res));
  } catch (error) {
    yield put(receiveCryptoAPIError(error.message));
  }
}
