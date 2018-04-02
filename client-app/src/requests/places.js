import FetchRequest from './FetchRequest';

export default (id, token) => {
  const params = {
    flight_id: id,
  };
  return new FetchRequest('/places', token).get(params);
};
