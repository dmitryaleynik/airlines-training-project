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
} from 'src/actions/flightFinder';
import NewFlight from 'src/components/NewFlight';

const mapStateToProps = (state) => {
  const { currentStep, startedSteps, fulfilledSteps, } = state.newFlight;
  const {
    cities,
    filters,
    flights,
    isSearched,
    selectedId,
  } = state.flightFinder;
  return {
    currentStep,
    startedSteps,
    fulfilledSteps,
    cities,
    filters,
    flights,
    isSearched,
    selectedId,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
