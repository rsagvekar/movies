import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'

export default function MoviesListItem({ movie, navigation }) {
  return (
    <>
    <TouchableOpacity
      onPress={() => navigation.navigate('ViewMovie', { movieId: movie.id, })}
      style={{ flex: 1,  flexDirection: 'row', alignItems: 'center', backgroundColor: '#f58313' }}>
      
      <Image
        resizeMode='stretch'
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={{
          width: 110,
          height: 150,
          marginRight: 15,
          margin: 5
        }}
      />
      <View style={{ flexDirection: 'column', width: 260, justifyContent: 'center' }}>
        <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 22 }}>{movie.title}</Text>
        <Text numberOfLines={5} style={{ marginLeft: 10, marginRight: 8 }}>{movie.overview}</Text>
      </View>
    </TouchableOpacity>
    <View style={{borderBottomColor: 'gray', borderBottomWidth: 5}}/>
    </>
  )
}
const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    color: 'black'
  },
  creatorNameText: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  amountText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
  },

});