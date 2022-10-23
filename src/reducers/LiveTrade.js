import { POST_TRADE } from "../actions/LiveTrade";

const initialState = {
  trades: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_TRADE:
      return {
        ...state,
        trades: [action.trade, ...state.trades.slice(0, 9)]
      };
    default:
      return state;
  }
};
