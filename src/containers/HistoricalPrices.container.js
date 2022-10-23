import React from "react";
import Moment from "moment";
import { Spin } from "antd";

import { getHistoricalPrices } from "../actions/HistoricalPrices";
import { connect } from "react-redux";

import HistoricalPrices from "../components/HistoricalPrices";

class HistoricalPricesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: null,
      toDate: null,
      history: [],
      dataExtracted: false
    };
  }

  componentDidMount() {
    this.props.getHistoricalPrices();
  }

  extractData = () => {
    const data = this.props.priceData;
    const history = [];
    Object.keys(data.Data).map(key => {
      history.push({
        x: Moment.unix(data.Data[key].time).format("YYYY-MM-DD"),
        y: data.Data[key].close
      });
    });
    this.setState({
      history,
      fromDate: Moment.unix(data.TimeFrom).format("YYYY-MM-DD"),
      toDate: Moment.unix(data.TimeTo).format("YYYY-MM-DD"),
      dataExtracted: true
    });
  };

  render() {
    if (this.props.callCompleted && !this.state.dataExtracted) {
      this.extractData();
    }
    return this.state.dataExtracted ? (
      <HistoricalPrices
        history={this.state.history}
        fromDate={this.state.fromDate}
        toDate={this.state.toDate}
      />
    ) : (
      <Spin size="large" />
    );
  }
}

function mapStateToProps(state) {
  return {
    priceData: state.HistoricalPrices.priceData,
    callCompleted: state.HistoricalPrices.historicalPricesCallCompleted
  };
}

export default connect(
  mapStateToProps,
  { getHistoricalPrices }
)(HistoricalPricesContainer);
