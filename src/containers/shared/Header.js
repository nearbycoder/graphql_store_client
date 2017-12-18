import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Button,
  NavbarDivider,
  Popover,
  Menu,
  MenuItem,
  MenuDivider,
  Position
} from '@blueprintjs/core';
import { connect } from 'redux-zero/react';
import actions from '../../actions';

class Header extends Component {
  handleChange = e => {
    this.props.setSearchText(e.target.value);
  };

  render() {
    return (
      <Navbar className="pt-dark">
        <NavbarGroup>
          <NavbarHeading>Graphql Store</NavbarHeading>
          <input
            className="pt-input"
            placeholder="Search Products..."
            type="text"
            defaultValue={this.props.search}
            onChange={this.handleChange}
          />
        </NavbarGroup>
        <NavbarGroup align="right">
          <Button className="pt-minimal" iconName="home">
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
              Products
            </Link>
          </Button>
          <Button className="pt-minimal" iconName="add-to-artifact">
            Cart
          </Button>
          <NavbarDivider />
          <Popover
            content={
              <Menu>
                <MenuItem iconName="people" text="Login" />
                <MenuItem iconName="map" text="Map" />
                <MenuDivider />
                <MenuItem iconName="people" text="Settings...">
                  <MenuItem
                    iconName="add"
                    text="Add new application"
                    disabled={true}
                  />
                  <MenuItem iconName="remove" text="Remove application" />
                </MenuItem>
              </Menu>
            }
            position={Position.BOTTOM_RIGHT}>
            <Button className="pt-minimal" iconName="user" />
          </Popover>
        </NavbarGroup>
      </Navbar>
    );
  }
}

const mapToProps = ({ search }) => ({ search });
export default connect(mapToProps, actions)(Header);
