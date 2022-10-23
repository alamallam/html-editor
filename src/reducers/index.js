import HistoricalPrices from "./HistoricalPrices";
import LivePrices from "./LivePrices";
import Auth from "./Auth";
import Chat from "./Chat";
import LiveTrade from "./LiveTrade";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  HistoricalPrices,
  LivePrices,
  Auth,
  Chat,
  LiveTrade
});

export default rootReducer;
