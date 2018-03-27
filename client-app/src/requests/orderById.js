import Request from './Request';

export default (id, token) => {
  return new Request(`/orders/${id}`, token).get();
};
