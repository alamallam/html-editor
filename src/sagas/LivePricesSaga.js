import { eventChannel } from "redux-saga";
import { call, put, take, takeEvery } from "redux-saga/lib/effects";

function initWebsocket() {
  return eventChannel(emitter => {
    //Subscription Data
    const subscribe = {
      type: "subscribe",
      channels: [
        {
          name: "ticker",
          product_ids: ["BTC-USD"]
        }
      ]
    };

    //Subscribe to websocket
    let ws = new WebSocket("wss://ws-feed.pro.coinbase.com");

    ws.onopen = () => {
      console.log("Opening Websocket");
      ws.send(JSON.stringify(subscribe));
    };

    ws.onerror = error => {
      console.log("ERROR: ", error);
      console.dir(error);
    };

    ws.onmessage = e => {
      let value = null;
      try {
        value = JSON.parse(e.data);
      } catch (e) {
        console.error(`Error Parsing Data: ${e.data}`);
      }
      if (value && value.type === "ticker") {
        emitter({
          type: "POST_LIVE_PRICE_DATA",
          data: value.price
        });
      }
    };

    return () => {
      ws.close();
    };
  });
}

function* wsSaga() {
  const channel = yield call(initWebsocket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export function* watchLivePricesSaga() {
  yield takeEvery("START_LIVE_PRICE_APP", wsSaga);
}
