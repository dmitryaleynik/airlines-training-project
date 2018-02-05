import { connect, } from 'react-redux';
import {
  handleNextClick,
  handleBackClick,
  fulfillStep,
} from 'src/actions/newFlight';
import {
  getCities,
  changeDateStart,
  changeDateEnd,
  findFlights,
  selectFlight,
  toggleReversePath,
} from 'src/actions/flightFinder';
import NewFlight from 'src/components/NewFlight';

const mapStateToProps = (state) => {
  const { currentStep, startedSteps, fulfilledSteps, } = state.newFlight;
  const {
    cities,
    straightFlight,
    reverseFlight,
    isReverseRequired,
  } = state.flightFinder;
  return {
    currentStep,
    startedSteps,
    fulfilledSteps,
    cities,
    straightFlight,
    reverseFlight,
    isReverseRequired,
  };
};

const mapDispatchToProps = {
  handleBackClick,
  handleNextClick,
  fulfillStep,
  getCities,
  changeDateStart,
  changeDateEnd,
  findFlights,
  selectFlight,
  toggleReversePath,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
