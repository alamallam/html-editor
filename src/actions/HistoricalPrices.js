export const getHistoricalPrices = () => {
  return {
    type: "GET_HISTORICAL_PRICES"
  };
};

export const historicalPricesCallFailed = () => {
  return {
    type: "HISTORICAL_PRICES_CALL_FAILED"
  };
};

export const historicalPricesCallSuccess = data => {
  return {
    type: "HISTORICAL_PRICES_CALL_SUCCESS",
    historicalPrices: data
  };
};
