import { connect, } from 'react-redux';
import AuthRoute from 'src/components/AuthRoute';

const mapStateToProps = (state) => {
  const { token, } = state.user;
  return {
    token,
  };
};

export default connect(mapStateToProps)(AuthRoute);
