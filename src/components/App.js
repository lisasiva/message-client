import React from 'react';
import data from '../data';
import { days, months } from '../helpers/dates';
import Nav from './Nav';
import Messages from './Messages';
import '../sass/base.scss';
import '../sass/layout.scss';

class App extends React.Component {
  // Defaults to 5 most recent messages, in descending order
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      order: 'descending',
      index: 5,
      deleted: [],
      view: 'inbox'
    };
  }

  // Updates state with formatted messages
  componentDidMount() {
    this.setState({ messages: this.formatMessages(data.messages) });
  }

  // Prepares messages to be added to state
  formatMessages(messages) {
    const cache = {};
    const deDupedMessages = [];
    let key;
    messages.forEach(message => {
      key = message.uuid + message.content;
      // If we have not previously seen a message with this uuid + content
      if (!cache[key]) {
        // Update message in place
        message.messageId = key;
        message.timeStamp = this.formatDate(message.sentAt);
        // Mark this message as previously seen
        cache[key] = true;
        // Push into new array
        deDupedMessages.push(message);
      }
    })
    // Default order to descending, most recent to oldest
    return deDupedMessages.sort((a, b) => (a.sentAt <  b.sentAt) ? 1 : -1);
  }

  // Convert ISO string to human readable date and time
  formatDate(isoDate) {
    const date = new Date(isoDate);
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${this.formatTime(date.getHours(), date.getMinutes())}`;
  }

  // Convert 24-hour time to 12-hour time
  formatTime(hours, minutes) {
    return hours > 12 ? `${hours - 12}:${minutes}pm` : `${hours}:${minutes}am`;
  }

  // When user chooses a sort order different from the current order, reverse the messages
  // Called by SortMenu (App -> Messages -> SortMenu)
  onSort = (option) => {
    const { messages, order } = this.state;
    if ((option === 'oldest' && order === 'descending') || (option === 'recent' && order === 'ascending')) {
      const reversedMessages = [...messages].reverse();
      this.setState({
        messages: reversedMessages,
        order: order === 'descending' ? 'ascending' : 'descending'
      })
    }
  }

  // When user clicks the "Show More" button, increase index
  // Called by Button (App -> Messages -> Button)
  onMoreMessages = () => {
    this.setState({ index: this.state.index + 5 });
  }

  // When user clicks trash icon on a message, delete that message
  // Called by MessageCard (App -> Messages -> MessageList -> MessageCard)
  onDelete = (id) => {
    const messages = [...this.state.messages];
    // Get index of message to be deleted
    const index = messages.findIndex(message => message.messageId === id);
    // Delete message from messages array
    const deletedMessage = messages.splice(index, 1);
    // Add newly deleted message to deleted array
    const deleted = [...this.state.deleted, ...deletedMessage];
    this.setState({
      messages,
      index: this.state.index - 1,
      deleted
    });
  }

  // When user chooses a view different from the current view, change the view
  // Called by NavOption (App -> Nav -> NavOption)
  onViewChange = (view) => {
    if (view !== this.state.view) {
      this.setState({ view });
    }
  }

  render() {
    const { messages, index, deleted, view } = this.state;
    return (
      <div className="container">
        <div className="container__nav">
          <Nav
            view={view}
            inboxCount={messages.length}
            deletedCount={deleted.length}
            onViewChange={this.onViewChange}
          />
        </div>
        <div className="container__messages">
          <Messages
            view={view}
            messages={view === 'inbox' ? messages : deleted}
            index={index}
            onSort={this.onSort}
            onMoreMessages={this.onMoreMessages}
            onDelete={view === 'inbox' ? this.onDelete : null}
          />
        </div>
      </div>
    )
  }
}

export default App;
