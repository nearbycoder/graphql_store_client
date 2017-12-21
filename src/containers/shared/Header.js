import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'redux-zero/react';
import actions from '../../actions';

class Header extends Component {
  handleChange = e => {
    this.props.setSearchText(e.target.value);
  };

  render() {
    const { user } = this.props;
    return (
      <nav>
        Graphql Store
        <input
          placeholder="Search Products..."
          type="text"
          defaultValue={this.props.search}
          onChange={this.handleChange}
        />
      </nav>
    );
  }
}

const mapToProps = ({ search }) => ({ search });
export default connect(mapToProps, actions)(Header);
