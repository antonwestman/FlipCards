import React from 'react';
import _ from 'lodash';
import {
  Button,
  Image, 
  Modal,
  StyleSheet, 
  Text, 
  TouchableHighlight, 
  View
} from 'react-native';
import { animalSounds } from './animalSounds'
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
    this.state = {
      targetAnimal: this.targetAnimal(),
    }
  }

  nextAnimal(){
    this.setState(
      {
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
      this.setState(previousState => {
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

  sampleAnimals = () => animals.map((a) => [Math.random(),a])
                               .sort((a,b) => a[0]-b[0])
                               .map((a) => a[1])
                               .slice(8);

  targetAnimal = () => _.sample(this.sampleAnimals())

  render() {
    const { t, i18n } = this.props;
    const modalAnimal = this.state.modalAnimal
    return (
      <View style={styles.container}>
        { modalAnimal &&
          <Modal
            animationType="slide"
            transparent={false}
            >
            <View style={{marginTop: 22}}>
              <View style={styles.modal}>
                <Text style={styles.titleText}>{
                  _.upperFirst(t(`${modalAnimal.species}`))
                }</Text>
                <TouchableHighlight onPress={() => {
                    this.playSound(_.sample(animalSounds[modalAnimal.species]));
                }}>
                <Image source={modalAnimal.img}
                       style={{ width: 400, height: 400 }}/>
                </TouchableHighlight>
                <Button
                  title={_.upperFirst(t('next_animal'))}
                  color="#fff"
                  accessibilityLabel={t('next_animal')}
                  onPress={() => {
                    this.nextAnimal();
                  }}
                />
              </View>
            </View>
          </Modal>
        }
        {
          this.sampleAnimals().map(animal => 
            <TouchableHighlight key={animal['id']} onPress={
              (e) => {
                return this.onClick(e, animal)
              }
            }>
              <Image source={animal['img']}
                     style={{ width: 100, height: 100 }}/>
            </TouchableHighlight>
          )
        }
        <Text style={styles.titleText}>{_.upperFirst(t(`${this.state.targetAnimal.species}`))}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%'
  },
  modal: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%'
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 30,
    color: '#fff'
  }
});

export default withNamespaces(['animals', 'routes'], { wait: true })(PointAtAnimals);
