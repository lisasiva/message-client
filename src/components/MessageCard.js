import React from 'react';
import '../sass/MessageList.scss';

class MessageCard extends React.Component {
  render() {
    const { content, senderUuid, timeStamp, messageId } = this.props.message;

    return (
      <div className="card">
        <div className="card__details">
          <div className="card__header">
            <div className="card__header--sender">{senderUuid}</div>
            <div className="card__header--date">{timeStamp}</div>
          </div>
          <div className="card__content">
            <p>{content}</p>
          </div>
        </div>
        <div className="card__delete" onClick={() => { this.props.onDelete(messageId)}}>
        </div>
      </div>
    )
  }
}

export default MessageCard;
