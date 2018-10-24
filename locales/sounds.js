import i18n from 'i18next';
import _ from 'lodash';

const success = {
  en: [require('../assets/sounds/success/en/1.mp3')],
  sv: [require('../assets/sounds/success/sv/1.mp3')]
}

export function localSuccess() {
  const language = i18n.languages[0].split('-')[0]
  return _.sample(success[language])
}