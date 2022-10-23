import React from "react";
import Axios from "axios";
import Moment from "moment";

import { ChartCard, MiniArea } from "ant-design-pro/lib/Charts";
import NumberInfo from "ant-design-pro/lib/NumberInfo";

const HistoricalPrices = props => (
  <ChartCard title="BitCoin Price Data">
    <NumberInfo subTitle={props.fromDate + " " + props.toDate} />
    <MiniArea
      line
      yAxis={{ type: "linear", min: 6000, max: 7000 }}
      height={134}
      data={props.history}
    />
  </ChartCard>
);

export default HistoricalPrices;
