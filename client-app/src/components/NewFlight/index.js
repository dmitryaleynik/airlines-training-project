import React, { Component, } from 'react';
import classNames from 'classnames';
import FlightFinder from './FlightFinder';
// import PlacePicker from './PlacePicker';
// import PriceConfirmator from './PriceConfirmator';
import ButtonPanel from './ButtonPanel';

import './styles.scss';

class NewFlight extends Component<{}, State> {
  componentWillMount() {
    this.props.getCities();
  }

  findFlights = (e) => {
    e.preventDefault();
    const fields = e.target.elements;
    this.props.findFlights({
      cities: {
        from: fields['city-from'].value,
        to: fields['city-to'].value,
      },
      dates: {
        from: this.props.filters.dates.from,
        to: this.props.filters.dates.to,
      },
      numberOfTickets: fields['tickets'].value,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.selectedId && nextProps.selectedId) {
      this.props.fulfillStep(0);
    }
  }

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
      filters,
      flights,
      isSearched,
      selectedId,
      handleBackClick,
      handleNextClick,
      changeDateStart,
      changeDateEnd,
      selectFlight,
    } = this.props;
    const { findFlights, } = this;
    const renderredComponents = [
      <FlightFinder
        cities={cities}
        filters={filters}
        flights={flights}
        isSearched={isSearched}
        selectedId={selectedId}
        changeDateStart={changeDateStart}
        changeDateEnd={changeDateEnd}
        onSubmit={findFlights}
        selectFlight={selectFlight}
      />,
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
