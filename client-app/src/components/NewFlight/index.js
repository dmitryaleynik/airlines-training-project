import React, { Component, } from 'react';
import classNames from 'classnames';
import FlightFinder from './FlightFinder';
import PlacePicker from './PlacePicker';
// import PriceConfirmator from './PriceConfirmator';
import ButtonPanel from './ButtonPanel';

import './styles.scss';

class NewFlight extends Component<{}, State> {
  componentWillMount() {
    this.props.getCities();
    this.props.getPlaces(this.props.straightFlight.selectedId);
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
            'straightPlaces'
          );
          if (this.props.isReverseRequired) {
            this.props.getPlaces(
              this.props.reverseFlight.selectedId,
              'reversePlaces'
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
    if (directionName === 'straightFlight') {
      if (
        !this.props.isReverseRequired ||
        (this.props.isReverseRequired && this.props.reverseFlight.selectedId)
      ) {
        this.props.setStep(0, true);
      }
    } else if (directionName === 'reverseFlight') {
      if (this.props.straightFlight.selectedId) {
        this.props.setStep(0, true);
      }
    }
    return;
  };

  toggleReversePath = () => {
    this.props.toggleReversePath();
    if (!this.props.isReverseRequired) {
      this.props.setStep(0, false);
    } else {
      if (this.props.straightFlight.selectedId) {
        this.props.setStep(0, true);
      } else {
        this.props.setStep(0, false);
      }
    }
  };

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
      <PlacePicker
        straightPlaces={straightPlaces}
        reversePlaces={reversePlaces}
        togglePlace={togglePlace}
      />,
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
