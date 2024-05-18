import { create } from 'zustand'
// import { persist } from 'zustand/middleware'
import Paho from 'paho-mqtt';

interface State {
  //REST
  channelId: string
  readApiKey: string
  writeApiKey: string
  //MQTT
  host: string //mqtt3.thingspeak.com
  port: number //80
  path: string //"/mqtt"
  clientId: string 
  username: string 
  password: string 
  clientPaho: Paho.Client
  //Update functions
  updateChannelId: (newChannelId: string) => void
  updateReadApiKey: (newReadApiKey: string) => void
  updateWriteApiKey: (newWriteApiKey: string) => void
  updateClientId: (newClientId: string) => void
  updateUsername: (newUsername: string) => void
  updatePassword: (newPassword: string) => void
  updateClientPaho: () => void
  //clear
  clear: () => void
}

export const useMqttStore = create<State>()(
  
    (set, get)=>({
      channelId: '',
      readApiKey: '',
      writeApiKey: '',
      host: 'mqtt3.thingspeak.com', 
      port: 80, 
      path: '/mqtt', 
      clientId: '',
      username: '',
      password: '',
      clientPaho: new Paho.Client("mqtt3.thingspeak.com", 80, "/mqtt", ''),
      //* <----------------  Updates ---------------->
      updateChannelId: (newChannelId: string) => {
        set({ channelId: newChannelId })
      },  
      updateReadApiKey: (newReadApiKey: string) => set({ readApiKey: newReadApiKey }),
      updateWriteApiKey: (newWriteApiKey: string) => set({ writeApiKey: newWriteApiKey }),
      updateClientId: (newClientId: string) => {
        set({ clientId: newClientId })
      },
      updateUsername: (newUsername: string) => set({ username: newUsername }),
      updatePassword: (newPassword: string) => set({ password: newPassword }),
      updateClientPaho: () => {
        const { clientId } = get()
        console.log('clientId from MQTT-STORE: ', clientId)
        const newClientPaho = new Paho.Client("mqtt3.thingspeak.com", 80, "/mqtt", clientId)
        set({ clientPaho: newClientPaho })
      },
      //* <----------------  Clear ---------------->
      clear: () => {
        set({ 
          channelId: '',
          readApiKey: '',
          writeApiKey: '',
          clientId: '',
          username: '',
          password: '',
          clientPaho: new Paho.Client("mqtt3.thingspeak.com", 80, "/mqtt", '')
        })
      }
    }),
   
  
)