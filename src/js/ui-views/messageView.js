import View from './View';
import warning from 'url:../../img/warning.png';

class MessageView extends View {
  _parentElement = document.querySelector('.message');
}

export default new MessageView();
