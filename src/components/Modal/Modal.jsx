import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalWindow } from './Modal.styled';

const portal = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    activeimageURL: PropTypes.string,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <ModalOverlay onClick={this.handleBackdrop}>
        <ModalWindow>
          <img src={this.props.activeimageURL} alt="modal url" />
        </ModalWindow>
      </ModalOverlay>,
      portal
    );
  }
}
