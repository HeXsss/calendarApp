import { Component } from 'react';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import './TopbarDataSelector.css';

export default class TopbarDataSelector extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="select-data">
      <div className="decrement" onClick={this.props.handleDecrement}>
        <MdChevronLeft/>
      </div>
      <div className="data">{this.props.value}</div>
      <div className="increment" onClick={this.props.handleIncrement}>
        <MdChevronRight/>
      </div>
    </div>
    )
  }
}