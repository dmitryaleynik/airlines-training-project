import React, { Component, } from 'react';
import classNames from 'classnames';
import FlightFinder from './FlightFinder';
import PlacePicker from './PlacePicker';
// import PriceConfirmator from './PriceConfirmator';
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
    if (this.props.currentStep !== nextProps.currentStep) {
      switch (nextProps.currentStep) {
        case 0:
          this.props.getCities();
          break;
        case 1:
          this.props.getPlaces(
            this.props.straightFlight.selectedId,
            STRAIGHT_PLACES
          );
          if (this.props.isReverseRequired) {
            this.props.getPlaces(
              this.props.reverseFlight.selectedId,
              REVERSE_PLACES
            );
          }
          break;
        default:
          return;
      }
    }
  }

  findFlights = (e, directionName) => {
    const fields = e.target.elements;
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
    this.props.selectFlight(id, directionName);
    if (directionName === STRAIGHT_FLIGHT) {
      if (
        !this.props.isReverseRequired ||
        (this.props.isReverseRequired && this.props.reverseFlight.selectedId)
      ) {
        this.props.setStepFulfillment(steps.FINDER, true);
      }
    } else if (directionName === REVERSE_FLIGHT) {
      if (this.props.straightFlight.selectedId) {
        this.props.setStepFulfillment(steps.FINDER, true);
      }
    }
    return;
  };

  toggleReversePath = () => {
    this.props.toggleReversePath();
    if (!this.props.isReverseRequired) {
      this.props.setStepFulfillment(steps.FINDER, false);
    } else {
      if (this.props.straightFlight.selectedId) {
        this.props.setStepFulfillment(steps.FINDER, true);
      } else {
        this.props.setStepFulfillment(steps.FINDER, false);
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
      togglePlace,
      toggleLuggageRequirement,
    } = this.props;
    const { findFlights, selectFlight, toggleReversePath, } = this;

    const luggageLimit = {
      [STRAIGHT_PLACES]: this.getLuggageLimit(STRAIGHT_FLIGHT),
      [REVERSE_PLACES]: this.getLuggageLimit(REVERSE_FLIGHT),
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
        straightPlaces={straightPlaces}
        reversePlaces={reversePlaces}
        togglePlace={togglePlace}
        toggleLuggage={toggleLuggageRequirement}
        luggageLimit={luggageLimit}
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
