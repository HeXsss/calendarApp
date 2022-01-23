import { Component } from 'react';
import Topbar from './Components/Topbar/Topbar';
import Calendar from './Components/Calendar/Calendar';
import Reminders from './Components/Reminders/Reminders';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    const now = new Date();
    this.state = {
      currentDate: new Date(now.getFullYear(), now.getMonth()),
      reminders: [],
      reminderDate: null,
    }
    this.handleDateUpdate = this.handleDateUpdate.bind(this)
    this.handleSelectDate = this.handleSelectDate.bind(this)
    this.handleCloseReminderManage = this.handleCloseReminderManage.bind(this)
    this.handleAddReminder = this.handleAddReminder.bind(this)
    this.handleRemoveReminder = this.handleRemoveReminder.bind(this)
  }
  handleDateUpdate(type, value) {
    let selectedDate = this.state.currentDate
    if (type === 'year') {
      selectedDate = new Date(selectedDate.getFullYear() + value, selectedDate.getMonth(), selectedDate.getDate())
    } else if (type === 'month') {
      selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + value, selectedDate.getDate())
    } else {
      console.error('Invalid date')
      return
    }
    this.setState({
      currentDate: selectedDate,
    })
  }
  filterRemindersByMonth(reminders) {
    return reminders.filter(e => e.date.getMonth() === this.state.currentDate.getMonth() && e.date.getFullYear() === this.state.currentDate.getFullYear())
  }
  handleSelectDate(date) {
    if (this.state.reminderDate !== null) {
      console.warn('Already setted')
      return
    } 
    this.setState({
      reminderDate: new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), date),
    })
  }
  handleCloseReminderManage() {
    this.setState({
      reminderDate: null
    })
  }
  getIndex() {
    const allIndexes = this.state.reminders.map(e => e.id)
    let id = 1
    while (true) {
      if (!allIndexes.includes(id)) {
        console.log(id)
        return id
      }
      id++
    }
  }
  handleAddReminder(date, content, note) {
    if (content.trim() === '') return
    this.setState((prev) => {
      return {
        reminders: [...prev.reminders, {
          id: this.getIndex(),
          date,
          content,
          note
        }]
      }
    })
  }
  handleRemoveReminder(id) {
    this.setState((prev) => {
      return {
        reminders: prev.reminders.filter(e => e.id !== id)
      }
    })
  }
  render() {
    const isValidDate = this.state.currentDate instanceof Date && !isNaN(this.state.currentDate)
    return (
      <>
        {this.state.reminderDate !== null && <Reminders handleClose={this.handleCloseReminderManage} selectedDate={this.state.reminderDate} reminders={this.filterRemindersByMonth(this.state.reminders)} handleAddReminder={this.handleAddReminder} handleRemoveReminder={this.handleRemoveReminder}/>}
        <Topbar date={this.state.currentDate} handleDateUpdate={this.handleDateUpdate}/>
        {isValidDate && <Calendar date={this.state.currentDate} reminders={this.filterRemindersByMonth(this.state.reminders)} handleSelectDate={this.handleSelectDate}/>}
      </>
    )
  }
}