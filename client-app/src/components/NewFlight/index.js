import React, { Component, } from 'react';
import classNames from 'classnames';
import FlightFinder from './FlightFinder';
import PlacePicker from './PlacePicker';
import PriceConfirmator from './PriceConfirmator';
import ButtonPanel from './ButtonPanel';
import Modal from 'src/components/Modal/container';
import Loader from 'src/components/Loader';
import {
  steps,
  STRAIGHT_FLIGHT,
  REVERSE_FLIGHT,
  STRAIGHT_PLACES,
  REVERSE_PLACES,
} from 'src/imports';

import './styles.scss';

class NewFlight extends Component<{}, State> {
  componentWillMount() {
    this.props.getCities();
  }

  componentWillUpdate(nextProps) {
    const {
      currentStep,
      getCities,
      getPlaces,
      straightFlight,
      reverseFlight,
      straightPlaces,
      reversePlaces,
      isReverseRequired,
      bookTemporarily,
    } = this.props;
    if (currentStep !== nextProps.currentStep) {
      switch (nextProps.currentStep) {
        case steps.FINDER:
          window.scroll(0, 0);
          getCities();
          break;
        case steps.PICKER:
          window.scroll(0, 0);
          getPlaces(straightFlight.selectedId, STRAIGHT_PLACES);
          if (isReverseRequired) {
            getPlaces(reverseFlight.selectedId, REVERSE_PLACES);
          }
          break;
        case steps.CONFIRMATOR:
          window.scroll(0, 0);
          const flightId = isReverseRequired
            ? `${straightFlight.selectedId}&${reverseFlight.selectedId}`
            : straightFlight.selectedId;
          const placesToBeBooked = {
            [STRAIGHT_FLIGHT]: straightPlaces.pickedPlaces,
          };
          const luggage = {
            [STRAIGHT_FLIGHT]: straightPlaces.luggageKg,
          };
          if (isReverseRequired) {
            placesToBeBooked[REVERSE_FLIGHT] = reversePlaces.pickedPlaces;
            luggage[STRAIGHT_FLIGHT] = reversePlaces.luggageKg;
          }
          bookTemporarily(flightId, placesToBeBooked, luggage);
          break;
        default:
          break;
      }
    }
  }

  componentWillUnmount = () => {
    this.props.resetNewFlight();
    this.props.closeModal();
  };

  findFlights = (values, foo, { directionName, }) => {
    if (this.props.fulfilledSteps[steps.FINDER]) {
      this.props.setStepFulfillment(steps.FINDER, false);
    }
    this.props.findFlights(
      {
        cities: {
          from: values['city-from'],
          to: values['city-to'],
        },
        dates: {
          from: this.props[directionName].filters.dates.from,
          to: this.props[directionName].filters.dates.to,
        },
        seats: values['seats'],
      },
      directionName
    );
  };

  selectFlight = (id, directionName) => {
    const {
      selectFlight,
      fulfilledSteps,
      isReverseRequired,
      straightFlight,
      reverseFlight,
      setStepFulfillment,
    } = this.props;
    selectFlight(id, directionName);
    if (!fulfilledSteps[steps.FINDER]) {
      if (directionName === STRAIGHT_FLIGHT) {
        if (
          !isReverseRequired ||
          (isReverseRequired && reverseFlight.selectedId)
        ) {
          setStepFulfillment(steps.FINDER, true);
        }
      } else if (directionName === REVERSE_FLIGHT) {
        if (straightFlight.selectedId) {
          setStepFulfillment(steps.FINDER, true);
        }
      }
    }
    return;
  };

  toggleReversePath = () => {
    const {
      toggleReversePath,
      isReverseRequired,
      setStepFulfillment,
      straightFlight,
    } = this.props;
    toggleReversePath();
    if (!isReverseRequired) {
      setStepFulfillment(steps.FINDER, false);
    } else {
      if (straightFlight.selectedId) {
        setStepFulfillment(steps.FINDER, true);
      } else {
        setStepFulfillment(steps.FINDER, false);
      }
    }
  };

