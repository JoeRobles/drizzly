import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Modal extends Component {
  render() {
    if (this.props.isOpen) {
      return (
        <ReactCSSTransitionGroup
          transitionName={this.props.transitionName}
          transitionLeaveTimeout={700}
          transitionEnterTimeout={700}>
          <div className="modal">
            {this.props.children}
          </div>
        </ReactCSSTransitionGroup>
      );
    } else {
      return (
        <ReactCSSTransitionGroup
          transitionName={this.props.transitionName}
          transitionLeaveTimeout={700}
          transitionEnterTimeout={700}>
        </ReactCSSTransitionGroup>
      );
    }
  }
}

export default Modal;
