import TrackPlayer, { Event, RepeatMode, Capability } from "react-native-track-player";
import { playListData } from "./Constants";
import { Platform } from "react-native";


const notificationChannel = async ()=>{
    if(Platform.OS === 'android'){
        await TrackPlayer.notificationChannel({
            id: 'track-player',
            name: 'Track Player',
            description: 'Controls the music playback',
            importance: TrackPlayer.Importance.HIGH,
        })
    }
}
const setupRemoteControls = async () => {
    await TrackPlayer.updateOptions({
        stopWithApp: false,
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SeekTo,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
        ],
        notificationCapabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
        ],
    });
};


export async function SetupPlayer() {
    let isSetup = false
    try {
        await TrackPlayer.getActiveTrackIndex()
        isSetup = true
    } catch (error) {
        await TrackPlayer.setupPlayer()
        await setupRemoteControls()
        // await notificationChannel()

        isSetup = true
    }
    finally{
        return isSetup
    }
}

export async function addTrack() {
    await TrackPlayer.add(playListData)
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export  async function MusicPlayerService(){

    TrackPlayer.addEventListener(Event.RemotePause,()=>{
        TrackPlayer.pause()
    })
    TrackPlayer.addEventListener(Event.RemotePlay,()=>{
        TrackPlayer.play()
    })
    TrackPlayer.addEventListener(Event.RemoteNext,()=>{
        TrackPlayer.skipToNext()
    })
    TrackPlayer.addEventListener(Event.RemotePrevious,()=>{
        TrackPlayer.skipToPrevious()
    })
}
