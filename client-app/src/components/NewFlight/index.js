import React, { Component, } from 'react';
import classNames from 'classnames';
import FlightFinder from './FlightFinder';
import PlacePicker from './PlacePicker';
import ButtonPanel from './ButtonPanel';
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
    };
    for (let i = 1; i <= 30; ++i) {
      this.state.places.push({
        number: i,
        isAvailable: true,
      });
    }
  }

  findFlight = (id: string) => {
    if (id) {
      this.setState({
        stepsFulfilled: [true, ...this.state.stepsFulfilled.slice(1),],
      });
    }
  };

  handlePlaceClick = (e) => {
    const { places, pickedPlaces, stepsFulfilled, } = this.state;
    const pickedPlace = places[e.target.innerHTML - 1];
    let newPickedPlaces = [],
      isStepFulfilled = false;
    if (pickedPlace.isAvailable) {
      newPickedPlaces = [...pickedPlaces, pickedPlace.number,];
    } else {
      let index = pickedPlaces.indexOf(pickedPlace.number);
      newPickedPlaces = [
        ...pickedPlaces.slice(0, index),
        ...pickedPlaces.slice(index + 1),
      ];
    }
    if (newPickedPlaces.length) {
      isStepFulfilled = true;
    } else {
      isStepFulfilled = false;
    }
    this.setState({
      places: [
        ...places.slice(0, pickedPlace.number - 1),
        {
          number: pickedPlace.number,
          isAvailable: !pickedPlace.isAvailable,
        },
        ...places.slice(pickedPlace.number),
      ],
      pickedPlaces: newPickedPlaces,
      stepsFulfilled: [
        ...stepsFulfilled.slice(0, 1),
        isStepFulfilled,
        ...stepsFulfilled.slice(2),
      ],
    });
  };

  handleNextClick = () => {
    const { stepsStarted, currentStep, } = this.state;
    this.setState({
      currentStep: currentStep + 1,
      stepsStarted: [
        ...stepsStarted.slice(0, currentStep + 1),
        true,
        ...stepsStarted.slice(currentStep + 2),
      ],
    });
  };

  handleBackClick = () => {
    const { stepsStarted, currentStep, } = this.state;
    this.setState({
      currentStep: currentStep - 1,
      stepsStarted: [
        ...stepsStarted.slice(0, currentStep),
        false,
        ...stepsStarted.slice(currentStep + 1),
      ],
    });
  };

  render() {
    const { places, } = this.state;
    const renderredComponents = [
      <FlightFinder findFlight={this.findFlight} />,
      <PlacePicker places={places} onClick={this.handlePlaceClick} />,
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
