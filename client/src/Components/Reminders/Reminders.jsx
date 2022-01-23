import { Component } from 'react';
import './Reminders.css';
import {
  MdPlaylistAdd,
  MdOutlineClose,
  MdStickyNote2,
  MdEditCalendar,
  MdPanTool,
  MdOutlineRemoveCircle
} from 'react-icons/md'

export default class Reminders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showedAdding: false,
      inputs: {
        content: '',
        note: ''
      }
    }
    this.toggleAdding = this.toggleAdding.bind(this)
    this.handleAddReminderEvent = this.handleAddReminderEvent.bind(this)
    this.handleRightClick = this.handleRightClick.bind(this)
  }
  handleRightClick(event) {
    event.preventDefault();
    this.props.handleClose()
  }
  componentDidMount() {
    document.addEventListener("contextmenu", this.handleRightClick);
  }
  componentWillUnmount() {
    document.removeEventListener("contextmenu", this.handleRightClick);
  }
  toggleAdding() {
    this.setState((prev) => {
      return {showedAdding: !prev.showedAdding}
    })
  }
  handleInput(type, {target}) {
    this.setState((prev) => {
      let valueToUpdate = prev.inputs
      valueToUpdate[type] = target.value
      return valueToUpdate
    })
  }
  filterRemindersByDay() {
    return this.props.reminders.filter(e => {
      return (e.date.getFullYear() === this.props.selectedDate.getFullYear()&&
      e.date.getMonth() === this.props.selectedDate.getMonth() &&
      e.date.getDate() === this.props.selectedDate.getDate())
    })
  }
  handleAddReminderEvent() {
    this.props.handleAddReminder(this.props.selectedDate, this.state.inputs.content, this.state.inputs.note)
  }
  render() {
    const formatedDate = `${this.props.selectedDate.getDate() < 10 ? `0${this.props.selectedDate.getDate()}` : this.props.selectedDate.getDate()}.${this.props.selectedDate.getMonth() + 1 < 10 ? `0${this.props.selectedDate.getMonth() + 1}` : this.props.selectedDate.getMonth()}.${this.props.selectedDate.getFullYear()}`
    return (
      <div id="Reminders">
        <div id="Container">
          <div id="Topbar-info">
            Reminders for {formatedDate}
            <div id="CloseReminder" onClick={this.props.handleClose}><MdOutlineClose/></div>
          </div>
          <div id="Add-new-reminder">
            <div id="Button-unleash-add" onClick={this.toggleAdding}>
              <div className="icon"><MdPlaylistAdd/></div>
              <div className="label">Create new reminder</div>
            </div>
            {this.state.showedAdding && (<form>
              <label htmlFor="content"><MdEditCalendar/>Reminder content</label>
              <input type="text" name="content" placeholder="Wash dished" spellCheck={false} onChange={(e) => {
                this.handleInput('content', e)
              }} value={this.state.inputs.content}/>
              <label htmlFor="content"><MdStickyNote2/>Note</label>
              <input type="text" name="note" placeholder="Do it carefully" spellCheck={false} onChange={(e) => {
                this.handleInput('note', e)
              }} value={this.state.inputs.note}/>
              <div id="Action-buttons">
                <div className="button" onClick={this.handleAddReminderEvent}>Add</div>
              </div>
            </form>)}
          </div>
          <div id="Reminders-list">
            {this.props.reminders.filter(e => e.date.getDate() === this.props.selectedDate.getDate()).map((e, id) => {
              return (
                <div className="item-reminder" key={`reminder_${id}`}>
                  <div className="item-label">{e.content}</div>
                  <div className="item-note">{e.note}</div>
                  <div className="item-move"><MdPanTool/></div>
                  <div className="item-remove" onClick={() => {
                    this.props.handleRemoveReminder(e.id)
                  }}><MdOutlineRemoveCircle/></div>
                </div>
              )
            })}
            
          </div>
        </div>
      </div>
    )
  }
}