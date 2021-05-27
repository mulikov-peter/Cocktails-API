import View from './View';

class MessageView extends View {
  _parentElement = document.querySelector('.message');
}

export default new MessageView();
