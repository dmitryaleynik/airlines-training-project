import React, { Component, } from 'react';
import classNames from 'classnames';
import FlightFinder from './FlightFinder';
// import PlacePicker from './PlacePicker';
// import PriceConfirmator from './PriceConfirmator';
import ButtonPanel from './ButtonPanel';
import { steps, STRAIGHT_FLIGHT, REVERSE_FLIGHT, } from 'src/imports';

import './styles.scss';

class NewFlight extends Component<{}, State> {
  componentWillMount() {
    this.props.getCities();
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
    } = this.props;
    const { findFlights, selectFlight, toggleReversePath, } = this;
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
