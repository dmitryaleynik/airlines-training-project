import { connect, } from 'react-redux';
import { getOrderInfo, } from 'src/actions/orders';
import { cancelOrder, confirmOrder, } from 'src/actions/priceConfirmator';
import { openModal, closeModal, } from 'src/actions/modal';
import OrderInfo from 'src/components/OrderInfo';

const mapStateToProps = (state) => {
  const { selectedOrder, isFetching, } = state.orders;
  const { modal, } = state.modal;
  return {
    order: selectedOrder,
    modal,
    isFetching,
  };
};

const mapDispatchToProps = {
  getOrderInfo,
  cancelOrder,
  confirmOrder,
  openModal,
  closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);
