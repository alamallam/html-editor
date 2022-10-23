const initialState = {
  priceData: null,
  historicalPricesCallMade: false,
  historicalPricesCallCompleted: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_HISTORICAL_PRICES":
      return {
        ...state,
        historicalPricesCallMade: true
      };
    case "HISTORICAL_PRICES_CALL_FAILED":
      return {
        ...state,
        historicalPricesCallMade: false,
        historicalPricesCallFailed: true
      };
    case "HISTORICAL_PRICES_CALL_SUCCESS":
      return {
        ...state,
        historicalPricesCallMade: false,
        historicalPricesCallCompleted: true,
        priceData: action.historicalPrices
      };
    default:
      return state;
  }
}
