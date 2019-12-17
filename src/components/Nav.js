import React from 'react';
import NavOption from './NavOption';
import '../sass/Nav.scss';

const Nav = ({ view, inboxCount, deletedCount, onViewChange }) => {
  return (
    <div className="nav">
      <div className="nav__icon-box">
        <div className="nav__icon"></div>
      </div>
      <div className="nav__options">
        <NavOption
          active={ view === 'inbox' }
          text="Inbox"
          type="inbox"
          count={inboxCount}
          onViewChange={onViewChange}
        />
        <NavOption
          active={ view === 'trash' }
          text="Trash"
          type="trash"
          count={deletedCount}
          onViewChange={onViewChange}
        />
      </div>
      <div className="nav__footer">
        This is a take-home project by Lisa Siva for Modern Health. Thanks for taking the time to review it! Icons courtesy of <a href="https://fontawesome.com/license" className="link--inline">Font Awesome</a>.
      </div>
    </div>
  )
}

export default Nav;
