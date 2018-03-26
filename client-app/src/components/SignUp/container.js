import { connect, } from 'react-redux';
import { register, } from 'src/actions/registration';
import SignUp from 'src/components/SignUp';

const mapStateToProps = (state) => {
  const { isFetching, isSuccess, errorMessage, } = state.signUp;
  return {
    isFetching,
    isSuccess,
    errorMessage,
  };
};

const mapDispatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
