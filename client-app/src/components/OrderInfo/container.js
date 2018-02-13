import { connect, } from 'react-redux';
import { getOrderInfo, } from 'src/actions/orders';
import OrderInfo from 'src/components/OrderInfo';

const mapStateToProps = (state) => {
  return {
    order: state.orders.order,
  };
};

const mapDispatchToProps = {
  getOrderInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);
