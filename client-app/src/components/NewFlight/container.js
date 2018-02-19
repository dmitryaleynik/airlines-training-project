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
import { confirmOrder, cancelOrder, } from 'src/actions/priceConfirmator';
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
  const { modal, } = state.modal;
  const { orderId, total, isConfirmed, } = state.priceConfirmator;
  return {
    currentStep,
    startedSteps,
    fulfilledSteps,
    isFlightFinderFetchng: state.flightFinder.isFetching,
    cities,
    straightFlight,
    reverseFlight,
    isReverseRequired,
    straightPlaces,
    reversePlaces,
    modal,
    orderId,
    total,
    isConfirmed,
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
  confirmOrder,
  cancelOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
