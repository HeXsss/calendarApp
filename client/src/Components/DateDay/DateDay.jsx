import { Component } from 'react';
import { MdNotifications } from 'react-icons/md';
import './DateDay.css';

export default class Date extends Component {
  constructor(props) {
    super(props);
    this.convertDateToWeekday = this.convertDateToWeekday.bind(this)
  }
  convertDateToWeekday(date) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return weekdays[date.getDay()]
  }
  render() {
    return (
      <div className={"month-day"} onClick={() => {this.props.onClick(this.props.date.getDate())}}>
        <div className="day-num">{this.props.date.getDate()}</div>
        <div className="day-label">{this.convertDateToWeekday(this.props.date)}</div>
        {this.props.reminders.length > 0 && <div className="day-notify"><MdNotifications/>{this.props.reminders.length > 10? "10+":this.props.reminders.length}</div>}
      </div>
    )
  }
}