import { connect, } from 'react-redux';
import { closeModal, } from 'src/actions/modal';
import Modal from 'src/components/Modal';

const mapDispatchToProps = {
  closeModal,
};

export default connect(null, mapDispatchToProps)(Modal);
