import React from "react";
// import HistoricalPrices from "./components/HistoricalPrices";
// import LivePrices from "./components/LivePrices";
import Convert from "./components/Convert";

import ChatContainer from "./containers/Chat.container";
import HistoricalPricesContainer from "./containers/HistoricalPrices.container";
import LivePricesContainer from "./containers/LivePrices.container";
import LiveTradeContainer from "./containers/LiveTrade.container";

const App = () => (
  <div>
    <Convert />
    <ChatContainer />
    <LiveTradeContainer />
    <div style={{ height: "300px" }}>
      <LivePricesContainer />
    </div>
    <HistoricalPricesContainer />
  </div>
);

export default App;
