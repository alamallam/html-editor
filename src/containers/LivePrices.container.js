import React from "react";
import { connect } from "react-redux";

import { startLivePriceApp } from "../actions/LivePrices";

import LivePricesComponent from "../components/LivePrices";

class LivePricesContainer extends React.Component {
  state = {
    lineChartData: {
      labels: [],
      datasets: [
        {
          type: "line",
          label: "BTC-USD",
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "rgba(27,143, 255, 1)",
          pointBackgroundColor: "rgba(27,143, 255, 1)",
          pointBorderColor: "rgba(27,143, 255, 1)",
          borderWidth: "2",
          lineTension: 0.45,
          data: []
        }
      ]
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true
      },
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 7
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0.1)"
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0.1)"
            }
          }
        ]
      }
    }
  };

  componentDidMount() {
    this.props.startLivePriceApp();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.livePrices !== state.lineChartData.datasets[0]) {
      const oldDataset = state.lineChartData.datasets[0];
      const newDataset = { ...oldDataset };
      newDataset.data = props.livePrices;

      const newChartData = {
        ...state.lineChartData,
        datasets: [newDataset],
        labels: props.timeLabels
      };

      return {
        lineChartData: newChartData
      };
    }
  }

  render() {
    return (
      <LivePricesComponent
        data={this.state.lineChartData}
        options={this.state.lineChartOptions}
      />
    );
  }
}
//Component Body END

function mapStateToProps(state) {
  return {
    livePrices: state.LivePrices.livePriceData,
    timeLabels: state.LivePrices.timeLabels
  };
}

export default connect(
  mapStateToProps,
  { startLivePriceApp }
)(LivePricesContainer);
