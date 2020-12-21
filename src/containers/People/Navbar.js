import React, { Component } from 'react'
import { Menu, Button, Icon } from 'semantic-ui-react'

export default class Navbar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable>
        <Menu.Item
          name='editorials'
          active={activeItem === 'editorials'}
          style={{fontWeight:"800"}}
          onClick={this.handleItemClick}
        >
        <Icon name='medkit' /> Caseworker
        </Menu.Item>

        <Menu.Item
          name='reviews'
          active={activeItem === 'reviews'}
          onClick={this.handleItemClick}
        >
          About
        </Menu.Item>

        <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          onClick={this.handleItemClick}
        >
          Upcoming Events
        </Menu.Item>

        <Menu.Item position="right">
           <Button floated="right"> Contact Us </Button>
        </Menu.Item>

      </Menu>
    )
  }
}