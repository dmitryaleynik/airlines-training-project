import React from 'react';
import { reduxForm, Field, } from 'redux-form';
import DatePicker from 'react-datepicker';
import { renderInputWithHints, renderInput, } from 'src/utils/renderField';
import validate from 'src/utils/validate';
import { DATE_DISPLAY_PATTERN, } from 'src/imports';

import 'react-datepicker/dist/react-datepicker.css';

let FlightFinderForm = (props) => {
  const handleChangeDateStart = (date) => {
    return props.changeDateStart(date, props.directionName);
  };

  const handleChangeDateEnd = (date) => {
    return props.changeDateEnd(date, props.directionName);
  };

  return (
    <form
      className="flight-finder-form filter-panel d-flex"
      onSubmit={props.handleSubmit}
    >
      <Field
        name="city-from"
        className="form-control edged-left"
        type="text"
        list="city-from-hint"
        component={renderInputWithHints}
        value={props.direction.filters.cities.from}
      />
      <datalist id="city-from-hint">{props.citiesHints}</datalist>
      <Field
        name="city-to"
        className="form-control inner"
        type="text"
        list="city-to-hint"
        component={renderInputWithHints}
      />
      <datalist id="city-to-hint">{props.citiesHints}</datalist>
      <DatePicker
        className="form-control inner"
        name="date-from"
        data-target="date-from"
        selected={props.direction.filters.dates.from}
        selectsStart
        startDate={props.direction.filters.dates.from}
        endDate={props.direction.filters.dates.to}
        onChange={handleChangeDateStart}
        dateFormat={DATE_DISPLAY_PATTERN}
      />
      <DatePicker
        className="form-control inner"
        name="date-to"
        data-target="date-to"
        selected={props.direction.filters.dates.to}
        selectsEnd
        startDate={props.direction.filters.dates.from}
        endDate={props.direction.filters.dates.to}
        onChange={handleChangeDateEnd}
        dateFormat={DATE_DISPLAY_PATTERN}
      />
      <Field
        name="seats"
        type="number"
        className="form-control inner"
        component={renderInput}
      />
      <div>
        <button type="submit" className="btn btn-secondary edged-right">
          Find
        </button>
      </div>
    </form>
  );
};

FlightFinderForm = reduxForm({
  validate,
})(FlightFinderForm);

export default FlightFinderForm;
