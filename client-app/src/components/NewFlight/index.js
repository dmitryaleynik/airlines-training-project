import React, { Component, } from 'react';
import FlightFinder from './FlightFinder';
import classNames from 'classnames';
import './styles.css';

class NewFlight extends Component {
  state = {
    stepsStarted: [true, false, false,],
    stepsFulfilled: [false, false, false,],
    currentStep: 1,
  };

  findFlight = (e) => {
    if (e.target.value.length >= 2) {
      this.setState({
        stepsFulfilled: [true, ...this.state.stepsFulfilled.slice(1),],
      });
    }
  };

  handleNextClick = () => {
    const { stepsStarted, currentStep, } = this.state;
    this.setState({
      currentStep: currentStep + 1,
      stepsStarted: [
        ...stepsStarted.slice(0, currentStep),
        true,
        ...stepsStarted.slice(currentStep + 1),
      ],
    });
  };

  handleBackClick = () => {
    const { stepsStarted, currentStep, } = this.state;
    this.setState({
      currentStep: currentStep - 1,
      stepsStarted: [
        ...stepsStarted.slice(0, currentStep - 1),
        false,
        ...stepsStarted.slice(currentStep),
      ],
    });
  };

  render() {
    return (
      <div>
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
        <FlightFinder findFlight={this.findFlight} />
        <div className="button-panel position-relative">
          <button
            className={classNames('btn btn-primary btn-back', {
              'd-none': this.state.currentStep <= 1,
            })}
            onClick={this.handleBackClick}
          >
            Back
          </button>
          <button
            className={classNames('btn btn-primary btn-next', {
              'd-none': this.state.currentStep >= 3,
            })}
            onClick={this.handleNextClick}
            disabled={!this.state.stepsFulfilled[this.state.currentStep - 1]}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default NewFlight;
