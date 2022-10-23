import { takeEvery } from "redux-saga";
import { call, put } from "redux-saga/lib/effects";

import Api from "../api";

function* getHistoricalPrices() {
  console.log("getHistricalPrices");
  try {
    const response = yield call(Api.callHistoricalPricesApi);

    yield put({
      type: "HISTORICAL_PRICES_CALL_SUCCESS",
      historicalPrices: response.data
    });
  } catch (error) {
    yield put({ type: "HISTORICAL_PRICES_CALL_FAILED" });
  }
}

export function* watchHistoricalPricesSaga() {
  yield takeEvery("GET_HISTORICAL_PRICES", getHistoricalPrices);
}
