import React from 'react';
import _ from 'lodash';
import {
  Image, 
  Modal,
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View
} from 'react-native';
import { animalSounds, localAnimalWord } from './animalSounds'
import { localSuccess } from '../../locales/sounds'
import { animals } from './animals'
import { withNamespaces } from 'react-i18next';


class PointAtAnimals extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    return {
      title: screenProps.t('find_the_animal')
    };
  }

  constructor(props) {
    super(props)

    const animals = this.sampleAnimals()
    const target = _.sample(animals)

    this.state = {
      sampleAnimals: animals,
      targetAnimal: target,
    }
  }

  nextAnimal(){
    const animals = this.sampleAnimals()
    const target = _.sample(animals)

    this.setState(
      {
        sampleAnimals: animals,
        targetAnimal: this.targetAnimal(),
        modalAnimal: undefined,
      }
    )
  }

  onClick = (event, animal) => {
    if (this.state.targetAnimal.species !== animal.species){
      this.playSound(_.sample(animalSounds[animal.species]))
    } else {
      setTimeout(() => { this.playSound(localSuccess()) }, 1100);
      this.playSound(_.sample(animalSounds[animal.species]))
      this.setState(() => {
        return {
          modalAnimal: animal
        };
      });
    }
  }

  playSound = async (sound) => {
    const soundObject = new Expo.Audio.Sound();
    await soundObject.loadAsync(sound);
    await soundObject.playAsync();
  }

  sampleAnimals = () => _.sampleSize(animals, 15)

  targetAnimal = () => _.sample(this.sampleAnimals())

  render() {
    const { t, i18n } = this.props;
    const { sampleAnimals, targetAnimal, modalAnimal } = this.state
    return (
      <View style={styles.container}>
        { modalAnimal &&
          <Modal
            animationType="slide"
            transparent={false}
            >
            <View style={{marginTop: 22}}>
              <View style={styles.modal}>
                <TouchableOpacity onPress={ () =>
                  this.playSound(localAnimalWord(modalAnimal.species))}>
                  <Text style={styles.titleText}>{_.upperFirst(t(`${modalAnimal.species}`))}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.playSound(_.sample(animalSounds[modalAnimal.species]));
                }}>
                <Image source={modalAnimal.img}
                       style={styles.modalImage}/>
                </TouchableOpacity>
                <TouchableOpacity
                  accessibilityLabel={t('next_animal')}
                  onPress={() => {
                    this.nextAnimal();
                  }}
                >
                  <Text style={styles.titleText}>{_.upperFirst(t('next_animal'))}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        }
        {
          sampleAnimals.map(animal => 
            <TouchableOpacity key={animal['id']} onPress={
              (e) => {
                return this.onClick(e, animal)
              }
            }>
              <Image source={animal['img']}
                     style={styles.smallImage}/>
            </TouchableOpacity>
          )
        }
        <TouchableOpacity onPress={ () =>
          this.playSound(localAnimalWord(targetAnimal.species))}>
          <Text style={styles.titleText}>{_.upperFirst(t(`${targetAnimal.species}`))}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%'
  },
  modal: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%'
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 10,
  },
  smallImage: {
    width: 110,
    height: 110,
    margin: 2,
  },
  modalImage: {
    width: 350,
    height: 350
  }
});

export default withNamespaces(['animals', 'routes'], { wait: true })(PointAtAnimals);
