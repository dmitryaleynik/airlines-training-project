import React, { Component, } from 'react';
import classNames from 'classnames';
import FlightFinder from './FlightFinder';
import PlacePicker from './PlacePicker';
import ButtonPanel from './ButtonPanel';
import { immutableSplice, immutablePush, } from 'src/utils/helpers';

import './styles.css';

type State = {
  stepsStarted: Array<boolean>,
  stepsFulfilled: Array<boolean>,
  currentStep: number,
};

class NewFlight extends Component<{}, State> {
  constructor() {
    super();
    this.state = {
      places: [],
      pickedPlaces: [],
      stepsStarted: [true, true, false,], // don't forget to change to initial state!!!!!!!!!!!!!!!!!!!!!!!!!
      stepsFulfilled: [false, false, false,],
      currentStep: 1, // don't forget to set back to 0!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      isLuggage: false,
      luggageWeight: null,
    };
    for (let i = 1; i <= 30; ++i) {
      this.state.places.push({
        number: i,
        isAvailable: true,
      });
    }
  }

  findFlight = (id: string) => {
    const { stepsFulfilled, } = this.state;
    if (id) {
      this.setState({
        stepsFulfilled: immutableSplice(stepsFulfilled, 0, 1, true),
      });
    }
  };

  checkSecondStepFulfillment = (places, isLuggage, luggageWeight) => {
    if (!places.length) {
      return false;
    }
    if (isLuggage && (!luggageWeight || !Number(luggageWeight))) {
      return false;
    }
    return true;
  };

  handlePlaceClick = (e) => {
    const {
      places,
      pickedPlaces,
      stepsFulfilled,
      isLuggage,
      luggageWeight,
    } = this.state;
    const pickedPlace = places[e.target.innerHTML - 1];
    let newPickedPlaces = [],
      isStepFulfilled = false;
    if (pickedPlace.isAvailable) {
      newPickedPlaces = immutablePush(pickedPlaces, pickedPlace.number);
    } else {
      let index = pickedPlaces.indexOf(pickedPlace.number);
      newPickedPlaces = immutableSplice(pickedPlaces, index, 1);
    }
    isStepFulfilled = this.checkSecondStepFulfillment(
      newPickedPlaces,
      isLuggage,
      luggageWeight
    );
    this.setState({
      places: immutableSplice(places, pickedPlace.number - 1, 1, {
        number: pickedPlace.number,
        isAvailable: !pickedPlace.isAvailable,
      }),
      pickedPlaces: newPickedPlaces,
      stepsFulfilled: immutableSplice(stepsFulfilled, 1, 1, isStepFulfilled),
    });
  };

  toggleLuggage = () => {
    const {
      isLuggage,
      pickedPlaces,
      luggageWeight,
      stepsFulfilled,
    } = this.state;
    const isStepFulfilled = this.checkSecondStepFulfillment(
      pickedPlaces,
      !isLuggage,
      luggageWeight
    );
    this.setState({
      isLuggage: !isLuggage,
      stepsFulfilled: immutableSplice(stepsFulfilled, 1, 1, isStepFulfilled),
      luggageWeight: null,
    });
  };

  handleLuggageChange = (e) => {
    const { pickedPlaces, stepsFulfilled, } = this.state;
    const luggageWeight = e.target.value;
    const isStepFulfilled = this.checkSecondStepFulfillment(
      pickedPlaces,
      true,
      luggageWeight
    );
    this.setState({
      luggageWeight,
      stepsFulfilled: immutableSplice(stepsFulfilled, 1, 1, isStepFulfilled),
    });
  };

  handleNextClick = () => {
    const { stepsStarted, currentStep, } = this.state;
    this.setState({
      currentStep: currentStep + 1,
      stepsStarted: immutableSplice(stepsStarted, currentStep + 1, 1, true),
    });
  };

  handleBackClick = () => {
    const { stepsStarted, currentStep, } = this.state;
    this.setState({
      currentStep: currentStep - 1,
      stepsStarted: immutableSplice(stepsStarted, currentStep, 1, false),
    });
  };

  render() {
    const { places, isLuggage, } = this.state;
    const renderredComponents = [
      <FlightFinder findFlight={this.findFlight} />,
      <PlacePicker
        places={places}
        onClick={this.handlePlaceClick}
        toggleLuggage={this.toggleLuggage}
        onLuggageChange={this.handleLuggageChange}
        isLuggage={isLuggage}
      />,
      <div>N3</div>,
    ];
    return (
      <div className="new-flight">
        <div className="row">
          {this.state.stepsStarted.map((step, index) => {
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
        {renderredComponents[this.state.currentStep]}
        <ButtonPanel
          onBackClick={this.handleBackClick}
          onNextClick={this.handleNextClick}
          currentStep={this.state.currentStep}
          stepsFulfilled={this.state.stepsFulfilled}
        />
      </div>
    );
  }
}

export default NewFlight;
