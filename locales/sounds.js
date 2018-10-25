import i18n from 'i18next';
import _ from 'lodash';

const success = {
  en: [require('../assets/sounds/success/en/1.mp3')],
  sv: [
    require('../assets/sounds/success/sv/female-child-nice.mp3'),
    require('../assets/sounds/success/sv/female-child-sweet.mp3'),
    require('../assets/sounds/success/sv/female-child-woho.mp3'),
    require('../assets/sounds/success/sv/female-child-well-done.mp3'),
    require('../assets/sounds/success/sv/male-adult-nice.mp3'),
    require('../assets/sounds/success/sv/male-adult-well-done-1.mp3'),
    require('../assets/sounds/success/sv/male-adult-well-done-2.mp3'),
    require('../assets/sounds/success/sv/male-adult-yay.mp3')
  ]
}

export function localSuccess() {
  const language = i18n.languages[0].split('-')[0]
  return _.sample(success[language])
}