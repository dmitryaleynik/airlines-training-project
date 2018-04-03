import FetchRequest from './FetchRequest';

export default (orderId, token) => {
  return new FetchRequest('/booking/cancel', token).put({ orderId, });
};
