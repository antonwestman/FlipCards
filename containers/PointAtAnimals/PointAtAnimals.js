import React from 'react';
import _ from 'lodash';
import {
  Animated,
  Dimensions,
  Easing,
  Image, 
  Modal,
  Platform, 
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

    this.state = {
      sampleAnimals: {},
      targetAnimal: {},
    }

    this.navbarHight = this.getNavBarHeight()
    this.animated = new Animated.Value(0)
  }

  animate () {
    this.animated.setValue(0)
    Animated.timing(
      this.animated,
      {
        toValue: 1,
        duration: 800,
        easing: Easing.linear
      }
    ).start()
  }

  componentDidMount(){
    this.nextAnimal()
  }

  nextAnimal(){
    const animals = this.sampleAnimals()
    const target = _.sample(animals)

    this.setState(
      {
        sampleAnimals: animals,
        targetAnimal: target,
        modalAnimal: undefined,
      }
    )
    setTimeout(() => {
      this.playSound(localAnimalWord(target.species))
      this.animate()
    }, 600);
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

  sampleAnimals = () => _.sampleSize(animals, 12)

  getNavBarHeight() {
    if (Platform.OS == 'ios') {

        let d = Dimensions.get('window');
        const { height, width } = d;
        
        if(height === 812 || width === 812)
            return 88 // iPhone X navbar height (regular title);
        else
            return 64 // iPhone navbar height;
    } else
        return 54 //android portrait navbar height;
  }

  render() {
    const { t, i18n } = this.props;
    const { sampleAnimals, targetAnimal, modalAnimal } = this.state
    const fontSize = this.animated.interpolate({
      inputRange:[0, 0.5, 1],
      outputRange:[50,55,50]
    })
    return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}>
          { modalAnimal &&
            <Modal
              animationType="fade"
              transparent={false}
              onRequestClose={() => {
                  this.nextAnimal();
                }    
              }
              >
              <View
                style={{
                  flex: 1,
                  marginTop: this.navbarHight
                }}
              >
                <View 
                  style={{
                    flex:1,
                    backgroundColor: 'steelblue',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <TouchableOpacity
                    onPress={ () =>
                      this.playSound(localAnimalWord(modalAnimal.species))
                    }
                    onLongPress={ () => 
                      this.playSound(_.sample(animalSounds[modalAnimal.species]))
                    }
                  >
                    <Text style={{letterSpacing: 4, fontSize: 50}}>{_.upperFirst(t(`${modalAnimal.species}`))}</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 4,
                    padding:4,
                    backgroundColor: 'skyblue'
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.playSound(_.sample(animalSounds[modalAnimal.species]));
                    }}
                    onLongPress={ () => 
                      this.playSound(localAnimalWord(modalAnimal.species))
                    }
                  >
                  <Image 
                    style={{
                      margin: 'auto',
                      width: '100%',
                      maxHeight:'100%',
                      borderWidth: 1,
                      borderRadius: 3
                    }}
                    source={modalAnimal.img}/>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'steelblue',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    accessibilityLabel={t('next_animal')}
                    onPress={() => {
                      this.nextAnimal();
                    }}
                    style={{
                      width: '90%',
                      borderWidth: 2,
                      borderRadius:10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'skyblue'
                    }}
                  >
                    <Text 
                      style={{
                        letterSpacing: 1,
                        fontSize: 20,
                        padding: 20,
                        fontWeight: '300'
                      }}
                    >
                      {t('next_animal').toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          }
          <View
            style={{
              flex:1,
              backgroundColor: 'steelblue',
              justifyContent: 'center',
              alignItems: 'center'

            }}
          >
            <TouchableOpacity 
              onPress={ () =>
                this.playSound(localAnimalWord(targetAnimal.species))
              }
              onLongPress={ () => 
                this.playSound(_.sample(animalSounds[targetAnimal.species]))
              }
            >
              <Animated.Text style={{letterSpacing: 4, ...{fontSize}}}>{_.upperFirst(t(`${targetAnimal.species}`))}</Animated.Text>
            </TouchableOpacity>
          </View>
          <View style={{
            flex:4,
            backgroundColor: 'skyblue',
            padding: 2
          }}
            >
            {
              _.chunk(sampleAnimals, 3).map(animals =>
                <View key={animals.map(a => a.id).join('-')} 
                      style={{
                        flex: 3,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                      }}
                >
                  {
                    animals.map(animal =>
                      <View key={animal.id} style={{flex: 1}}>
                        <TouchableOpacity
                          onPress={
                            (e) => {
                              return this.onClick(e, animal)
                            }
                          }
                          onLongPress={ () => 
                            this.playSound(localAnimalWord(animal.species))
                          }
                          style={{
                            flex:1,
                            padding: 2
                          }}
                        >
                          <Image style={{
                            margin: 'auto',
                            width: '100%',
                            maxHeight:'100%',
                            borderWidth: 1,
                            borderRadius: 3
                          }} source={animal['img']} />
                        </TouchableOpacity>
                      </View>
                    )
                  }
                </View>
              )
            }
          </View>
          <View
            style={{
              flex:1,
              backgroundColor: 'steelblue'
            }}
          />
      </View>
    );
  }
}

export default withNamespaces(['animals', 'routes'], { wait: true })(PointAtAnimals);
