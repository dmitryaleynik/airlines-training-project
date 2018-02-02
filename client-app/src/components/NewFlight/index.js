import React, { Component, } from 'react';
import classNames from 'classnames';
import FlightFinder from './FlightFinder';
import PlacePicker from './PlacePicker';
import PriceConfirmator from './PriceConfirmator';
import ButtonPanel from './ButtonPanel';
import { immutableSplice, immutablePush, } from 'src/utils/helpers';

import './styles.css';

class NewFlight extends Component<{}, State> {
  constructor() {
    super();
    // this.state = {
    //   places: [],
    //   pickedPlaces: [],
    //   stepsStarted: [true, false, false,],
    //   stepsFulfilled: [false, false, false,],
    //   currentStep: 0,
    //   isLuggage: false,
    //   luggageWeight: null,
    //   isBooked: false,
    // };
    // for (let i = 1; i <= 30; ++i) {
    //   this.state.places.push({
    //     number: i,
    //     isAvailable: true,
    //   });
    // }
  }

  componentWillMount() {
    this.props.getCities();
  }

  /////// FlightFinder methods ///////
  // findFlight = (id: string) => {
  //   const { stepsFulfilled, } = this.state;
  //   if (id) {
  //     this.setState({
  //       stepsFulfilled: immutableSplice(stepsFulfilled, 0, 1, true),
  //     });
  //   }
  // };

  // /////// PlacePicker methods ///////
  // checkSecondStepFulfillment = (places, isLuggage, luggageWeight) => {
  //   if (!places.length) {
  //     return false;
  //   }
  //   if (isLuggage && (!luggageWeight || !Number(luggageWeight))) {
  //     return false;
  //   }
  //   return true;
  // };

  // handlePlaceClick = (e) => {
  //   const {
  //     places,
  //     pickedPlaces,
  //     stepsFulfilled,
  //     isLuggage,
  //     luggageWeight,
  //   } = this.state;
  //   const pickedPlace = places[e.target.innerHTML - 1];
  //   let newPickedPlaces = [],
  //     isStepFulfilled = false;
  //   if (pickedPlace.isAvailable) {
  //     newPickedPlaces = immutablePush(pickedPlaces, pickedPlace.number);
  //   } else {
  //     let index = pickedPlaces.indexOf(pickedPlace.number);
  //     newPickedPlaces = immutableSplice(pickedPlaces, index, 1);
  //   }
  //   isStepFulfilled = this.checkSecondStepFulfillment(
  //     newPickedPlaces,
  //     isLuggage,
  //     luggageWeight
  //   );
  //   this.setState({
  //     places: immutableSplice(places, pickedPlace.number - 1, 1, {
  //       number: pickedPlace.number,
  //       isAvailable: !pickedPlace.isAvailable,
  //     }),
  //     pickedPlaces: newPickedPlaces,
  //     stepsFulfilled: immutableSplice(stepsFulfilled, 1, 1, isStepFulfilled),
  //   });
  // };

  // toggleLuggage = () => {
  //   const {
  //     isLuggage,
  //     pickedPlaces,
  //     luggageWeight,
  //     stepsFulfilled,
  //   } = this.state;
  //   const isStepFulfilled = this.checkSecondStepFulfillment(
  //     pickedPlaces,
  //     !isLuggage,
  //     luggageWeight
  //   );
  //   this.setState({
  //     isLuggage: !isLuggage,
  //     stepsFulfilled: immutableSplice(stepsFulfilled, 1, 1, isStepFulfilled),
  //     luggageWeight: null,
  //   });
  // };

  // handleLuggageChange = (e) => {
  //   const { pickedPlaces, stepsFulfilled, } = this.state;
  //   const luggageWeight = e.target.value;
  //   const isStepFulfilled = this.checkSecondStepFulfillment(
  //     pickedPlaces,
  //     true,
  //     luggageWeight
  //   );
  //   this.setState({
  //     luggageWeight,
  //     stepsFulfilled: immutableSplice(stepsFulfilled, 1, 1, isStepFulfilled),
  //   });
  // };

  // /////// PriceConfirmator methods ///////
  // handleBuyingConfirmation = () => {
  //   this.setState({ isBooked: true, });
  //   setTimeout(() => {
  //     window.location = 'http://localhost:3000/user-page';
  //   }, 3000);
  // };

  render() {
    const {
      cities,
      hints,
      startedSteps,
      fulfilledSteps,
      currentStep,
      handleBackClick,
      handleNextClick,
      toggleHint,
    } = this.props;
    // const { places, isLuggage, luggageWeight, pickedPlaces, } = this.state;
    const renderredComponents = [
      <FlightFinder cities={cities} hints={hints} toggleHint={toggleHint} />,
      //   <PlacePicker
      //     places={places}
      //     onClick={this.handlePlaceClick}
      //     toggleLuggage={this.toggleLuggage}
      //     onLuggageChange={this.handleLuggageChange}
      //     isLuggage={isLuggage}
      //   />,
      //   <PriceConfirmator
      //     luggageWeight={luggageWeight}
      //     pickedPlaces={pickedPlaces}
      //     onClick={this.handleBuyingConfirmation}
      //     isBooked={this.state.isBooked}
      //   />,
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
