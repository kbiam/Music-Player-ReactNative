import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {addTrack, SetupPlayer} from '../MusicPlayerService'
import TrackPlayer,{State, usePlaybackState} from 'react-native-track-player'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function ControlCentre() {

    const playBackState =  usePlaybackState()

    const skipToPrevious = async()=>{
        await TrackPlayer.skipToPrevious()
    }
    const skipToNext = async()=>{
        await TrackPlayer.skipToNext()
    }
    const togglePlayPause = async (playback: State) => {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      // console.log(currentTrack)
      if (currentTrack !== null) {  // Ensure currentTrack is valid
          if (playback.state === State.Paused || playback.state === State.Ready) {
              await TrackPlayer.play();
          } else {
              await TrackPlayer.pause();
          }
      } else {
          console.log("No track currently loaded.");
      }
   };
   

   return (
    <View style={styles.controlContainer}>
       <Pressable onPress={skipToPrevious} style={styles.controlButton}>
          <Icon name='skip-previous' size={40} color = {"white"}/>
       </Pressable>
       <Pressable onPress={() => togglePlayPause(playBackState)} style={styles.controlButton}>
          <Icon name={playBackState.state === State.Playing ? "pause" : "play-arrow"} size={75} color = {"white"} />
       </Pressable>
       <Pressable onPress={skipToNext} style={styles.controlButton}>
          <Icon name='skip-next' size={40} color = {"white"} />
       </Pressable>
    </View>
 );
 
}

const styles = StyleSheet.create({
  controlContainer: {
     flexDirection: 'row',
     justifyContent: 'space-evenly',
     alignItems: 'center',
     marginTop: 20,
  },
  controlButton: {
     padding: 10,
  },
});
