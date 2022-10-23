export const POST_TRADE = "POST_TRADE";

export const postTrade = trade => {
  return {
    type: POST_TRADE,
    trade
  };
};
