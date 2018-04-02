import React, { Component, } from 'react';
import classNames from 'classnames';
import FlightFinder from './FlightFinder';
import PlacePicker from './PlacePicker';
import OrderInfo from 'src/components/OrderInfo/container';
import ButtonPanel from './ButtonPanel';
import Modal from 'src/components/Modal/container';
import Loader from 'src/components/Loader';
import { steps, directions, } from 'src/imports';

import './styles.scss';

class NewFlight extends Component {
  componentWillMount() {
    this.props.getCities();
  }

  componentWillUpdate(nextProps) {
    const {
      currentStep,
      getCities,
      getPlaces,
      flights,
      places,
      isReverseRequired,
      bookTemporarily,
      orderId,
      addLuggageToBooking,
    } = this.props;
    if (currentStep !== nextProps.currentStep) {
      switch (nextProps.currentStep) {
        case steps.FINDER:
          window.scroll(0, 0);
          getCities();
          break;
        case steps.PICKER:
          window.scroll(0, 0);
          const flightsId = {};
          for (let key in flights) {
            flightsId[key] = flights[key].selectedId;
          }
          bookTemporarily(flightsId);
          getPlaces(
            flights.straight.selectedId,
            directions.STRAIGHT
          );
          if (isReverseRequired) {
            getPlaces(
              flights.reverse.selectedId,
              directions.REVERSE
            );
          }
          break;
        case steps.CONFIRMATOR:
          window.scroll(0, 0);
          for (let key in places) {
            if (places[key].isLuggageRequired) {
              addLuggageToBooking(
                orderId,
                flights[key].selectedId,
                places[key].luggageKg
              );
            }
          }
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
          from: this.props.flights[directionName].filters.dates.from,
          to: this.props.flights[directionName].filters.dates.to,
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
      flights,
      setStepFulfillment,
    } = this.props;
    selectFlight(id, directionName);
    if (!fulfilledSteps[steps.FINDER]) {
      if (directionName === directions.STRAIGHT) {
        if (
          !isReverseRequired ||
          (isReverseRequired && flights.reverse.selectedId)
        ) {
          setStepFulfillment(steps.FINDER, true);
        }
      } else if (directionName === directions.REVERSE) {
        if (flights.straight.selectedId) {
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
      flights,
    } = this.props;
    toggleReversePath();
    if (!isReverseRequired) {
      setStepFulfillment(steps.FINDER, false);
    } else {
      if (flights.straight.selectedId) {
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
    if (directionName === directions.STRAIGHT) {
      if (!isReverseRequired) {
        setStepFulfillment(steps.PICKER, isValid);
      } else if (this.props.places.reverse.isValid && isValid) {
        setStepFulfillment(steps.PICKER, true);
      } else {
        setStepFulfillment(steps.PICKER, false);
      }
    } else if (directionName === directions.REVERSE) {
      if (this.props.places.straight.isValid && isValid) {
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
    this.props.history.push('/orders');
  };

  getLuggageLimit = (directionName) => {
    return this.props.flights.straight.selectedId
      ? this.props.flights.straight.flights.find(
        (flight) =>
          flight.id === this.props.flights.straight.selectedId
      ).luggage.maxKg
      : null;
  };

  render() {
    const {
      startedSteps,
      fulfilledSteps,
      currentStep,
      cities,
      flights,
      places,
      isReverseRequired,
      handleBackClick,
      handleNextClick,
      changeDateStart,
      changeDateEnd,
      toggleLuggageRequirement,
      changeLuggageAmount,
      togglePlace,
      modal,
      orderId,
      isFlightFinderFetching,
      isPlacePickerFetching,
      isPriceConfirmatorFetching,
      match,
      history,
    } = this.props;
    const {
      findFlights,
      selectFlight,
      toggleReversePath,
      validatePlaces,
    } = this;

    const luggageLimit = {
      straight: this.getLuggageLimit(directions.STRAIGHT),
      reverse: this.getLuggageLimit(directions.REVERSE),
    };

    const selectedIds = {
      straight: flights.straight.selectedId,
      reverse: flights.reverse.selectedId,
    };

    const isFetching =
      isFlightFinderFetching ||
      isPlacePickerFetching ||
      isPriceConfirmatorFetching ||
      false;

    const renderredComponents = [
      <FlightFinder
        cities={cities}
        flights={flights}
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
        places={places}
        togglePlace={togglePlace}
        toggleLuggageRequirement={toggleLuggageRequirement}
        luggageLimit={luggageLimit}
        onLuggageChange={changeLuggageAmount}
        validate={validatePlaces}
      />,
      <OrderInfo orderId={orderId} match={match} history={history} />,
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
