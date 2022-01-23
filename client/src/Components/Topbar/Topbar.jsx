import {Component} from "react";
import './Topbar.css';
import TopbarDataSelector from '../TopbarDataSelector/TopbarDataSelector';

export default class Topbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = {
      year: this.props.date.getFullYear().toString(),
      month: (this.props.date.getMonth() + 1).toString(),
      day: this.props.date.getDate().toString()
    }
    for (let dateType in data) {
      if (data[dateType] < 10) data[dateType] = `0${data[dateType]}`
    }
    return (
      <div id="Topbar">
        <TopbarDataSelector
          value={data.year}
          handleIncrement={() => {
            this.props.handleDateUpdate('year', 1)
          }}
          handleDecrement={() => {
            this.props.handleDateUpdate('year', -1)
          }}
        />
        <TopbarDataSelector 
          value={data.month}
          handleIncrement={() => {
            this.props.handleDateUpdate('month', 1)
          }}
          handleDecrement={() => {
            this.props.handleDateUpdate('month', -1)
          }}
        />
      </div>
    )
  }
}