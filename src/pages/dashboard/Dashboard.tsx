import { useEffect, useState } from "react"
import { useMqttStore } from "../../store/mqtt-store";
import { ConnectionOptions, SubscribeOptions } from "paho-mqtt";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { db } from "../../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useAuth();
  const host = useMqttStore(state => state.host);
  const port = useMqttStore(state => state.port);
  const path = useMqttStore(state => state.path);
  //* MQTT
  const channelId = useMqttStore(state => state.channelId);
  const readApiKey = useMqttStore(state => state.readApiKey);
  const writeApiKey = useMqttStore(state => state.writeApiKey);
  const clientId = useMqttStore(state => state.clientId);
  const username = useMqttStore(state => state.username);
  const password = useMqttStore(state => state.password);
  const clientPaho = useMqttStore(state => state.clientPaho);
  const keysSetted = useMqttStore(state => state.keysSetted);
  //* MQTT Updates
  const updateChannelId = useMqttStore(state => state.updateChannelId);
  const updateReadApiKey = useMqttStore(state => state.updateReadApiKey);
  const updateWriteApiKey = useMqttStore(state => state.updateWriteApiKey);
  const updateClientId = useMqttStore(state => state.updateClientId);
  const updateUsername = useMqttStore(state => state.updateUsername);
  const updatePassword = useMqttStore(state => state.updatePassword);
  const updateClientPaho = useMqttStore(state => state.updateClientPaho);
  const updateKeysSetted = useMqttStore(state => state.updateKeysSetted);

  //* Chart
  //Eje Y
  const [options, setOptions] = useState<ApexCharts.ApexOptions | undefined>();
  //Eje X
  const [series, setSeries] = useState<ApexAxisChartSeries | ApexNonAxisChartSeries | undefined>();
  // Get last weight from ThingSpeak
  const last_weight_url = `https://api.thingspeak.com/channels/${channelId}/fields/1.json?api_key=${readApiKey}&results=1`;
  const { categories, seriesData } = useMqttStore();
  const updateCategories = useMqttStore(state => state.updateCategories);
  const updateSeriesData = useMqttStore(state => state.updateSeriesData);
  const fetchData = async () => {
    try {
      const response = await axios.get(last_weight_url);
      const jsonData = response.data;
      const { feeds } = jsonData;
      if (feeds && feeds.length > 0) {
        // setLocalSeriesData((prevState) => [...prevState, Number(feeds[0].field1)]);
        updateSeriesData(Number(feeds[0].field1));
        const utcDate = new Date(feeds[0].created_at);
        // setLocalCategories((prevState) => [...prevState, utcDate.toLocaleString()]);
        updateCategories(utcDate.toLocaleTimeString());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    setOptions({
      // colors : ['#5085de'],
      chart: {
        id: 'realtime',
        height: 350,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Sensor de peso',
        align: 'center',
        style: {
          color: '#98938c'
        }
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'category',
        // range: XAXISRANGE,
        categories: categories,
        title: {
          text: 'Fecha y hora',
          style: {
            color: '#98938c'
          }
        },
        labels: {
          style: {
            colors: '#98938c'
          }
        }
      },
      yaxis: {
        max: 100,
        title: {
          text: 'Peso (kg)',
          style: {
            color: '#98938c'
          }
        },
        labels: {
          style: {
            colors: '#98938c'
          }
        }
      },
      legend: {
        show: false
      },
      grid: {
        borderColor: '#FBEAEB',
        strokeDashArray: 5,
        yaxis: {
          lines: {
            show: true
          }
        },
        xaxis: {
          lines: {
            show: true
          }
        }
      }
    })
  }, [categories])
  useEffect(() => {
    setSeries([{
      data: seriesData,
      name: 'Peso (kg)',
      color: '#5085de'
    }])
    
  }, [seriesData])

  //* Obtenemos las keys de Firestore para asignarlas en el estado global
  const getKeys = async () => {
    const docRef = doc(db, "keys", user.email);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists() && !keysSetted) { 
      console.log("Document data:", docSnap.data());
      updateChannelId(docSnap.data().channelId);
      updateReadApiKey(docSnap.data().readApiKey);
      updateWriteApiKey(docSnap.data().writeApiKey);
      updateClientId(docSnap.data().clientId);
      updateUsername(docSnap.data().username);
      updatePassword(docSnap.data().password);
      updateClientPaho();
      updateKeysSetted(true); 
    } else if (!docSnap.exists()) {
      console.log("No such document!");
    } else if (keysSetted) {
      console.log("Already set!");
    }
  }

  useEffect(() => {
    getKeys();
  },[]);

  //* MQTT Connection
  useEffect(() => {
    
    if (clientId !== null) {
      console.log('URL: ', host, ':', port, path);
      console.log('Client id property:', clientId);
      console.log('Client id from Client Paho:', clientPaho.clientId);
      console.log('Is connected?: ', clientPaho.isConnected());
    }
    if(channelId !== '' && username !== '' && password !== '' && clientPaho.clientId !== '' && clientPaho.isConnected() === false) {
      console.log('ENTRO AL USE EFFECT DE MQTT CONECTAR')
      clientPaho.onConnectionLost = onConnectionLost;
      clientPaho.onMessageArrived = onMessageArrived;
      clientPaho.connect(connectOptions);
      fetchData();
    }
  }, [keysSetted]);
  
  const connectOptions: ConnectionOptions = {
    userName: username,
    password: password,
    keepAliveInterval: 60, // Optional (default 60)
    reconnect: true,
    onSuccess: () => {
      console.log("Conected to Thingspeak via Websocket!!");
      clientPaho!.subscribe(`channels/${channelId}/subscribe`, subscribeOptions);
    },
    onFailure: () => {
      console.log('Failed to connect...')
      toast.error('No se pudo conectar al servidor. Verifique las claves de conexión.');
    },
  };

  const subscribeOptions: SubscribeOptions = {
    onSuccess: () => {console.log('Subscription successful')},
    onFailure: () => {console.log('Subscription failed')},
  };

  function onConnectionLost(responseObject: any) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  function onMessageArrived(message: any) {
    console.log("onMessageArrived:"+message.payloadString);
    const payloadJson = JSON.parse(message.payloadString);
    const { field1, created_at } = payloadJson;
    const utcDate = new Date(created_at);
    console.log('Last write:', field1, 'kg', 'at:', utcDate.toLocaleString());
    updateCategories(utcDate.toLocaleTimeString());
    updateSeriesData(Number(field1));
  }
  //* End of MQTT

  return (
    // <div className="flex-col md:flex-row md:flex-wrap mt-4">
    <div className="mt-4">
      {/* <h2 className="text-2xl font-bold text-center">Categories: |{categories}|</h2>
      <h2 className="text-2xl font-bold text-center">Series data: |{seriesData}|</h2> */}
      <div className="ml-2 mr-1">
        <div className="bg-[#0d2136] px-2">
          {series && options && (
            <ReactApexChart options={options} series={series} type="line" height={350} />
          )}
        </div>
      </div>
      <div className=" grid grid-cols-2 place-items-center">
        <img src="/dog-landing.png" className="h-40 w-50 sm:h-60 sm:w-70 sm:mt-9"/>
        <img src="/card-6.png" className="h-70 w-80 md:h-90 md:w-100"/>
      </div>
    </div>
  )
}

export default Dashboard
