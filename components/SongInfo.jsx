import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function SongInfo({ track }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{track?.title}</Text>
      <Text style={styles.artist}>{track?.artist}</Text>
      <Text style={styles.album}>{track?.album}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display:"flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
    margin:5,
    gap:3

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Darker text for title
  },
  artist: {
    fontSize: 16,
    color: 'gray', // Slightly lighter text for artist
  },
  album: {
    fontSize: 14,
    color: 'gray', // Lightest text for album
  },
})
