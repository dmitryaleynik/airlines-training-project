import React, { Component, } from 'react';
import classNames from 'classnames';
import FlightFinder from './FlightFinder';
import PlacePicker from './PlacePicker';
import PriceConfirmator from './PriceConfirmator';
import ButtonPanel from './ButtonPanel';
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
          getCities();
          break;
        case steps.PICKER:
          getPlaces(straightFlight.selectedId, STRAIGHT_PLACES);
          if (isReverseRequired) {
            getPlaces(reverseFlight.selectedId, REVERSE_PLACES);
          }
          break;
        case steps.CONFIRMATOR:
          const flightId = isReverseRequired
            ? `${straightFlight.selectedId}&${reverseFlight.selectedId}`
            : straightFlight.selectedId;
          const placesToBeBooked = {
            [STRAIGHT_FLIGHT]: straightPlaces.pickedPlaces,
          };
          if (isReverseRequired) {
            placesToBeBooked[REVERSE_FLIGHT] = reversePlaces.pickedPlaces;
          }
          bookTemporarily(flightId, placesToBeBooked);
          break;
        default:
          break;
      }
    }
  }

  findFlights = (e, directionName) => {
    const fields = e.target.elements;
    if (this.props.fulfilledSteps[steps.FINDER]) {
      this.props.setStepFulfillment(steps.FINDER, false);
    }
    this.props.findFlights(
      {
        cities: {
          from: fields['city-from'].value,
          to: fields['city-to'].value,
        },
        dates: {
          from: this.props[directionName].filters.dates.from,
          to: this.props[directionName].filters.dates.to,
        },
        numberOfTickets: fields['tickets'].value,
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
      orderId,
    } = this.props;
    const {
      findFlights,
      selectFlight,
      toggleReversePath,
      validatePlaces,
    } = this;

    const luggageLimit = {
      [STRAIGHT_PLACES]: this.getLuggageLimit(STRAIGHT_FLIGHT),
      [REVERSE_PLACES]: this.getLuggageLimit(REVERSE_FLIGHT),
    };
    const selectedIds = {
      [STRAIGHT_FLIGHT]: straightFlight.selectedId,
      [REVERSE_FLIGHT]: reverseFlight.selectedId,
    };

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
        straightFlight={straightFlight}
        reverseFlight={reverseFlight}
        straightPlaces={straightPlaces}
        reversePlaces={reversePlaces}
      />,
    ];
    return (
      <div className="new-flight">
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
    );
  }
}

export default NewFlight;
