import React from 'react';
import '../sass/SortMenu.scss';

class SortMenu extends React.Component {
  // Sets "Most recent" as the default, active option
  constructor(props) {
    super(props);
    this.state = { sortBy: 'recent' };
  }

  // When sort order changes, update state on this and App component
  onOptionClick(option) {
    if (option !== this.state.sortBy) {
      this.setState({ sortBy: option });
    }
    this.props.onSort(option);
  };


  render() {
    const { sortBy } = this.state;
    const { text } = this.props;
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

export default SortMenu;
