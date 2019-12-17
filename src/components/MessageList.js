import React from 'react';
import MessageCard from './MessageCard';
import '../sass/MessageList.scss';

class MessageList extends React.Component {
  render() {
    const { messages, onDelete } = this.props;
    return (
      <div className={onDelete ? 'list' : 'list list--deleted'}>
        {messages.map(message => <MessageCard message={message} key={message.messageId} onDelete={onDelete} />)}
      </div>
    )
  }
}

export default MessageList;
