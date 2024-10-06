import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import {SetupPlayer, addTrack} from './MusicPlayerService'
import TrackPlayer from 'react-native-track-player'
import ControlCentre from './components/ControlCentre'
import MusicPlayer from './screens/MusicPlayer'

export default function App() {

  const [isPlayerReady, setisPlayerReady] = useState(false)

  async function setupPlayer() {
    const isReady = await SetupPlayer()

    if(isReady){
      await addTrack()
    }
    setisPlayerReady(isReady)
  }

  useEffect(() => {
    setupPlayer()
  }, [])

  if(!isPlayerReady){
    return (
      <SafeAreaView style={{flex:1, justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator  size={'large'}/>
      </SafeAreaView>
    )
  }
  
  return (
    <View style={{flex:1}}>
      <MusicPlayer/>
    </View>
  )
}

const styles = StyleSheet.create({})