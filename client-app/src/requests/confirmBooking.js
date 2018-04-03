import FetchRequest from './FetchRequest';

export default (orderId, token) => {
  return new FetchRequest('/booking/confirm', token).put({ orderId, });
};
