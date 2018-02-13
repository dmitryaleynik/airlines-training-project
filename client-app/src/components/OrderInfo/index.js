import React, { Component, } from 'react';
import FlightInfo from 'src/components/FlightInfo';

import './styles.scss';

class OrderInfo extends Component {
  componentWillMount() {
    this.props.getOrderInfo(this.props.match.params.id);
  }

  render() {
    const { order, } = this.props;
    if (!order) {
      return null;
    }

    const children = [];
    order.flights.forEach((flight, i) => {
      children.push(
        <div>
          <FlightInfo
            flight={flight}
            places={order.places[i]}
            luggage={order.luggage[i]}
          />
          <div className="flights-divider-both" />
        </div>
      );
    });
    return (
      <div className="order-info jumbotron">
        <div className="d-flex justify-content-between mb-4">
          <h2 className="lead">Order #{order.id}</h2>
          <h2 className="lead">Status: {order.status}</h2>
        </div>
        {children}
        <span className="font-weight-bold">GRAND TOTAL: {order.total}$</span>
      </div>
    );
  }
}

export default OrderInfo;
