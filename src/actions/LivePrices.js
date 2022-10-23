export const startLivePriceApp = () => {
  return {
    type: "START_LIVE_PRICE_APP"
  };
};

export const postLivePriceData = livePriceData => {
  return {
    type: "POST_LIVE_PRICE_DATA",
    data: livePriceData
  };
};
