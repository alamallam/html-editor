import React from "react";
import { connect } from "react-redux";

import LiveTrade from "../components/LiveTrade";

class LiveTradeContainer extends React.Component {
  render() {
    const { trade } = this.props;
    return (
      <LiveTrade
        dataSource={trade}
        columns={[
          {
            title: "ID",
            dataIndex: "ID",
            key: "ID"
          },
          {
            title: "Market",
            dataIndex: "Market",
            key: "Market"
          },
          {
            title: "Price",
            dataIndex: "Price",
            key: "Price"
          },
          {
            title: "Quantity",
            dataIndex: "Quantity",
            key: "Quantity"
          },
          {
            title: "Total",
            dataIndex: "Total",
            key: "Total"
          },
          {
            title: "Type",
            dataIndex: "Type",
            key: "Type"
          }
        ]}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    trade: state.LiveTrade.trades
  };
}

export default connect(
  mapStateToProps,
  null
)(LiveTradeContainer);
