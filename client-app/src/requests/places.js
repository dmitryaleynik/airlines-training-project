import Request from './Request';

export default (id, token) => {
  const params = {
    flight_id: id,
  };
  return new Request('/places', token).get(params);
};
