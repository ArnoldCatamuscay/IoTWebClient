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
  keysSetted: boolean
  //Update functions
  updateChannelId: (newChannelId: string) => void
  updateReadApiKey: (newReadApiKey: string) => void
  updateWriteApiKey: (newWriteApiKey: string) => void
  updateClientId: (newClientId: string) => void
  updateUsername: (newUsername: string) => void
  updatePassword: (newPassword: string) => void
  updateClientPaho: () => void
  updateKeysSetted: (newValue: boolean) => void
  //clear
  clear: () => void
  //Chart
  categories: string[],
  seriesData: number[],
  updateCategories: (newCategorie: string) => void
  updateSeriesData: (newData: number) => void
  clearCategories: () => void
  clearSeriesData: () => void
  //Max weight
  maxWeight: number
  updateMaxWeight: (newMaxWeight: number) => void
}

export const useMqttStore = create<State>()(
  
    (set, get)=>({
      channelId: '',
      readApiKey: '',
      writeApiKey: '',
      host: 'mqtt3.thingspeak.com', 
      port: 443, 
      path: '/mqtt', 
      clientId: '',
      username: '',
      password: '',
      clientPaho: new Paho.Client("mqtt3.thingspeak.com", 443, "/mqtt", ''),
      keysSetted: false,
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
        const newClientPaho = new Paho.Client("mqtt3.thingspeak.com", 443, "/mqtt", clientId)
        set({ clientPaho: newClientPaho })
      },
      updateKeysSetted: (newValue: boolean) => set({ keysSetted: newValue }),
      //* <----------------  Clear ---------------->
      clear: () => {
        set({ 
          channelId: '',
          readApiKey: '',
          writeApiKey: '',
          clientId: '',
          username: '',
          password: '',
          clientPaho: new Paho.Client("mqtt3.thingspeak.com", 443, "/mqtt", ''),
          categories: [],
          seriesData: []
        })
      },
      //* <----------------  Chart ---------------->
      categories: [],
      seriesData: [],
      updateCategories: (newCategorie: string) => {
        const { categories } = get()
        set({ categories: [...categories, newCategorie]})
      },
      updateSeriesData: (newData: number) => {
        const { seriesData } = get()
        set({ seriesData: [...seriesData, newData] })
      },
      clearCategories: () => set({ categories: [] }),
      clearSeriesData: () => set({ seriesData: [] }),
      //* <----------------  Max weight ---------------->
      maxWeight: 100,
      updateMaxWeight: (newMaxWeight: number) => set({ maxWeight: newMaxWeight }),
    }),
    
)