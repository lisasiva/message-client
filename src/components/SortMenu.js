import React from 'react';
import '../sass/SortMenu.scss';

class SortMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sortBy: 'recent' };
  }

  onOptionClick(option) {
    if (option !== this.state.sortBy) {
      this.setState({ sortBy: option });
    }
    this.props.onSort(option);
  };

  renderMenu() {
    const { sortBy } = this.state;
    const { text } = this.props;
    if (text === 'Deleted messages:') {
      return (
        <div className="sort-menu">
          <div className="sort-menu__title">{text}</div>
        </div>
      )
    } else {
      return (
        <div className="sort-menu">
          <div className="sort-menu__title">{text}</div>
          <div
            className={sortBy === 'recent' ? 'sort-menu__option sort-menu__option--active' : 'sort-menu__option'}
            onClick={() => { this.onOptionClick('recent') }}>
              Most recent
          </div>
          <div
            className={sortBy === 'oldest' ? 'sort-menu__option sort-menu__option--active' : 'sort-menu__option'}
            onClick={() => { this.onOptionClick('oldest') }}>
            Oldest
          </div>
        </div>
      )
    }
  }

  render() {
    return this.renderMenu();
  }
}

export default SortMenu;
