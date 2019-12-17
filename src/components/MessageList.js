import React from 'react';
import MessageCard from './MessageCard';
import '../sass/Messages.scss';

class MessageList extends React.Component {
  renderMessages() {
    const { messages, onDelete } = this.props;
    return messages.map(message => <MessageCard message={message} key={message.messageId} onDelete={onDelete} />);
  }

  render() {
    const { messages, onDelete } = this.props;
    // If there is no onDelete method, then we are rendering a list of already deleted messages
    // 'list--deleted' class, when toggled on, will disable pointer-events 
    return (
      <div className={onDelete ? 'list' : 'list list--deleted'}>
        {messages.length ? this.renderMessages() : <div className="empty-box">No messages here!</div>}
      </div>
    )
  }
}

export default MessageList;
