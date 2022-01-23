import { Component } from 'react';
import Topbar from './Components/Topbar/Topbar';
import Calendar from './Components/Calendar/Calendar';
import Reminders from './Components/Reminders/Reminders';
import Loading from './Components/Loading/Loading';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    const now = new Date();
    this.state = {
      currentDate: new Date(now.getFullYear(), now.getMonth()),
      reminders: [],
      reminderDate: null,
      loading: false
    }
    this.handleDateUpdate = this.handleDateUpdate.bind(this)
    this.handleSelectDate = this.handleSelectDate.bind(this)
    this.handleCloseReminderManage = this.handleCloseReminderManage.bind(this)
    this.handleAddReminder = this.handleAddReminder.bind(this)
    this.handleRemoveReminder = this.handleRemoveReminder.bind(this)
  }
  componentDidMount() {
    this.loadReminders()
  }
  queryDate(date) {
    const Year = date.getFullYear()
    const Month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1
    const Day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    const Hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const Minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const Second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    const Millisecond = date.getMilliseconds() < 10? `00${date.getMilliseconds()}`: date.getMilliseconds() < 100? `0${date.getMilliseconds()}`:date.getMilliseconds()
    return `${Year}-${Month}-${Day}T${Hour}:${Minute}:${Second}.${Millisecond}Z`
  }
  async loadReminders() {
    this.setState({ loading: true })
    const response = await fetch(`http://localhost:4001/api/v1/reminders/get?date=${this.queryDate(this.state.currentDate)}`)
    const reminders = await response.json()
    reminders.forEach(e => {
      e.date = new Date(e.date)
    })
    this.setState({
      loading: false,
      reminders
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentDate !== this.state.currentDate) {
      this.loadReminders()
    }
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
  async getIndex() {
    const response = await fetch('http://localhost:4001/api/v1/reminders/freeIndex')
    const json = await response.json()
    const id = json.id
    return id
  }
  async handleAddReminder(date, content, note) {
    if (content.trim() === '') return
    let remind = null
    const index = await this.getIndex()
    this.setState((prev) => {
      remind = {
        id: index,
        date,
        content,
        note
      }
      return {
        reminders: [...prev.reminders, remind]
      }
    })
    const response = await fetch('http://localhost:4001/api/v1/reminders/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: remind.id,
        date: this.queryDate(remind.date),
        content: remind.content,
        note: remind.note
      })
    })
  }
  async handleRemoveReminder(id) {
    this.setState((prev) => {
      return {
        reminders: prev.reminders.filter(e => e.id !== id)
      }
    })
    const response = await fetch('http://localhost:4001/api/v1/reminders/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id
      })
    })
  }
  render() {
    const isValidDate = this.state.currentDate instanceof Date && !isNaN(this.state.currentDate)
    return (
      <>
        <Loading loading={this.state.loading}/>
        {this.state.reminderDate !== null && <Reminders handleClose={this.handleCloseReminderManage} selectedDate={this.state.reminderDate} reminders={this.state.reminders} handleAddReminder={this.handleAddReminder} handleRemoveReminder={this.handleRemoveReminder}/>}
        <Topbar date={this.state.currentDate} handleDateUpdate={this.handleDateUpdate}/>
        {isValidDate && <Calendar date={this.state.currentDate} reminders={this.state.reminders} handleSelectDate={this.handleSelectDate}/>}
      </>
    )
  }
}