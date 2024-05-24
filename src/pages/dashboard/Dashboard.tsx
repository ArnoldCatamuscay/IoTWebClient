import { useEffect, useState } from "react"
import { useMqttStore } from "../../store/mqtt-store";
import { ConnectionOptions, SubscribeOptions } from "paho-mqtt";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { db } from "../../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import { toast } from "sonner";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
// import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

const Dashboard = () => {
  const [selectedTime, setSelectedTime] = useState<any>(null)
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
    useSSL: true,
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
  
  console.log(selectedTime)
  console.log('Fecha y hora:', selectedTime?.$d)
  console.log('Horario:', selectedTime?.$H, selectedTime?.$m)
  
  return (
    // <div className="flex-col md:flex-row md:flex-wrap mt-4">
    <div className="mt-4">
      
      
      {/* Imagenes */}
      {/* <div className=" grid grid-cols-2 place-items-center">
        <img src="/dog-landing.png" className="h-40 w-50 sm:h-60 sm:w-70 sm:mt-9"/>
        <img src="/card-6.png" className="h-70 w-80 md:h-90 md:w-100"/>
      </div> */}
      
      {/* Segunda fila: Peso máximo y Horarios */}
      <div className="sm:flex items-center justify-center my-4 sm:space-x-10 space-y-4 sm:space-y-0">

        {/* Cantidad máxima de peso */}
        <div className="bg-[#1f2937] px-4 pb-6 rounded-lg mx-4 sm:mx-0">
          
          {/* Heading and Icon */}
          <div className="flex flex-row justify-center items-center p-4 text-white">
            <h2 className="text-xl md:text-2xl font-semibold mr-2">Peso máx. por comida</h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
            </svg>
          </div>

          {/* Max. weight Input and Button */}
          <div className="flex flex-row items-center justify-center space-x-2">
            <input
              type="number"
              min={0}
              className="w-1/4 p-3.5 bg-[#374151] border-2 border-[#969da9] rounded-md placeholder:font-light placeholder:text-[#969da9] text-white focus:outline-none focus:border-blue-500"
              name="maxWeight"
              id="maxWeight"
              placeholder='xx'
            />          
            <button onClick={()=>{alert('Boton editar peso máximo'); }} className="text-white w-auto justify-center py-3.5 px-3.5 bg-[#1a56db] hover:bg-[#1d4ed8] rounded-md flex items-center gap-2 hover:scale-95 transition-all">
              {/* <span className="text-xl">Editar</span> */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>
          </div>

        </div>

        {/* Horarios y Dispensar Ahora */}
        <div className="bg-[#1f2937] px-4 pb-6 rounded-lg mx-4 sm:mx-0">
          {/* Heading and Icon  */}
          <div className="flex flex-row justify-center items-center p-4 text-white">
            <h2 className="text-xl md:text-2xl font-semibold mr-2">Establecer horarios</h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          
          {/* Time Picker */}
          <div className="flex flex-row items-center justify-center space-x-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                label="Horario"
                value={selectedTime}
                onChange={(newValue: any) => setSelectedTime(newValue)}
                orientation="portrait"
                sx={{ width: 100 }}
                slotProps={{
                  textField: {
                    className: "bg-[#374151] rounded-md"
                  },
                }}
              />
              {/* <TimePicker
                label="With Time Clock"
                value={selectedTime}
                onChange={(newValue: any) => setSelectedTime(newValue)}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                }}
              /> */}
            </LocalizationProvider>
              
            <button onClick={()=>{alert('Boton agregar horario'); }} className="text-white w-auto justify-center py-3.5 px-3.5 bg-[#1a56db] hover:bg-[#1d4ed8] rounded-md flex items-center gap-2 hover:scale-95 transition-all">
              {/* <span className="text-xl">Agregar</span> */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>

            <button onClick={()=>{alert('Boton eliminar horario'); }} className="w-auto justify-center py-3.5 px-3.5 rounded-md flex items-center gap-2 hover:scale-95 transition-all text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              {/* <span className="text-xl">Eliminar</span> */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
              </svg>
            </button>

          </div>

          <div className="py-3 flex items-center text-sm text-white before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
            o
          </div>

          {/* Boton Dispensar Ahora */}
          <div className="flex justify-center">
            <button onClick={()=>{alert('Boton dispensar ahora'); }} className="text-white w-auto justify-center py-3.5 px-3.5 bg-[#1a56db] hover:bg-[#1d4ed8] rounded-md flex items-center gap-2 hover:scale-95 transition-all">
              <span className="text-xl">Dispensar ahora</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
              </svg>
            </button>
          </div>

        </div>

      </div>

      {/* Primera fila: Gráfico de peso */}
      {/* <h2 className="text-2xl font-bold text-center">Categories: |{categories}|</h2>
      <h2 className="text-2xl font-bold text-center">Series data: |{seriesData}|</h2> */}
      {/* <div className="ml-2 mr-1"> */}
      <div className="my-4 px-4 mr-1">
        <div className="bg-[#0d2136] px-2">
          {series && options && (
            <ReactApexChart options={options} series={series} type="line" height={350} />
          )}
        </div>
      </div>

    </div>
  )
}

export default Dashboard
