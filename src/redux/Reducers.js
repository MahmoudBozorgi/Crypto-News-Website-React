import { combineReducers } from "@reduxjs/toolkit";
import { cryptoApiReducer } from "./modules/CryptoAPI";
import { coinsReducer } from "./modules/Coins";
import { newsApiReducer } from "./modules/News";
import { cryptoDetailsReducer } from "./modules/CryptoDetails";
import { cryptoHistoryReducer } from "./modules/CryptoHistory";

export const rootReducers = combineReducers({
  cryptoApiReducer,
  coinsReducer,
  newsApiReducer,
  cryptoDetailsReducer,
  cryptoHistoryReducer,
});
