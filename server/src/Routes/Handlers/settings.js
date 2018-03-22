const HttpCodes = require('http-status-codes');
const settingsService = require('../../Services/settings');
const { NICKNAME_MIN_LENGTH, } = require('../../utils/constants');

const {
  ChangeNicknameRequest,
} = require('../../Contracts/ServiceWithHandler/settings');

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

module.exports = {
  changeNickname,
};
