import React, { useReducer, useCallback, useState, useEffect } from 'react'
import SwipeView from 'react-native-swipeview';
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, FlatList } from 'react-native'
import MoviesListItem from './MoviesListItem'
import IsEmpty from '../../utils/IsEmpty';

export default function MoviesList(props) {
    const [_movies, set_movies] = useState([]);

    const movies_data = props.movies_data;
    useEffect(() => {
        if (movies_data == null || movies_data == undefined) {
            return;
        }
        set_movies(movies_data);
    }, [movies_data]);

    const deleteItem = (id) => {
        let allmovies = _movies;
        let filteredItems = allmovies.filter(item => item.id != id);
        set_movies(filteredItems);
    };


    return (
        <View>
            {!IsEmpty(_movies) && <FlatList
                style={{ marginTop: 8 }}
                data={_movies}
                renderItem={({ item }) =>
                    <SwipeView
                        renderVisibleContent={() => <MoviesListItem navigation={props.navigation} movie={item}></MoviesListItem>}
                        rightOpenValue={150}
                        //swipeToOpenPercent={'50%'}
                        previewSwipeDemo={true}
                        disableSwipeToLeft={true}
                        onSwipedRight={() => deleteItem(item.id)}
                    //onSwipedLeft={delete() }
                    />

                }
                keyExtractor={(item, index) => index.toString()}
            />}
        </View>
    )
}
