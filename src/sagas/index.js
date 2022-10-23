import { takeLatest } from "redux-saga";
import { all, fork } from "redux-saga/lib/effects";

import { watchHistoricalPricesSaga } from "./HistoricalPricesSaga";
import { watchLivePricesSaga } from "./LivePricesSaga";
import { authWatcherSaga } from "./Auth";
import ChatWatcherSaga from "./Chat";
import LiveTradeWatcherSaga from "./LiveTradeSaga";

export default function* watcherSaga() {
  yield all([
    fork(watchHistoricalPricesSaga),
    fork(watchLivePricesSaga),
    fork(authWatcherSaga),
    fork(ChatWatcherSaga),
    fork(LiveTradeWatcherSaga)
  ]);
}
