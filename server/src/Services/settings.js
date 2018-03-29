const dbConnector = require('../Connectors/psql');

const {
  ChangeNicknameRequest,
  UserByIdRequest,
  ChangeAvatarRequest,
} = require('../Contracts/ConnectorWithService/users');
const {
  UserInfoResponse,
} = require('../Contracts/ServiceWithHandler/settings');

const changeNickname = async ({ id, nickname, }) => {
  await dbConnector.changeNickname(new ChangeNicknameRequest(id, nickname));
  return true;
};

const getUserInfo = async ({ id, }) => {
  const user = await dbConnector.getUserWithAvatar(new UserByIdRequest(id));
  return new UserInfoResponse(user);
};

const changeAvatar = async ({ id, avatar, }) => {
  const avatarArray = avatar.split(',');
  const data = Buffer.from(avatarArray[1], 'base64');
  const avatarData = {
    type: avatarArray[0],
    data,
  };
  await dbConnector.changeAvatar(new ChangeAvatarRequest(id, avatarData));
  return true;
};

module.exports = {
  changeNickname,
  getUserInfo,
  changeAvatar,
};
