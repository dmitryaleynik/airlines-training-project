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

class NewFlight extends Component<{}, State> {
  componentWillMount() {
    this.props.getCities();
  }

  componentWillUpdate(nextProps) {
    const {
      currentStep,
      getCities,
      getPlaces,
      flights,
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
          const flightId = {};
          for (let key in flights) {
            flightId[key] = flights[key].selectedId;
          }

          bookTemporarily(flightId);

          getPlaces(
            flights[directions.STRAIGHT].selectedId,
            directions.STRAIGHT
          );
          if (isReverseRequired) {
            getPlaces(
              flights[directions.REVERSE].selectedId,
              directions.REVERSE
            );
          }
          break;
        case steps.CONFIRMATOR:
          window.scroll(0, 0);
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
          (isReverseRequired && flights[directions.REVERSE].selectedId)
        ) {
          setStepFulfillment(steps.FINDER, true);
        }
      } else if (directionName === directions.REVERSE) {
        if (flights[directions.STRAIGHT].selectedId) {
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
      if (flights[directions.STRAIGHT].selectedId) {
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
      } else if (this.props.places[directions.REVERSE].isValid && isValid) {
        setStepFulfillment(steps.PICKER, true);
      } else {
        setStepFulfillment(steps.PICKER, false);
      }
    } else if (directionName === directions.REVERSE) {
      if (this.props.places[directions.STRAIGHT].isValid && isValid) {
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
    return this.props.flights[directions.STRAIGHT].selectedId
      ? this.props.flights[directions.STRAIGHT].flights.find(
          (flight) =>
            flight.id === this.props.flights[directions.STRAIGHT].selectedId
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
      [directions.STRAIGHT]: this.getLuggageLimit(directions.STRAIGHT),
      [directions.REVERSE]: this.getLuggageLimit(directions.REVERSE),
    };

    const selectedIds = {
      [directions.STRAIGHT]: flights[directions.STRAIGHT].selectedId,
      [directions.REVERSE]: flights[directions.REVERSE].selectedId,
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
