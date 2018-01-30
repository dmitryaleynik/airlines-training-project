import React from 'react';

const FlightFinder = (props) => {
  return (
    <div>
      <h2>Step 1: Find a flight</h2>
      <input type="text" placeholder="airport" onChange={props.findFlight} />
    </div>
  );
};

export default FlightFinder;
