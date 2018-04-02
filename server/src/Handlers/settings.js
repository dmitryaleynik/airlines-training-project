const HttpCodes = require('http-status-codes');
const settingsService = require('../Services/settings');

const {
  ChangeNicknameRequest,
  UserInfoRequest,
  ChangeAvatarRequest,
} = require('../Contracts/ServiceWithHandler/settings');
const { UserInfoResponse, } = require('../Contracts/Responses/settings');

const changeNickname = async ctx => {
  const { user, } = ctx.state;
  const { nickname, } = ctx.request.body;

  if (!nickname) {
    ctx.status = HttpCodes.BAD_REQUEST;
    ctx.body = {
      message: 'Nickname is required.',
    };
    return;
  }

  await settingsService.changeNickname(
    new ChangeNicknameRequest(user.id, nickname)
  );

  ctx.status = HttpCodes.NO_CONTENT;
};

const getUserInfo = async ctx => {
  const { id, } = ctx.state.user;

  const res = await settingsService.getUserInfo(new UserInfoRequest(id));

  ctx.status = HttpCodes.OK;
  ctx.body = new UserInfoResponse(res);
};

const changeAvatar = async ctx => {
  const { id, } = ctx.state.user;
  const { avatar, } = ctx.request.body;
  if (!avatar) {
    ctx.status = HttpCodes.BAD_REQUEST;
    ctx.body = {
      message: 'Avatar is required.',
    };
    return;
  }

  await settingsService.changeAvatar(new ChangeAvatarRequest(id, avatar));
  ctx.status = HttpCodes.NO_CONTENT;
};

module.exports = {
  changeNickname,
  getUserInfo,
  changeAvatar,
};
