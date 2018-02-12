import { connect, } from 'react-redux';
import { openModal, closeModal, } from 'src/actions/modals';
import Modal from 'src/components/Modal';

const mapStateToProps = (state) => {
  return {
    modals: state.modals.modals,
  };
};

const mapDispatchToProps = {
  openModal,
  closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
