import React, { Component } from "react";
import Chart from "chart.js";
import { Button } from "react-bootstrap";
import axios from "axios";

export default class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mindate: null,
      maxdate: null,
      formsid: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.clickhandle = this.clickhandle.bind(this);
  }
  chartRef = React.createRef();
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  clickhandle(e) {
    e.preventDefault();
    const Enq = {
      mindate: this.state.mindate,
      maxdate: this.state.maxdate,
    };
    axios
      .post("http://localhost:5000/api/getAnalytics", Enq)
      .then((res) => {
        console.log(res);
        this.setState({
          ...this.state.formsid,
          formsid: res.data,
        });
        var json_data = this.state.formsid;
        console.log(json_data);
        var result = [];
        var label_temp = [];
        var count_temp = [];

        for (var i in json_data) {
          result.push([i, json_data[i]]);
        }

        for (var a = 0; a < result.length; a++) {
          label_temp[a] = result[a][0];
        }
        for (var j = 0; j < result.length; j++) {
          count_temp[j] = result[j][1];
        }

        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
          type: "line",
          data: {
            labels: label_temp,

            datasets: [
              {
                label: "Forms",
                data: count_temp,
                borderColor: "#98B9AB",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: {
                top: 10,
                left: 25,
                right: 25,
                bottom: 25,
              },
            },
          },
        });
      })
      .catch(console.log);
  }

  render() {
    return (
      <>
        <div>
          <from>
            <div>
              <label for="min">Start Date</label>
              <input
                name="mindate"
                id="min"
                value={this.state.mindate}
                type="date"
                onChange={this.handleChange}
              />
              <label for="max">End Date</label>
              <input
                onChange={this.handleChange}
                value={this.state.maxdate}
                name="maxdate"
                id="max"
                type="date"
              />
              <Button onClick={this.clickhandle}>Submit</Button>
            </div>
          </from>
          <canvas id="myChart" ref={this.chartRef} />
        </div>
      </>
    );
  }
}
