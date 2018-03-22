const HttpCodes = require('http-status-codes');
const settingsService = require('../Services/settings');
const { NICKNAME_MIN_LENGTH, } = require('../utils/constants');

const {
  ChangeNicknameRequest,
  UserInfoRequest,
  ChangeAvatarRequest,
} = require('../Contracts/ServiceWithHandler/settings');
const { UserInfoResponse, } = require('../Contracts/Responses/settings');

const changeNickname = async ctx => {
  const { user, } = ctx.state;
  const { nickname, } = ctx.request.body;

  if (!nickname || nickname.length < NICKNAME_MIN_LENGTH) {
    ctx.status = HttpCodes.BAD_REQUEST;
    ctx.body = {
      message: 'Nickname is too short.',
    };
    return;
  }

  if (nickname === user.nickname) {
    ctx.status = HttpCodes.NOT_MODIFIED;
    return;
  }

  const res = await settingsService.changeNickname(
    new ChangeNicknameRequest(user.id, nickname)
  );

  if (res.nicknameIsUsed) {
    ctx.status = HttpCodes.CONFLICT;
    ctx.body = {
      message: 'Nickname is already used.',
    };
    return;
  }

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
