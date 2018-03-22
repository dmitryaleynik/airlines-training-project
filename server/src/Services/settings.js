const dbConnector = require('../Connectors/psql');

const {
  GetUserByNicknameRequest,
  ChangeNicknameRequest,
  UserByIdRequest,
  ChangeAvatarRequest,
} = require('../Contracts/ConnectorWithService/users');
const {
  ChangeNicknameResponse,
  UserInfoResponse,
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

const getUserInfo = async ({ id, }) => {
  const user = await dbConnector.getUserWithAvatar(new UserByIdRequest(id));
  return new UserInfoResponse(user);
};

const changeAvatar = async ({ id, avatar, }) => {
  await dbConnector.changeAvatar(new ChangeAvatarRequest(id, avatar));
  return true;
};

module.exports = {
  changeNickname,
  getUserInfo,
  changeAvatar,
};
