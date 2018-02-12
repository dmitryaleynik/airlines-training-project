import { connect, } from 'react-redux';
import {
  handleNextClick,
  handleBackClick,
  setStepFulfillment,
} from 'src/actions/newFlight';
import {
  getCities,
  changeDateStart,
  changeDateEnd,
  findFlights,
  selectFlight,
  toggleReversePath,
} from 'src/actions/flightFinder';
import {
  getPlaces,
  togglePlace,
  toggleLuggageRequirement,
  changeLuggageAmount,
  validatePlaces,
} from 'src/actions/placePicker';
import { openModal, } from 'src/actions/modals';
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
  const { modal, } = state.modals;
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
    modal,
  };
};

const mapDispatchToProps = {
  handleBackClick,
  handleNextClick,
  setStepFulfillment,
  getCities,
  changeDateStart,
  changeDateEnd,
  findFlights,
  selectFlight,
  toggleReversePath,
  getPlaces,
  togglePlace,
  toggleLuggageRequirement,
  changeLuggageAmount,
  validatePlaces,
  openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
