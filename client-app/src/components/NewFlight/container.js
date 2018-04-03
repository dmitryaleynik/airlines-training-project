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
  addLuggageToBooking,
} from 'src/actions/placePicker';
import { openModal, closeModal, } from 'src/actions/modal';
import { directions, } from 'src/imports';
import NewFlight from 'src/components/NewFlight';

const mapStateToProps = (state) => {
  const { currentStep, startedSteps, fulfilledSteps, } = state.newFlight;
  const { cities, isReverseRequired, } = state.flightFinder;
  const flights = {
    [directions.STRAIGHT]: state.flightFinder[directions.STRAIGHT],
    [directions.REVERSE]: state.flightFinder[directions.REVERSE],
  };
  const places = {
    [directions.STRAIGHT]: state.placePicker[directions.STRAIGHT],
    [directions.REVERSE]: state.placePicker[directions.REVERSE],
  };
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
    flights,
    places,
    isReverseRequired,
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
  addLuggageToBooking,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
