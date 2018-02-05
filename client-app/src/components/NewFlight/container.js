import { connect, } from 'react-redux';
import { handleNextClick, handleBackClick, } from 'src/actions/newFlight';
import {
  getCities,
  changeDateStart,
  changeDateEnd,
} from 'src/actions/flightFinder';
import NewFlight from 'src/components/NewFlight';

const mapStateToProps = (state) => {
  const { currentStep, startedSteps, fulfilledSteps, } = state.newFlight;
  const { cities, dates, } = state.flightFinder;
  return {
    cities,
    dates,
    currentStep,
    startedSteps,
    fulfilledSteps,
  };
};

const mapDispatchToProps = {
  handleBackClick,
  handleNextClick,
  getCities,
  changeDateStart,
  changeDateEnd,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
