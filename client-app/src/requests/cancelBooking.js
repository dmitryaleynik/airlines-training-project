import Request from './Request';

export default (orderId, token) => {
  return new Request('/booking/cancel', token).put({ orderId, });
};
