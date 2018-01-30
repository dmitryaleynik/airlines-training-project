import React, { Component, } from 'react';
import classNames from 'classnames';
import FlightFinder from './FlightFinder';
import ButtonPanel from './ButtonPanel';
import './styles.css';

class NewFlight extends Component {
  state = {
    stepsStarted: [true, false, false,],
    stepsFulfilled: [false, false, false,],
    currentStep: 0,
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
    const renderredComponents = [
      <FlightFinder findFlight={this.findFlight} />,
      <div>N2</div>,
      <div>N3</div>,
    ];
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
