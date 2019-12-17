import React from 'react';
import data from '../data';
import { days, months } from '..//helpers/dates';
import Nav from './Nav';
import MessageList from './MessageList';
import SortMenu from './SortMenu';
import Button from './Button';
import '../sass/base.scss';
import '../sass/layout.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      reversed: false,
      index: 5,
      deleted: [],
      view: 'inbox'
    };
  }

  componentDidMount() {
    this.setState({ messages: this.formatMessages(data.messages) });
  }

  formatMessages(messages) {
    const cache = {};
    const deDupedMessages = [];
    let key;
    data.messages.forEach(message => {
      key = message.uuid + message.content;
      if (!cache[key]) {
        message.messageId = key;
        message.timeStamp = this.formatDate(message.sentAt);
        cache[key] = true;
        deDupedMessages.push(message);
      }
    })
    return deDupedMessages.sort((a, b) => (a.sentAt <  b.sentAt) ? 1 : -1);
  }

  formatDate(iso) {
    const readable = new Date(iso);
    return `${days[readable.getDay()]}, ${months[readable.getMonth()]} ${readable.getDate()}, ${readable.getFullYear()} at ${this.formatTime(readable.getHours(), readable.getMinutes())}`;
  }

  formatTime(hours, minutes) {
    return hours > 12 ? `${hours - 12}:${minutes}pm` : `${hours}:${minutes}am`;
  }

  renderMessageContainer() {
    const { messages, index, view } = this.state;
    if (view === 'inbox') {
      return (
        <div className="container__messages">
          <SortMenu onSort={this.onSort} text="Sort by:"/>
          <MessageList
            messages={messages.slice(0, index)}
            onDelete={this.onDelete}
          />
          <Button
            text="Show More"
            onMoreMessages={this.onMoreMessages}
            type={index >= messages.length ? 'button--inactive' : 'button'}
          />
        </div>
      )
    } else {
      return (
        <div className="container__messages">
          <SortMenu onSort={this.onSort} text="Deleted messages:"/>
          <MessageList
            messages={this.state.deleted}
            onDelete={null}
          />
        </div>
      )
    }
  }

  onSort = (option) => {
    if ((option === 'oldest' && this.state.reversed === false) || (option === 'recent' && this.state.reversed === true)) {
      this.setState({
        messages: this.state.messages.reverse(),
        reversed: this.state.reversed ? false : true
      })
    }
  }

  onMoreMessages = () => {
    this.setState({ index: this.state.index + 5 })
  }

  onDelete = (id) => {
    const messages = [...this.state.messages];
    const index = messages.findIndex(message => message.messageId === id);
    const deletedMessage = messages.splice(index, 1);
    const deleted = [...this.state.deleted, ...deletedMessage];
    this.setState({
      messages,
      index: this.state.index - 1,
      deleted
    });
  }

  onViewChange = (view) => {
    if (view !== this.state.view) {
      this.setState({ view });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="container__nav">
          <Nav
            view={this.state.view}
            inboxCount={this.state.messages.length}
            deletedCount={this.state.deleted.length}
            onViewChange={this.onViewChange}
          />
        </div>
        {this.renderMessageContainer()}
      </div>
    )
  }
}

export default App;
