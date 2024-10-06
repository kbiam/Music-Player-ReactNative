import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Slider from '@react-native-community/slider'
import { useProgress } from 'react-native-track-player'
import TrackPlayer from 'react-native-track-player'

export default function SliderSong() {
    const { position, duration } = useProgress()

    const handleSliderChnage = async(value)=>{
      // const newPosition = Math.round(value)
      await TrackPlayer.seekTo(value)
    }

    return (
        <View style={styles.container}>
            <Slider 
                style={styles.slider}
                value={position}
                minimumValue={0}
                maximumValue={duration}
                minimumTrackTintColor="#6200EE" // Purple for the minimum track
                maximumTrackTintColor="#d3d3d3" // Light gray for the maximum track
                thumbTintColor="#6200EE" // Same color for the thumb
                onValueChange={handleSliderChnage}
                
            />
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}> {new Date(position * 1000).toISOString().substring(15, 19)} </Text>
                <Text style={styles.timeText}> {new Date((duration - position) * 1000).toISOString().substring(15, 19)} </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        padding: 16,

    },
    slider: {
        width: '100%', // Use full width of the container
        height: 40,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    timeText: {
        color: 'white', // Darker color for time text
        fontSize: 14,
    },
})
