import React from 'react';
import ListTitle from './ListTitle';
import MessageList from './MessageList';
import SortMenu from './SortMenu';
import Button from './Button';

class Messages extends React.Component {
  // Render message container depending on whether we're viewing inbox or deleted messages
  getMessageView() {
    const { view, messages, index, onSort, onMoreMessages, onDelete } = this.props;
    // If we're viewing current messages, show sort options and "Show More" button too
    if (view === 'inbox') {
      return (
        <div>
          <SortMenu onSort={onSort} text="Sort by:"/>
          <MessageList
            messages={messages.slice(0, index)}
            onDelete={onDelete}
          />
          <Button
            text="Show More"
            onMoreMessages={onMoreMessages}
            type={index >= messages.length ? 'button--inactive' : 'button'}
          />
        </div>
      )
    // Otherwise, just show list title and messages
    } else {
      return (
        <div>
          <ListTitle title="Deleted messages:" />
          <MessageList
            messages={messages}
            onDelete={onDelete}
          />
        </div>
      )
    }
  }

  render() {
    return (
      <div className="messages">
        {this.getMessageView()}
      </div>
    )
  }
}

export default Messages;
