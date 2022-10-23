import Axios from "axios";

export default {
  callHistoricalPricesApi: function() {
    console.log("INSIDE API CALL");
    return Axios.get(
      "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=100"
    );
  }
};
