import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, Image, StyleSheet, ImageBackground, ScrollView, Animated } from 'react-native'
import Container from './../../components/Container'
import { get_movie_details } from '../../store/actions/MoviesActions'
import IsEmpty from '../../utils/IsEmpty'
import { url, api_key } from 'config';

export default function ViewMovie(props) {
    const { movieId } = props.route.params;
    const dispatch = useDispatch();
    const indicator = new Animated.Value(0);
    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);

    const [_movies_details, set_movies_details] = useState({});
    useEffect(() => {
        get_movies_data();
    }, [])
    get_movies_data = async () => {
        let res = await dispatch(get_movie_details(movieId));
        console.warn(res)
        set_movies_details(res)
    }
    return (
        <Container loading={false}>
            {!IsEmpty(_movies_details) &&
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <ImageBackground
                            source={{ uri: `https://image.tmdb.org/t/p/w500${_movies_details.poster_path}` }}
                            style={{ height: 750, width: '100%', resizeMode: 'contain' }}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    paddingVertical: 20,
                                    marginTop: 300,
                                    borderRadius: 5,
                                    backgroundColor: "rgba(0,0,0,0.7)"
                                }}
                            >
                                <View style={{ paddingHorizontal: 10, flex: 1, alignItems: 'center' }}>
                                    <Text style={styles.titleText} >{_movies_details.title}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 70, color: 'white' }}>Language : </Text>
                                    <Text style={styles.amountText}>{_movies_details.original_language}</Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 50, color: 'white' }}>Ratings : </Text>
                                    <Text style={styles.amountText}>{_movies_details.vote_average}</Text>
                                </View>
                                    
                                <ScrollView
                                    contentContainerStyle={{ paddingLeft: 1 }}
                                    showsVerticalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    onContentSizeChange={(width, height) => {
                                        setScrollViewWholeHeight(height)
                                    }}
                                    onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => {
                                        setScrollViewVisibleHeight(height)
                                    }}
                                    onScroll={Animated.event(
                                        [{ nativeEvent: { contentOffset: { y: indicator } } }],
                                        { useNativeDriver: false }
                                    )}
                                >
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 10, marginTop: 10, color: 'white' }}>Description : </Text>
                                    <Text style={styles.amountText}>{_movies_details.overview}</Text>
                                </ScrollView>

                            </View>
                        </ImageBackground>
                    </View>
                </ScrollView>
            }
        </Container>
    )
}


const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'Raleway-Bold',
        fontSize: 18,
        color: 'white'
    },
    subtitleText: {
        fontFamily: 'Raleway-Bold',
        fontSize: 18,
        marginVertical: 15,
        color: 'gray'
    },
    creatorNameText: {
        fontSize: 12,
        marginTop: 15,
        color: 'black',
        fontFamily: 'Poppins-Regular',
    },
    amountText: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Poppins-Regular',
        marginLeft: 10

    },

});
