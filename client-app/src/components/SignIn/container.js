import { connect, } from 'react-redux';
import { authorize, } from 'src/actions/authorization';
import SignIn from 'src/components/SignIn';

const mapStateToProps = (state) => {
  const { isFetching, isSuccess, errorMessage, } = state.signIn;
  return {
    isFetching,
    isSuccess,
    errorMessage,
  };
};

const mapDispatchToProps = {
  authorize,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
