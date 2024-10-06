import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TrackPlayer, { Event, useTrackPlayerEvents } from 'react-native-track-player'
import SongInfo from '../components/SongInfo'
import Slider from '../components/SliderSong'
import ControlCentre from '../components/ControlCentre'

export default function MusicPlayer() {
  const [track, setTrack] = useState(null)

  const getInitialTrack = async()=>{
    const playingTrack = await TrackPlayer.getActiveTrack()
    setTrack(playingTrack)
  }

  useEffect(() => {
    getInitialTrack()

  }, [])
  
  // Track Player Event Handling
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const playingTrack = await TrackPlayer.getTrack(event.nextTrack)
      setTrack(playingTrack)
    }
  })

  // Function to render artwork directly for the current track
  const renderArtWork = () => {
    if (track?.artwork) {
      return <Image source={{ uri: track.artwork.toString() }} style={styles.artwork} />
    } else {
      return <Text style={styles.noArtworkText}>No Artwork Available</Text>
    }
  }

  return (
    <View style={styles.container}>
      {/* Directly render the artwork */}
      <View style={styles.artworkContainer}>
        {renderArtWork()}
      </View>
      
      {/* Song Information, Slider, and Control Centre */}
      <SongInfo track={track} />
      <Slider />
      <ControlCentre />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#001B1D',
  },
  artworkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  artwork: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  noArtworkText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
  },
})
