import React, { Component } from "react";
//import Widgets from './Widgets'
import PropTypes from "prop-types";
//import axios from 'axios';
/* import OmdbSummary from './OmdbSummary';
import OmdbActors from './OmdbActors';
import News from './News';
import MapContainer from './Map';*/
import Reorder, {
  reorder,
  reorderImmutable,
  reorderFromTo,
  reorderFromToImmutable,
} from "react-reorder";

class Dashboard extends Component {
  render() {
    // console.log(this.props.widgets)

    return (
      <Reorder
        className="d-flex flex-row flex-wrap justify-content-around align-self-start"
        reorderId="my-list" // Unique ID that is used internally to track this list (required)
        component="div" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
        draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
        holdTime={500} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
        touchHoldTime={500} // Hold time before dragging begins on touch devices (optional), defaults to holdTime
        mouseHoldTime={200} // Hold time before dragging begins with mouse (optional), defaults to holdTime
        onReorder={this.props.onReorder.bind(this)} // Callback when an item is dropped (you will need this to update your state)
        autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
        disabled={false} // Disable reordering (optional), defaults to false
        disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
        placeholder={
          <div className="custom-placeholder" /> // Custom placeholder element (optional), defaults to clone of dragged element
        }
      >
        {this.props.widgets.map((widget) => (
          <div key={widget.id}>{widget.cmp}</div>
        ))}
      </Reorder>
    );
  }
}

Dashboard.propTypes = {
  widgets: PropTypes.array.isRequired,
  deleteWidget: PropTypes.func.isRequired,
  updateWidget: PropTypes.func.isRequired,
};

export default Dashboard;
