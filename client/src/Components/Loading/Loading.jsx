import { Component } from 'react';
import { MdFiberSmartRecord } from 'react-icons/md'
import './Loading.css';

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div id="Loading" className={this.props.loading ? "":"stopped"}><MdFiberSmartRecord/></div>
  }
}