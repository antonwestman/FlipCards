import i18n from 'i18next';
import _ from 'lodash';

export const animalSounds = {
  dog: [
    require('../../assets/sounds/dogs/1.mp3'),
    require('../../assets/sounds/dogs/2.mp3'),
    require('../../assets/sounds/dogs/3.mp3'),
    require('../../assets/sounds/dogs/4.mp3'),
    require('../../assets/sounds/dogs/5.mp3'),
    require('../../assets/sounds/dogs/6.mp3')],
  cat: [
    require('../../assets/sounds/cats/1.mp3'),
    require('../../assets/sounds/cats/2.mp3'),
    require('../../assets/sounds/cats/3.mp3'),
    require('../../assets/sounds/cats/4.mp3'),
    require('../../assets/sounds/cats/5.mp3')],
  horse: [
    require('../../assets/sounds/horses/1.mp3'),
    require('../../assets/sounds/horses/2.mp3'),
    require('../../assets/sounds/horses/3.mp3')],
  monkey: [
    require('../../assets/sounds/monkies/1.mp3'),
    require('../../assets/sounds/monkies/2.mp3'),
    require('../../assets/sounds/monkies/3.mp3'),
    require('../../assets/sounds/monkies/4.mp3'),
    require('../../assets/sounds/monkies/5.mp3')],
  cow: [
    require('../../assets/sounds/cows/1.mp3')]
}

// TODO: Insert english words
const animalWords = {
  en: {
    dog: [require('../../assets/sounds/cows/1.mp3')],
    cat: [require('../../assets/sounds/cows/1.mp3')],
    horse: [require('../../assets/sounds/cows/1.mp3')],
    monkey: [require('../../assets/sounds/cows/1.mp3')]
  },
  sv: {
    dog: [
      require('../../assets/sounds/spoken/dog/sv/female-child-1.mp3'),
      require('../../assets/sounds/spoken/dog/sv/female-child-2.mp3'),
      require('../../assets/sounds/spoken/dog/sv/female-child-3.mp3'),
      require('../../assets/sounds/spoken/dog/sv/female-child-dog.mp3'),
      require('../../assets/sounds/spoken/dog/sv/male-adult-1.mp3'),
      require('../../assets/sounds/spoken/dog/sv/male-adult-2.mp3'),
      require('../../assets/sounds/spoken/dog/sv/male-adult-dog-1.mp3'),
      require('../../assets/sounds/spoken/dog/sv/female-adult-dog-1.mp3')
    ],
    cat: [
      require('../../assets/sounds/spoken/cat/sv/female-child-cat-1.mp3'),
      require('../../assets/sounds/spoken/cat/sv/female-child-cat-2.mp3'),
      require('../../assets/sounds/spoken/cat/sv/male-adult-cat-1.mp3'),
      require('../../assets/sounds/spoken/cat/sv/male-adult-cat-2.mp3'),
      require('../../assets/sounds/spoken/cat/sv/male-child-cat-1.mp3'),
      require('../../assets/sounds/spoken/cat/sv/male-child-cat-2.mp3'),
      require('../../assets/sounds/spoken/cat/sv/female-adult-cat-2.mp3')
    ],
    horse: [
      require('../../assets/sounds/spoken/horse/sv/female-child-horse-1.mp3'),
      require('../../assets/sounds/spoken/horse/sv/female-child-horse-2.mp3'),
      require('../../assets/sounds/spoken/horse/sv/female-child-horse-3.mp3'),
      require('../../assets/sounds/spoken/horse/sv/male-adult-horse-1.mp3'),
      require('../../assets/sounds/spoken/horse/sv/male-adult-horse.mp3'),
      require('../../assets/sounds/spoken/horse/sv/female-adult-horse-3.mp3'),
      require('../../assets/sounds/spoken/horse/sv/female-adult-horse-4.mp3'),
      require('../../assets/sounds/spoken/horse/sv/male-child-horse-2.mp3'),
      require('../../assets/sounds/spoken/horse/sv/male-child-horse.mp3')
    ],
    monkey: [
      require('../../assets/sounds/spoken/monkey/sv/female-child-monkey.mp3'),
      require('../../assets/sounds/spoken/monkey/sv/male-adult-monkey-1.mp3'),
      require('../../assets/sounds/spoken/monkey/sv/female-adult-monkey-1.mp3'),
      require('../../assets/sounds/spoken/monkey/sv/female-adult-monkey-2.mp3'),
      require('../../assets/sounds/spoken/monkey/sv/male-adult-monkey.mp3'),
      require('../../assets/sounds/spoken/monkey/sv/male-child-monkey-2.mp3'),
      require('../../assets/sounds/spoken/monkey/sv/male-child-monkey.mp3')
    ],
    cow: [
      require('../../assets/sounds/spoken/cow/sv/female-child-cow.mp3'),
      require('../../assets/sounds/spoken/cow/sv/male-adult-cow-1.mp3'),
      require('../../assets/sounds/spoken/cow/sv/male-adult-cow.mp3'),
      require('../../assets/sounds/spoken/cow/sv/female-adult-cow-2.mp3'),
      require('../../assets/sounds/spoken/cow/sv/female-adult-cow-4.mp3')
    ],
    goat: [
      require('../../assets/sounds/spoken/goat/sv/male-child-goat.mp3')
    ]
  }
}

export function localAnimalWord(species) {
  const language = i18n.languages[0].split('-')[0]
  return _.sample(animalWords[language][species])
}