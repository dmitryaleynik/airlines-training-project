import { connect, } from 'react-redux';
import {
  handleNextClick,
  handleBackClick,
  setStepFulfillment,
  resetNewFlight,
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
  bookTemporarily,
} from 'src/actions/placePicker';
import { openModal, closeModal, } from 'src/actions/modal';
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
  const { orderId, } = state.priceConfirmator;
  const { modal, } = state.modal;
  return {
    currentStep,
    startedSteps,
    fulfilledSteps,
    isFlightFinderFetching: state.flightFinder.isFetching,
    isPlacePickerFetching: state.placePicker.isFetching,
    isPriceConfirmatorFetching: state.priceConfirmator.isFetching,
    cities,
    straightFlight,
    reverseFlight,
    isReverseRequired,
    straightPlaces,
    reversePlaces,
    modal,
    orderId,
  };
};

const mapDispatchToProps = {
  handleBackClick,
  handleNextClick,
  setStepFulfillment,
  resetNewFlight,
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
  closeModal,
  bookTemporarily,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
