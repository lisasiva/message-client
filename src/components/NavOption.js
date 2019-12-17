import React from 'react';
import '../sass/Nav.scss';

const NavOption = ({ active, text, type, count, onViewChange }) => {
  return (
    <div className={`nav__option ${active ? 'active' : null}`} onClick={() => onViewChange(type)}>
      <div className={`option__icon option__icon--${type}`}></div>
      <div className="option__name">{text}</div>
      <div className="option__count"><p>{count}</p></div>
    </div>
  )
}

export default NavOption;
