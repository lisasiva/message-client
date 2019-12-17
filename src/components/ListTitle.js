import React from 'react';
import '../sass/Messages.scss';

const MessagesTitle= ({ title }) => {
  return (
    <div className="list__title">
      <p>{title}</p>
    </div>
  )
}

export default MessagesTitle;
