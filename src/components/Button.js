import React from 'react';
import '../sass/Button.scss';

class Button extends React.Component {
  render() {
    const { text, onMoreMessages, type } = this.props;
    return (
      <div className={type} onClick={onMoreMessages}>
        {text}
      </div>
    )
  }
}

export default Button;
