import { put } from "redux-saga/effects";
import { getCryptoAPIData } from "../../services/CryptoAPI";

export const SEND_CRYPTO_DETAILS_REQUEST = "SEND_CRYPTO_DETAILS_REQUEST";
export const RECEIVE_CRYPTO_DETAILS_RESPONSE =
  "RECEIVE_CRYPTO_DETAILS_RESPONSE";
export const RECEIVE_CRYPTO_DETAILS_ERROR = "RECEIVE_CRYPTO_DETAILS_ERROR";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const cryptoDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_CRYPTO_DETAILS_REQUEST:
      return { loading: true, data: [], error: null };

    case RECEIVE_CRYPTO_DETAILS_RESPONSE:
      return { loading: false, data: action.payload, error: null };

    case RECEIVE_CRYPTO_DETAILS_ERROR:
      return { loading: false, data: [], error: action.payload };

    default:
      return state;
  }
};

export const sendCryptoDetailsRequest = (query) => {
  return {
    type: SEND_CRYPTO_DETAILS_REQUEST,
    payload: query,
  };
};

export const receiveCryptoDetailsResponse = (data) => {
  return {
    type: RECEIVE_CRYPTO_DETAILS_RESPONSE,
    payload: data,
  };
};

export const receiveCryptoDetailsError = (error) => {
  return {
    type: RECEIVE_CRYPTO_DETAILS_ERROR,
    payload: error,
  };
};

export function* watcherCryptoDetails(action) {
  try {
    const header = {
      "X-RapidAPI-Key": "1f82075fdemsh3f0e18ead7e5ea9p165955jsna8c49db94c7c",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    };

    const res = yield getCryptoAPIData(
      "get",
      `https://coinranking1.p.rapidapi.com/coin/${action.payload}`,
      header
    );

    yield put(receiveCryptoDetailsResponse(res));
  } catch (error) {
    yield put(receiveCryptoDetailsError(error.message));
  }
}
