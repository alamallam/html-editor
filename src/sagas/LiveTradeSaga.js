import { eventChannel } from "redux-saga";
import { call, put, take, takeEvery } from "redux-saga/lib/effects";

import { postTrade, POST_TRADE } from "../actions/LiveTrade";

import io from "socket.io-client";

import CCC from "../utils/CCC";

var fsym = "BTC";
var tsym = "USD";
var currentSubs;
var currentSubsText = "";
var data = {
  USD: {
    TRADES: [
      "0~Cryptsy~BTC~USD",
      "0~BTCChina~BTC~USD",
      "0~Bitstamp~BTC~USD",
      "0~OKCoin~BTC~USD",
      "0~Coinbase~BTC~USD",
      "0~Poloniex~BTC~USD",
      "0~Cexio~BTC~USD",
      "0~BTCE~BTC~USD",
      "0~BitTrex~BTC~USD",
      "0~Kraken~BTC~USD",
      "0~Bitfinex~BTC~USD",
      "0~LocalBitcoins~BTC~USD",
      "0~itBit~BTC~USD",
      "0~Coinfloor~BTC~USD",
      "0~Huobi~BTC~USD",
      "0~LakeBTC~BTC~USD",
      "0~Coinsetter~BTC~USD",
      "0~CCEX~BTC~USD",
      "0~MonetaGo~BTC~USD",
      "0~Gatecoin~BTC~USD",
      "0~Gemini~BTC~USD",
      "0~CCEDK~BTC~USD",
      "0~Exmo~BTC~USD",
      "0~Yobit~BTC~USD",
      "0~BitBay~BTC~USD",
      "0~QuadrigaCX~BTC~USD",
      "0~BitSquare~BTC~USD",
      "0~TheRockTrading~BTC~USD",
      "0~bitFlyer~BTC~USD",
      "0~Quoine~BTC~USD",
      "0~LiveCoin~BTC~USD",
      "0~WavesDEX~BTC~USD",
      "0~Lykke~BTC~USD",
      "0~Remitano~BTC~USD",
      "0~Coinroom~BTC~USD",
      "0~Abucoins~BTC~USD",
      "0~TrustDEX~BTC~USD",
      "0~BitFlip~BTC~USD",
      "0~Coincap~BTC~USD",
      "0~ExtStock~BTC~USD",
      "0~DSX~BTC~USD",
      "0~Bitlish~BTC~USD",
      "0~CoinDeal~BTC~USD",
      "0~CoinsBank~BTC~USD",
      "0~Neraex~BTC~USD",
      "0~SingularityX~BTC~USD",
      "0~Simex~BTC~USD",
      "0~RightBTC~BTC~USD",
      "0~WEX~BTC~USD",
      "0~BitexBook~BTC~USD",
      "0~IndependentReserve~BTC~USD",
      "0~CoinHub~BTC~USD",
      "0~Ore~BTC~USD",
      "0~Bitsane~BTC~USD",
      "0~BTCAlpha~BTC~USD",
      "0~IQFinex~BTC~USD",
      "0~P2PB2B~BTC~USD",
      "0~StocksExchange~BTC~USD"
    ]
  }
};

const transformData = function(data) {
  var coinfsym = CCC.STATIC.CURRENCY.getSymbol(fsym);
  var cointsym = CCC.STATIC.CURRENCY.getSymbol(tsym);
  var incomingTrade = CCC.TRADE.unpack(data);
  console.log(incomingTrade);
  var newTrade = {
    Market: incomingTrade["M"],
    Type: incomingTrade["T"],
    ID: incomingTrade["ID"],
    Price: CCC.convertValueToDisplay(cointsym, incomingTrade["P"]),
    Quantity: CCC.convertValueToDisplay(coinfsym, incomingTrade["Q"]),
    Total: CCC.convertValueToDisplay(cointsym, incomingTrade["TOTAL"])
  };

  if (incomingTrade["F"] & 1) {
    newTrade["Type"] = "SELL";
  } else if (incomingTrade["F"] & 2) {
    newTrade["Type"] = "BUY";
  } else {
    newTrade["Type"] = "UNKNOWN";
  }

  // displayData(newTrade);
  console.log("NEW TRADE", newTrade);
  return newTrade;
};

function* initLiveTradeSaga() {
  console.log("~~INSIDE initLiveTradeSaga~~");
  return eventChannel(emitter => {
    let ws = io("wss://streamer.cryptocompare.com");

    const subscribe = {
      type: "SubAdd",
      subs: ["0~Poloniex~BTC~USD"]
    };

    // ws.emit("SubAdd", { subs: ["0~Poloniex~BTC~USD"] });

    currentSubs = data["USD"]["TRADES"];
    console.log(currentSubs);
    for (var i = 0; i < currentSubs.length; i++) {
      currentSubsText += currentSubs[i] + ", ";
    }

    ws.emit("SubAdd", { subs: currentSubs });

    ws.on("error", error => {
      console.log("ERROR: ", error);
      console.dir(error);
    });

    // ws.on("m", e => {
    //   console.log(e);
    //   let value = null;
    //   try {
    //     value = JSON.parse(e.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   console.log("VALUE: ", value);
    //   emitter(postTrade(value));
    // });

    ws.on("m", data => {
      let value = null;
      try {
        value = data;
      } catch (error) {
        console.log(error);
      }
      if (value !== "3~LOADCOMPLETE") {
        let trade = null;
        var tradeField = value.substr(0, value.indexOf("~"));
        if (tradeField == CCC.STATIC.TYPE.TRADE) {
          trade = transformData(value);
        }
        emitter({
          type: POST_TRADE,
          trade
        });
      }
    });

    return () => {
      ws.close();
    };
  });
}

function* wsSaga() {
  console.log("~~INSIDE LIVE TRADE wsSaga~~");
  const channel = yield call(initLiveTradeSaga);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default function* watchLiveTradeSaga() {
  console.log("~~INSIDE LIVE TRADE WATCHER SAGA~~");
  yield call(wsSaga);
}
