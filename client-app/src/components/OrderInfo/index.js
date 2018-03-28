import React, { Component, } from 'react';
import FlightInfo from 'src/components/FlightInfo';
import BackButton from 'src/components/BackButton';
import Modal from 'src/components/Modal/container';
import Loader from 'src/components/Loader';
import { orderStatuses, } from 'src/imports';
import { calculatePrices, } from 'src/utils/helpers';

import './styles.scss';

class OrderInfo extends Component {
  componentWillMount() {
    this.props.getOrderInfo(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.closeModal();
  }

  cancelOrder = () => {
    const modalScheme = {
      content: 'Are you sure?',
      handlePositiveClick: () => {
        const { order, cancelOrder, } = this.props;
        cancelOrder(order.id);
        this.props.history.push('/orders');
      },
    };
    this.props.openModal(modalScheme);
  };

  confirmOrder = () => {
    const modalScheme = {
      content: 'Thank you!',
    };
    this.props.openModal(modalScheme);
    const { order, confirmOrder, } = this.props;
    confirmOrder(order.id);
    setTimeout(() => {
      this.props.history.push('/orders');
    }, 3000);
  };

  render() {
    const { order, modal, isFetching, history, } = this.props;
    const { cancelOrder, confirmOrder, } = this;
    let total = 0;
    if (!order) {
      return <Loader />;
    }

    const children = [];
    order.flights.forEach((flight, i) => {
      const prices = calculatePrices(flight);
      total += prices.subtotal;
      children.push(
        <div key={i}>
          <FlightInfo flight={flight} prices={prices} />
          <div className="flights-divider-both" />
        </div>
      );
    });
    return (
      <div className="order-info">
        {isFetching && <Loader />}
        {modal && <Modal modal={modal} />}
        {!isFetching && (
          <div className="jumbotron">
            <BackButton className="back-button" history={history} />
            <div className="d-flex justify-content-between mb-4">
              <h2 className="lead">Order #{order.id}</h2>
              <h2 className="lead">Status: {order.status}</h2>
            </div>
            {children}
            <div className="d-flex justify-content-between mt-3">
              <span className="font-weight-bold">GRAND TOTAL: {total}$</span>
              {order.status === orderStatuses.PENDING && (
                <span className="buttons">
                  <button
                    className="btn btn-danger btn-sm mr-2"
                    onClick={cancelOrder}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={confirmOrder}
                  >
                    Confirm
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default OrderInfo;