  validatePlaces = (isValid, directionName) => {
    const {
      validatePlaces,
      setStepFulfillment,
      isReverseRequired,
    } = this.props;
    validatePlaces(isValid, directionName);
    if (directionName === STRAIGHT_PLACES) {
      if (!isReverseRequired) {
        setStepFulfillment(steps.PICKER, isValid);
      } else if (this.props[REVERSE_PLACES].isValid && isValid) {
        setStepFulfillment(steps.PICKER, true);
      } else {
        setStepFulfillment(steps.PICKER, false);
      }
    } else if (directionName === REVERSE_PLACES) {
      if (this.props[STRAIGHT_PLACES].isValid && isValid) {
        setStepFulfillment(steps.PICKER, true);
      } else {
        setStepFulfillment(steps.PICKER, false);
      }
    }
  };

  confirmOrder = (id) => {
    this.props.confirmOrder(id);
    setTimeout(() => {
      this.props.history.push('/');
    }, 3000);
  };

  cancelOrder = (id) => {
    this.props.cancelOrder(id);
    this.props.history.push('/user-page');
  };

  getLuggageLimit = (directionName) => {
    return this.props[directionName].selectedId
      ? this.props[directionName].flights.find(
          (flight) => flight.id === this.props[directionName].selectedId
        ).luggage.maxKg
      : null;
  };

  render() {
    const {
      startedSteps,
      fulfilledSteps,
      currentStep,
      cities,
      straightFlight,
      reverseFlight,
      isReverseRequired,
      handleBackClick,
      handleNextClick,
      changeDateStart,
      changeDateEnd,
      straightPlaces,
      reversePlaces,
      toggleLuggageRequirement,
      changeLuggageAmount,
      togglePlace,
      modal,
      openModal,
      orderId,
      total,
      isFlightFinderFetching,
    } = this.props;
    const {
      findFlights,
      selectFlight,
      toggleReversePath,
      validatePlaces,
      confirmOrder,
      cancelOrder,
    } = this;

    const luggageLimit = {
      [STRAIGHT_PLACES]: this.getLuggageLimit(STRAIGHT_FLIGHT),
      [REVERSE_PLACES]: this.getLuggageLimit(REVERSE_FLIGHT),
    };
    const selectedIds = {
      [STRAIGHT_FLIGHT]: straightFlight.selectedId,
      [REVERSE_FLIGHT]: reverseFlight.selectedId,
    };

    const isFetching = isFlightFinderFetching || false;

    const renderredComponents = [
      <FlightFinder
        cities={cities}
        straightFlight={straightFlight}
        reverseFlight={reverseFlight}
        isReverseRequired={isReverseRequired}
        changeDateStart={changeDateStart}
        changeDateEnd={changeDateEnd}
        onReverseClick={toggleReversePath}
        onSubmit={findFlights}
        selectFlight={selectFlight}
      />,
      <PlacePicker
        isReverseRequired={isReverseRequired}
        selectedIds={selectedIds}
        straightPlaces={straightPlaces}
        reversePlaces={reversePlaces}
        togglePlace={togglePlace}
        toggleLuggageRequirement={toggleLuggageRequirement}
        luggageLimit={luggageLimit}
        onLuggageChange={changeLuggageAmount}
        validate={validatePlaces}
      />,
      <PriceConfirmator
        orderId={orderId}
        totalPrice={total}
        isReverseRequired={isReverseRequired}
        straightFlight={straightFlight}
        reverseFlight={reverseFlight}
        straightPlaces={straightPlaces}
        reversePlaces={reversePlaces}
        confirmOrder={confirmOrder}
        cancelOrder={cancelOrder}
        openModal={openModal}
      />,
    ];
    return (
      <div className="new-flight">
        {modal && <Modal modal={modal} />}
        {isFetching && <Loader />}
        {!isFetching && (
          <div>
            <div className="row">
              {startedSteps.map((step, index) => {
                return (
                  <div
                    key={index}
                    className={classNames('col-sm-4 status-bar', {
                      'prev-step': step,
                      'following-step': !step,
                    })}
                  />
                );
              })}
            </div>
            {renderredComponents[currentStep]}
            <ButtonPanel
              onBackClick={handleBackClick}
              onNextClick={handleNextClick}
              currentStep={currentStep}
              fulfilledSteps={fulfilledSteps}
            />
          </div>
        )}
      </div>
    );
  }
}

export default NewFlight;
