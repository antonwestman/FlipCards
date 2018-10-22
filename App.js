import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, Image, TouchableHighlight, Modal } from 'react-native';

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
        modalVisible: false,
      }
    )
  }

  onClick = (event, animal) => {
    if (this.state.targetAnimal.species !== animal.species){
      this.playSound(_.sample(this.sounds()[animal.species]))
    } else {
      setTimeout(() => { this.playSound(_.sample(this.sounds()[animal.species])) }, 1500);
      this.playSound(_.sample(this.sounds()['goodWork']))
      this.setState(previousState => {
        return {
          modalVisible: true
        };
      });
    }
  }

  playSound = async (sound) => {
    const soundObject = new Expo.Audio.Sound();
    await soundObject.loadAsync(sound);
    await soundObject.playAsync();
  }

  sounds = () => {
    return {
      goodWork: [require('./assets/sounds/good_job/1.mp3')],
      dog: [
        require('./assets/sounds/dogs/1.mp3'),
        require('./assets/sounds/dogs/2.mp3'),
        require('./assets/sounds/dogs/3.mp3'),
        require('./assets/sounds/dogs/4.mp3')],
      cat: [
        require('./assets/sounds/cats/1.mp3'),
        require('./assets/sounds/cats/2.mp3'),
        require('./assets/sounds/cats/3.mp3'),
        require('./assets/sounds/cats/4.mp3'),
        require('./assets/sounds/cats/5.mp3')],
      horse: [
        require('./assets/sounds/horses/1.mp3'),
        require('./assets/sounds/horses/2.mp3'),
        require('./assets/sounds/horses/3.mp3')],
      monkey: [
        require('./assets/sounds/monkies/1.mp3'),
        require('./assets/sounds/monkies/2.mp3')]
    }
  }

  dogs = () => [
    { id: 'dog-1',
      species: 'dog',
      img: require("./assets/images/dog-1.jpeg")},
    { id: 'dog-2',
      species: 'dog',
      img: require("./assets/images/dog-2.jpeg")},
    { id: 'dog-3',
      species: 'dog',
      img: require("./assets/images/dog-3.jpeg")},
    { id: 'dog-4',
      species: 'dog',
      img: require("./assets/images/dog-4.jpeg")},
    { id: 'dog-5',
      species: 'dog',
      img: require("./assets/images/dog-5.jpeg")},
    { id: 'dog-6',
      species: 'dog',
      img: require("./assets/images/dog-6.jpeg")},
    { id: 'dog-7',
      species: 'dog',
      img: require("./assets/images/dog-7.jpeg")},
    { id: 'dog-8',
      species: 'dog',
      img: require("./assets/images/dog-8.jpeg")},
    { id: 'dog-9',
      species: 'dog',
      img: require("./assets/images/dog-9.jpeg")},
    { id: 'dog-10',
      species: 'dog',
      img: require("./assets/images/dog-10.jpeg")}
  ]


  cats = () => [
    { id: 'cat-1',
      species: 'cat',
      img: require("./assets/images/cat-1.jpeg") },
    { id: 'cat-2',
      species: 'cat',
      img: require("./assets/images/cat-2.jpeg") },
    { id: 'cat-3',
      species: 'cat',
      img: require("./assets/images/cat-3.jpeg") },
    { id: 'cat-4',
      species: 'cat',
      img: require("./assets/images/cat-4.jpeg") },
    { id: 'cat-5',
      species: 'cat',
      img: require("./assets/images/cat-5.jpeg") },
    { id: 'cat-6',
      species: 'cat',
      img: require("./assets/images/cat-6.jpeg") },
    { id: 'cat-7',
      species: 'cat',
      img: require("./assets/images/cat-7.jpeg") },
    { id: 'cat-8',
      species: 'cat',
      img: require("./assets/images/cat-8.jpeg") },
    { id: 'cat-9',
      species: 'cat',
      img: require("./assets/images/cat-9.jpeg") },
    { id: 'cat-10',
      species: 'cat',
      img: require("./assets/images/cat-10.jpeg") }
  ]

  monkies = () => [
    { id: 'monkey-1',
      species: 'monkey',
      img: require("./assets/images/monkey-1.jpeg") },
    { id: 'monkey-2',
      species: 'monkey',
      img: require("./assets/images/monkey-2.jpeg") },
    { id: 'monkey-3',
      species: 'monkey',
      img: require("./assets/images/monkey-3.jpeg") },
    { id: 'monkey-4',
      species: 'monkey',
      img: require("./assets/images/monkey-4.jpeg") }
  ]

  horses = () => [
    { id: 'horse-1',
      species: 'horse',
      img: require("./assets/images/horse-1.jpeg") },
    { id: 'horse-2',
      species: 'horse',
      img: require("./assets/images/horse-2.jpeg") },
    { id: 'horse-3',
      species: 'horse',
      img: require("./assets/images/horse-3.jpeg") },
    { id: 'horse-4',
      species: 'horse',
      img: require("./assets/images/horse-4.jpeg") }
  ]

  animals = () => [...this.cats(), ...this.dogs(), ...this.monkies(), ...this.horses()].map((a) => [Math.random(),a])
                                                           .sort((a,b) => a[0]-b[0])
                                                           .map((a) => a[1])
                                                           .slice(4);
  targetAnimal = () => _.sample(this.animals())

  render() {
    const targetAnimal = this.state.targetAnimal
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          >
          <View style={{marginTop: 22}}>
            <View style={styles.modal}>
              <Text style={styles.modalTitleText}>{
                targetAnimal.species
              }</Text>
              <TouchableHighlight onPress={() => {
                  this.playSound(_.sample(this.sounds()[targetAnimal.species]));
              }}>
              <Image source={targetAnimal.img}
                     style={{ width: 400, height: 400 }}/>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.nextAnimal();
                }}>
                <Text style={styles.modalTitleText}>Nästa djur</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        {
          this.animals().map(animal => 
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#fff',
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
  modalTitleText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#fff'
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 20
  }
});
