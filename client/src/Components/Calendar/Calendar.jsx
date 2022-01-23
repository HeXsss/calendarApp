import { Component } from 'react';
import DateDay from '../DateDay/DateDay';
import './Calendar.css';

export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.loadCalendar = this.loadCalendar.bind(this)
  }
  loadCalendar() {
    const monthDays = []
    let referenceDate = new Date(this.props.date.getFullYear(), this.props.date.getMonth(), 1)
    const currentMonth = referenceDate.getMonth()
    while (referenceDate.getMonth() === currentMonth) {
      monthDays.push(referenceDate)
      referenceDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate() + 1)
    }
    return monthDays
  }
  filterRemindersByDate(day) {
    return this.props.reminders.filter(e => {
      let refDate = new Date(this.props.date.getFullYear(), this.props.date.getMonth(), day)
      return (e.date.getFullYear() === refDate.getFullYear()&&
      e.date.getMonth() === refDate.getMonth() &&
      e.date.getDate() === refDate.getDate())
    })
  }
  render() {
    const month = this.loadCalendar()
    const spanSize = month[0].getDay() === 0 ? 6:month[0].getDay()-1
    return (
      <div id="Calendar">
        {spanSize !== 0 && <div className="spanGrid" style={{gridColumn: `span ${spanSize}`}}></div>}
        {month.map((e, id) => {
          return <DateDay key={`month_${id}`} date={e} onClick={this.props.handleSelectDate} reminders={this.filterRemindersByDate(e.getDate())}/>
        })}
      </div>
    )
  }
}