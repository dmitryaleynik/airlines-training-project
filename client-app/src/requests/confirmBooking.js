import Request from './Request';

export default (orderId, token) => {
  return new Request('/booking/confirm', token).put({ orderId, });
};
