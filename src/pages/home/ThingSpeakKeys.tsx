import { useEffect, useState } from "react"
import { useMqttStore } from "../../store/mqtt-store";
import { ConnectionOptions, SubscribeOptions } from "paho-mqtt";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const ThingSpeakKeys = () => {
  
  const updateClientPaho = useMqttStore(state => state.updateClientPaho);
  const { host, port, path, clientPaho } = useMqttStore();

  //Eje Y
  const [options, setOptions] = useState<ApexCharts.ApexOptions | undefined>();
  // const [localCategories, setLocalCategories] = useState<string[]>([]);

  //Eje X
  const [series, setSeries] = useState<ApexAxisChartSeries | ApexNonAxisChartSeries | undefined>();
  // const [localSeriesData, setLocalSeriesData] = useState<number[]>([]);

  // Get last weight from ThingSpeak
  const last_weight_url = import.meta.env.VITE_LAST_WEIGHT_URL;
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
        updateCategories(utcDate.toLocaleString());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setOptions({
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
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Dynamic Updating Chart',
        align: 'center'
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'category',
        // range: XAXISRANGE,
        categories: categories,
        title: {text: 'Date and Time'}
      },
      yaxis: {
        max: 100,
        title: {text: 'Weight (kg)'}
      },
      legend: {
        show: false
      },
    })
  }, [categories])

  useEffect(() => {
    setSeries([{
      data: seriesData,
    }])
    
  }, [seriesData])

  useEffect(() => {
    // updateClientPaho();
    // console.log('Channel ID: ', channelId)
    // console.log('Client paho: ', clientPaho!.host, clientPaho!.port, clientPaho!.path, clientPaho!.clientId/*, clientPaho.isConnected()*/);
    // clientPaho.onConnectionLost = onConnectionLost;
    // clientPaho.onMessageArrived = onMessageArrived;
    // clientPaho.connect(connectOptions);
    // fetchData();
  }, []);

  useEffect(() => {
    if (clientId !== null) {
      console.log('URL: ', host, ':', port, path);
      console.log('Client id property:', clientId);
      console.log('Client id from Client Paho:', clientPaho.clientId);
      console.log('Is connected?: ', clientPaho.isConnected());
    }
    if(clientId !== '' && username !== '' && password !== '' && clientPaho.isConnected() === false) {
      clientPaho.onConnectionLost = onConnectionLost;
      clientPaho.onMessageArrived = onMessageArrived;
      clientPaho.connect(connectOptions);
      fetchData();
    }
  }, [clientPaho]);

  const channelId = useMqttStore(state => state.channelId);
  const readApiKey = useMqttStore(state => state.readApiKey);
  const writeApiKey = useMqttStore(state => state.writeApiKey);
  const clientId = useMqttStore(state => state.clientId);
  const username = useMqttStore(state => state.username);
  const password = useMqttStore(state => state.password);

  const updateChannelId = useMqttStore(state => state.updateChannelId);
  const updateReadApiKey = useMqttStore(state => state.updateReadApiKey);
  const updateWriteApiKey = useMqttStore(state => state.updateWriteApiKey);
  const updateClientId = useMqttStore(state => state.updateClientId);
  const updateUsername = useMqttStore(state => state.updateUsername);
  const updatePassword = useMqttStore(state => state.updatePassword);
  
  const connectOptions: ConnectionOptions = {
    userName: username,
    password: password,
    keepAliveInterval: 60, // Optional (default 60)
    reconnect: true,
    onSuccess: () => {
      console.log("Conected to Thingspeak via Websocket!!");
      clientPaho!.subscribe("channels/2543925/subscribe", subscribeOptions);
    },
    onFailure: () => {console.log('Failed to connect...')},
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
    // setLocalSeriesData((prevState) => [...prevState, Number(field1)]);
    // setLocalCategories((prevState) => [...prevState, utcDate.toLocaleString()]);
    updateCategories(utcDate.toLocaleString());
    updateSeriesData(Number(field1));
  }
  //* End of MQTT

  const [thingSpeak, setThingSpeak] = useState({
    channelId: '',
    readApiKey: '',
    writeApiKey: '',
    clientId: '',
    username: '',
    password: '',
  });

  const handleOnChange = ( {target: {name, value}}: any) => {
    setThingSpeak({...thingSpeak, [name]: value})
  }

  const handleUpdateKeys = () => {
    if(thingSpeak.channelId) {
      updateChannelId(thingSpeak.channelId);
    }
    if(thingSpeak.readApiKey) {
      updateReadApiKey(thingSpeak.readApiKey);
    }
    if(thingSpeak.writeApiKey) {
      updateWriteApiKey(thingSpeak.writeApiKey);
    }
    if(thingSpeak.clientId) {
      updateClientId(thingSpeak.clientId);
      updateClientPaho();
    }
    if(thingSpeak.username) {
      updateUsername(thingSpeak.username);
    }
    if(thingSpeak.password) {
      updatePassword(thingSpeak.password);
    }
  }

  return (
    // <div className="flex-col md:flex-row md:flex-wrap mt-4">
    <div className="mt-4">
      {/* <h2 className="text-2xl font-bold text-center">Categories: |{categories}|</h2>
      <h2 className="text-2xl font-bold text-center">Series data: |{seriesData}|</h2> */}
      <div className="ml-2">
        <div>
          {series && options && (
            <ReactApexChart options={options} series={series} type="line" height={350} />
          )}
        </div>
      </div>
      <form className="md:w-max md:max-w-sm mb-4 ml-4 mr-4">
        {/* Channel ID */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="channelId">
              Channel ID
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              name="channelId"
              id="channelId"
              placeholder={channelId}
              onChange={handleOnChange}
            />
          </div>
        </div>
        {/* Read Api Key */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="readApiKey">
              Read Api Key
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              name="readApiKey"
              id="readApiKey"
              placeholder={readApiKey}
              onChange={handleOnChange}
            />
          </div>
        </div>
        {/* Write Api Key */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="writeApiKey">
              Write Api Key
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              name="writeApiKey"
              id="writeApiKey"
              placeholder={writeApiKey}
              onChange={handleOnChange}
            />
          </div>
        </div>
        {/* Client ID */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="clientId">
              Client ID
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              name="clientId"
              id="clientId"
              placeholder={clientId}
              onChange={handleOnChange}
            />
          </div>
        </div>
        {/* Username */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="username">
              Username
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              name="username"
              id="username"
              placeholder={username}
              onChange={handleOnChange}
            />
          </div>
        </div>
        {/* Password */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="password"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              name="password"
              id="password"
              placeholder="**************"
              onChange={handleOnChange}
            />
          </div>
        </div>
        {/* Button */}
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-[#073B4C] hover:bg-[#118AB2] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleUpdateKeys}
            >
              Actualizar credenciales
            </button>
          </div>
        </div>
      </form>
      
    </div>
  )
}

export default ThingSpeakKeys
