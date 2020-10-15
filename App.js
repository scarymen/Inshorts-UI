import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Animated,
    PanResponder
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const ARTICLES = [
    { id: "1", uri: require('./assets/download.jpg') },
    { id: "2", uri: require('./assets/2.jpg') },
    { id: "3", uri: require('./assets/3.jpg') },
]

class DeckSwiper extends Component {

    constructor(props) {
        super(props)

        this.position = new Animated.ValueXY()
        this.swipedCardPosition = new Animated.ValueXY({ x: 0, y: -SCREEN_HEIGHT })
        this.state = {
            currentIndex: 0
        }

    }

    componentWillMount() {

        this.PanResponder = PanResponder.create({

            onStartShouldSetPanResponder: (e, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {

                if (gestureState.dy > 0 && (this.state.currentIndex > 0)) {
                    this.swipedCardPosition.setValue({
                        x: 0, y: -SCREEN_HEIGHT + gestureState.dy
                    })
                }
                else {

                    this.position.setValue({ y: gestureState.dy })

                }
            },
            onPanResponderRelease: (evt, gestureState) => {

                if (this.state.currentIndex > 0 && gestureState.dy > 50 && gestureState.vy > 0.7) {
                    Animated.timing(this.swipedCardPosition, {
                        toValue: ({ x: 0, y: 0 }),
                        duration: 400
                    }).start(() => {

                        this.setState({ currentIndex: this.state.currentIndex - 1 })
                        this.swipedCardPosition.setValue({ x: 0, y: -SCREEN_HEIGHT })

                    })
                }
                else if (-gestureState.dy > 50 && -gestureState.vy > 0.7) {

                    Animated.timing(this.position, {
                        toValue: ({ x: 0, y: -SCREEN_HEIGHT }),
                        duration: 400
                    }).start(() => {

                        this.setState({ currentIndex: this.state.currentIndex + 1 })
                        this.position.setValue({ x: 0, y: 0 })

                    })
                }
                else {
                    Animated.parallel([
                        Animated.spring(this.position, {
                            toValue: ({ x: 0, y: 0 })
                        }),
                        Animated.spring(this.swipedCardPosition, {
                            toValue: ({ x: 0, y: -SCREEN_HEIGHT })
                        })

                    ]).start()

                }
            }
        })

    }
    renderArticles = () => {

        return ARTICLES.map((item, i) => {

            if (i == this.state.currentIndex - 1) {

                return (
                    <Animated.View key={item.id} style={this.swipedCardPosition.getLayout()}
                        {...this.PanResponder.panHandlers}
                    >
                        <View style={{ flex: 1, position: 'absolute', height: SCREEN_HEIGHT, width: SCREEN_WIDTH, backgroundColor: 'yellow' }}>

                            <View style={{ flex: 2, backgroundColor: 'black' }}>
                                <Image source={ARTICLES[i].uri}
                                    style={{ flex: 1, height: null, width: null, resizeMode: 'maximum' }}
                                ></Image>
                            </View>
                            <View style={{ flex: 3, padding: 5 }}>
                                <Text>
                                    Labore irure excepteur deserunt qui. Occaecat do consequat velit adipisicing consequat reprehenderit incididunt duis irure ea consequat ipsum Lorem dolor. Culpa consectetur nisi officia excepteur anim mollit nostrud ut voluptate. Quis velit dolore fugiat veniam eu labore adipisicing ipsum incididunt ad amet. Do veniam adipisicing veniam commodo exercitation officia et commodo Lorem nostrud culpa tempor dolor.
                                    Labore irure excepteur deserunt qui. Occaecat do consequat velit adipisicing consequat reprehenderit incididunt duis irure ea consequat ipsum Lorem dolor. Culpa consectetur nisi officia excepteur anim mollit nostrud ut voluptate. Quis velit dolore fugiat veniam eu labore adipisicing ipsum incididunt ad amet. Do veniam adipisicing veniam commodo exercitation officia et commodo Lorem nostrud culpa tempor dolor.
                                    Labore irure excepteur deserunt qui. Occaecat do consequat velit adipisicing consequat reprehenderit incididunt duis irure ea consequat ipsum Lorem dolor. Culpa consectetur nisi officia excepteur anim mollit nostrud ut voluptate. Quis velit dolore fugiat veniam eu labore adipisicing ipsum incididunt ad amet. Do veniam adipisicing veniam commodo exercitation officia et commodo Lorem nostrud culpa tempor dolor.
              </Text>
                            </View>
                        </View>
                    </Animated.View>
                )
            }
            else if (i < this.state.currentIndex) {
                return null
            }
            if (i == this.state.currentIndex) {

                return (

                    <Animated.View key={item.id} style={this.position.getLayout()}
                        {...this.PanResponder.panHandlers}
                    >
                        <View style={{ flex: 1, position: 'absolute', height: SCREEN_HEIGHT, width: SCREEN_WIDTH, backgroundColor: 'white' }}>

                            <View style={{ flex: 2, backgroundColor: 'black' }}>
                                <Image source={ARTICLES[i].uri}
                                    style={{ flex: 1, height: null, width: null, resizeMode: 'center' }}
                                ></Image>
                            </View>
                            <View style={{ flex: 3, padding: 5 }}>
                                <Text>
                                    Labore irure excepteur deserunt qui. Occaecat do consequat velit adipisicing consequat reprehenderit incididunt duis irure ea consequat ipsum Lorem dolor. Culpa consectetur nisi officia excepteur anim mollit nostrud ut voluptate. Quis velit dolore fugiat veniam eu labore adipisicing ipsum incididunt ad amet. Do veniam adipisicing veniam commodo exercitation officia et commodo Lorem nostrud culpa tempor dolor.
                                    Labore irure excepteur deserunt qui. Occaecat do consequat velit adipisicing consequat reprehenderit incididunt duis irure ea consequat ipsum Lorem dolor. Culpa consectetur nisi officia excepteur anim mollit nostrud ut voluptate. Quis velit dolore fugiat veniam eu labore adipisicing ipsum incididunt ad amet. Do veniam adipisicing veniam commodo exercitation officia et commodo Lorem nostrud culpa tempor dolor.
                                    Labore irure excepteur deserunt qui. Occaecat do consequat velit adipisicing consequat reprehenderit incididunt duis irure ea consequat ipsum Lorem dolor. Culpa consectetur nisi officia excepteur anim mollit nostrud ut voluptate. Quis velit dolore fugiat veniam eu labore adipisicing ipsum incididunt ad amet. Do veniam adipisicing veniam commodo exercitation officia et commodo Lorem nostrud culpa tempor dolor.
              </Text>
                            </View>
                        </View>
                    </Animated.View>
                )
            }
            else {

                return (
                    <Animated.View key={item.id}

                    >
                        <View style={{ flex: 1, position: 'absolute', height: SCREEN_HEIGHT, width: SCREEN_WIDTH, backgroundColor: 'white' }}>

                            <View style={{ flex: 2, backgroundColor: 'black' }}>
                                <Image source={ARTICLES[i].uri}
                                    style={{ flex: 1, height: null, width: null, resizeMode: 'center' }}
                                ></Image>
                            </View>
                            <View style={{ flex: 3, padding: 5 }}>
                                <Text>
                                    Labore irure excepteur deserunt qui. Occaecat do consequat velit adipisicing consequat reprehenderit incididunt duis irure ea consequat ipsum Lorem dolor. Culpa consectetur nisi officia excepteur anim mollit nostrud ut voluptate. Quis velit dolore fugiat veniam eu labore adipisicing ipsum incididunt ad amet. Do veniam adipisicing veniam commodo exercitation officia et commodo Lorem nostrud culpa tempor dolor.
                                    Labore irure excepteur deserunt qui. Occaecat do consequat velit adipisicing consequat reprehenderit incididunt duis irure ea consequat ipsum Lorem dolor. Culpa consectetur nisi officia excepteur anim mollit nostrud ut voluptate. Quis velit dolore fugiat veniam eu labore adipisicing ipsum incididunt ad amet. Do veniam adipisicing veniam commodo exercitation officia et commodo Lorem nostrud culpa tempor dolor.
                                    Labore irure excepteur deserunt qui. Occaecat do consequat velit adipisicing consequat reprehenderit incididunt duis irure ea consequat ipsum Lorem dolor. Culpa consectetur nisi officia excepteur anim mollit nostrud ut voluptate. Quis velit dolore fugiat veniam eu labore adipisicing ipsum incididunt ad amet. Do veniam adipisicing veniam commodo exercitation officia et commodo Lorem nostrud culpa tempor dolor.
              </Text>
                            </View>
                        </View>
                    </Animated.View>
                )

            }
        }).reverse()

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderArticles()}
            </View>
        );
    }
}
export default DeckSwiper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});