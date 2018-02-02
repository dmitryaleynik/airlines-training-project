import { connect, } from 'react-redux';
import { handleNextClick, handleBackClick, } from 'src/actions/newFlight';
import { getCities, } from 'src/actions/flightFinder';
import NewFlight from 'src/components/NewFlight';

const mapStateToProps = (state) => {
  const { currentStep, startedSteps, fulfilledSteps, } = state.newFlight;
  const { cities, } = state.flightFinder;
  return {
    cities,
    currentStep,
    startedSteps,
    fulfilledSteps,
  };
};

const mapDispatchToProps = {
  getCities,
  handleBackClick,
  handleNextClick,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
