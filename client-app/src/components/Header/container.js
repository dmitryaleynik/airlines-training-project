import { connect, } from 'react-redux';
import { logout, } from 'src/actions/authorization';
import Header from 'src/components/Header';

const mapStateToProps = (state) => {
  const { token, } = state.user;
  return {
    token,
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
