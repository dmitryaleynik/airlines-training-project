const dbConnector = require('../Connectors/psql');

const {
  OrdersByIdRequest,
} = require('../Contracts/ConnectorWithService/orders');
const {
  OrdersByIdResponse,
} = require('../Contracts/ServiceWithHandler/orders');

const getOrdersByUserId = async ({ id, }) => {
  const orders = await dbConnector.getOrdersByUserId(new OrdersByIdRequest(id));
  return new OrdersByIdResponse(orders);
};

module.exports = {
  getOrdersByUserId,
};
