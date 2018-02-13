import { connect, } from 'react-redux';
import { getOrderInfo, } from 'src/actions/orders';
import { cancelOrder, confirmOrder, } from 'src/actions/priceConfirmator';
import OrderInfo from 'src/components/OrderInfo';

const mapStateToProps = (state) => {
  const { selectedOrder, } = state.orders;
  return {
    order: selectedOrder,
  };
};

const mapDispatchToProps = {
  getOrderInfo,
  cancelOrder,
  confirmOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);
