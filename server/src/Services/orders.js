const dbConnector = require('../Connectors/psql');

const {
  OrdersByUserIdRequest,
  OrderByIdRequest,
} = require('../Contracts/ConnectorWithService/orders');
const {
  OrdersByUserIdResponse,
  OrderByIdResponse,
} = require('../Contracts/ServiceWithHandler/orders');

const getOrdersByUserId = async ({ id, }) => {
  const orders = await dbConnector.getOrdersByUserId(
    new OrdersByUserIdRequest(id)
  );
  return new OrdersByUserIdResponse(orders);
};

const getOrderById = async ({ id, }) => {
  const order = await dbConnector.getOrderById(new OrderByIdRequest(id));
  if (!order.id) {
    return new OrderByIdResponse(null, { orderNotExist: true, });
  }
  return new OrderByIdResponse(order);
};

module.exports = {
  getOrderById,
  getOrdersByUserId,
};
