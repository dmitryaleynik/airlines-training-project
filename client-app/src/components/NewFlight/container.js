import { connect, } from 'react-redux';
import {
  handleNextClick,
  handleBackClick,
  setStep,
} from 'src/actions/newFlight';
import {
  getCities,
  changeDateStart,
  changeDateEnd,
  findFlights,
  selectFlight,
  toggleReversePath,
} from 'src/actions/flightFinder';
import { getPlaces, togglePlace, } from 'src/actions/placePicker';
import NewFlight from 'src/components/NewFlight';

const mapStateToProps = (state) => {
  const { currentStep, startedSteps, fulfilledSteps, } = state.newFlight;
  const {
    cities,
    straightFlight,
    reverseFlight,
    isReverseRequired,
  } = state.flightFinder;
  const { straightPlaces, reversePlaces, } = state.placePicker;
  return {
    currentStep,
    startedSteps,
    fulfilledSteps,
    cities,
    straightFlight,
    reverseFlight,
    isReverseRequired,
    straightPlaces,
    reversePlaces,
  };
};

const mapDispatchToProps = {
  handleBackClick,
  handleNextClick,
  setStep,
  getCities,
  changeDateStart,
  changeDateEnd,
  findFlights,
  selectFlight,
  toggleReversePath,
  getPlaces,
  togglePlace,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
