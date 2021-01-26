import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


export class Widgets extends Component {

  getStyle = () => {
    return {
      backgroundColor: this.props.widgets.selected ? '#1D99BB' : '#BB1D85',
      padding: '20px'
    }
  }

  render() {

    return <DropdownButton variant="success" id="dropdown-basic-button" title="Ajouter un widget">
      {this.props.widgets.map((widget) => (
        <div className="" key={widget.id}>
          <Dropdown.Item onClick={this.props.addWidget.bind(this, widget.componentName)}>{widget.name}</Dropdown.Item>
        </div>))}
    </DropdownButton>
  }

}

Widgets.propTypes = {
  widgets: PropTypes.array.isRequired,
  addWidget: PropTypes.func.isRequired
}


export default Widgets
