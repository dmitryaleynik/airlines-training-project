const dbConnector = require('../Connectors/psql');

const {
  GetUserByNicknameRequest,
  ChangeNicknameRequest,
} = require('../Contracts/ConnectorWithService/users');
const {
  ChangeNicknameResponse,
} = require('../Contracts/ServiceWithHandler/settings');

const changeNickname = async ({ id, nickname, }) => {
  const user = await dbConnector.getUserByNickname(
    new GetUserByNicknameRequest(nickname)
  );
  if (user.id) {
    return new ChangeNicknameResponse({ nicknameIsUsed: true, });
  }

  await dbConnector.changeNickname(new ChangeNicknameRequest(id, nickname));
  return true;
};

module.exports = {
  changeNickname,
};
