import { connect, } from 'react-redux';
import { getAllOrders, } from 'src/actions/orders';
import { toggleDropdown, setFilter, } from 'src/actions/dropdown';
import UserPage from 'src/components/UserPage';

const mapStateToProps = (state) => {
  const { orders, filter, isDropdownToggled, } = state.orders;
  return {
    orders,
    filter,
    isDropdownToggled,
  };
};

const mapDispatchToProps = {
  getAllOrders,
  toggleDropdown,
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
