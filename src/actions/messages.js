import Constants from '../constants';

export default function sendMessage(message) {
  return {
    type: Constants.SEND_MESSAGE,
    message,
  };
}
