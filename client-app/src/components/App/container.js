import { connect, } from 'react-redux';
import App from 'src/components/App';

const mapStateToProps = (state) => {
  const { token, } = state.user;
  return {
    token,
  };
};

export default connect(mapStateToProps)(App);
