import FetchRequest from './FetchRequest';

export default (id, token) => {
  return new FetchRequest(`/orders/${id}`, token).get();
};
