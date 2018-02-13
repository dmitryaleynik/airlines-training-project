import React, { Component, } from 'react';
import FlightInfo from 'src/components/FlightInfo';
import BackButton from 'src/components/BackButton';

import './styles.scss';

class OrderInfo extends Component {
  componentWillMount() {
    this.props.getOrderInfo(this.props.match.params.id);
  }

  cancelOrder = () => {
    const { order, cancelOrder, } = this.props;
    cancelOrder(order.id);
    this.props.history.push('/orders');
  };

  confirmOrder = () => {
    const { order, confirmOrder, } = this.props;
    confirmOrder(order.id);
    this.props.history.push('/orders');
  };

  render() {
    const { order, } = this.props;
    const { cancelOrder, confirmOrder, } = this;
    if (!order) {
      return null;
    }

    const children = [];
    order.flights.forEach((flight, i) => {
      children.push(
        <div key={i}>
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
        <BackButton className="back-button" history={this.props.history} />
        <div className="d-flex justify-content-between mb-4">
          <h2 className="lead">Order #{order.id}</h2>
          <h2 className="lead">Status: {order.status}</h2>
        </div>
        {children}
        <div className="d-flex justify-content-between mt-3">
          <span className="font-weight-bold">GRAND TOTAL: {order.total}$</span>
          {order.status === 'Pending' && (
            <span className="buttons">
              <button
                className="btn btn-danger btn-sm mr-2"
                onClick={cancelOrder}
              >
                Cancel
              </button>
              <button className="btn btn-success btn-sm" onClick={confirmOrder}>
                Confirm
              </button>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default OrderInfo;
