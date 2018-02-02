import { connect, } from 'react-redux';
import { handleNextClick, handleBackClick, } from 'src/actions/newFlight';
import { getCities, toggleHint, } from 'src/actions/flightFinder';
import NewFlight from 'src/components/NewFlight';

const mapStateToProps = (state) => {
  const { currentStep, startedSteps, fulfilledSteps, } = state.newFlight;
  const { cities, hints, } = state.flightFinder;
  return {
    cities,
    hints,
    currentStep,
    startedSteps,
    fulfilledSteps,
  };
};

const mapDispatchToProps = {
  handleBackClick,
  handleNextClick,
  getCities,
  toggleHint,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
