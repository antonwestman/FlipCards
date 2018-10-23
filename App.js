import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, Image, TouchableHighlight, Modal } from 'react-native';
import { sounds } from './sounds'
import { animals } from './animals'

export default class App extends React.Component {

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
      this.playSound(_.sample(sounds[animal.species]))
    } else {
      setTimeout(() => { this.playSound(_.sample(sounds[animal.species])) }, 1100);
      this.playSound(_.sample(sounds.goodWork))
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
                               .slice(4);

  targetAnimal = () => _.sample(this.sampleAnimals())

  render() {
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
                  modalAnimal.species
                }</Text>
                <TouchableHighlight onPress={() => {
                    this.playSound(_.sample(sounds[modalAnimal.species]));
                }}>
                <Image source={modalAnimal.img}
                       style={{ width: 400, height: 400 }}/>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    this.nextAnimal();
                  }}>
                  <Text style={styles.titleText}>Nästa djur</Text>
                </TouchableHighlight>
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
        <Text style={styles.titleText}>{this.state.targetAnimal.species}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
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
    marginTop: 20,
    color: '#fff'
  }
});
