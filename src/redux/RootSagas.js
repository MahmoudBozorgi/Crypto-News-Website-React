import { all, takeEvery } from "redux-saga/effects";
import { SEND_COINS_REQUEST, watcherCoins } from "./modules/Coins";
import { SEND_CRYPTO_API_REQUEST, watcherCryptoApi } from "./modules/CryptoAPI";
import {
  SEND_CRYPTO_DETAILS_REQUEST,
  watcherCryptoDetails,
} from "./modules/CryptoDetails";
import {
  SEND_CRYPTO_HISTORY_REQUEST,
  watcherCryptoHistory,
} from "./modules/CryptoHistory";
import { SEND_NEWS_API_REQUEST, watcherNewsApi } from "./modules/News";

export function* rootSaga() {
  yield all([
    yield takeEvery(SEND_CRYPTO_API_REQUEST, watcherCryptoApi),
    takeEvery(SEND_COINS_REQUEST, watcherCoins),
    takeEvery(SEND_NEWS_API_REQUEST, watcherNewsApi),
    takeEvery(SEND_CRYPTO_DETAILS_REQUEST, watcherCryptoDetails),
    takeEvery(SEND_CRYPTO_HISTORY_REQUEST, watcherCryptoHistory),
  ]);
}
