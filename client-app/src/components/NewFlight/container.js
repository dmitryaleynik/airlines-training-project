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
  bookTemporarily,
} from 'src/actions/placePicker';
import { confirmOrder, } from 'src/actions/priceConfirmator';
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
  const { orderId, total, isConfirmed, } = state.priceConfirmator;
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
    orderId,
    total,
    isConfirmed,
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
  bookTemporarily,
  confirmOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
