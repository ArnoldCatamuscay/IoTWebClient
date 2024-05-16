import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [lastWrite, setLastWrite] = useState<number | null>(null);
  const last_weight_url = import.meta.env.VITE_LAST_WEIGHT_URL;
  const [options, setOptions] = useState<ApexCharts.ApexOptions | undefined>();
  const [series, setSeries] = useState<ApexAxisChartSeries | ApexNonAxisChartSeries | undefined>();
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(last_weight_url);
        const jsonData = response.data;
        const { feeds } = jsonData;
        if (feeds && feeds.length > 0) {
          setLastWrite(feeds[0].field1);
          // setCreatedAt(feeds[0].created_at);
          const utcDate = new Date(feeds[0].created_at);
          // setCreatedAt(utcDate.toLocaleTimeString() + " "+ utcDate.toLocaleDateString());
          // setCreatedAt(utcDate.toString());
          setCreatedAt(utcDate.toLocaleString());
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
              categories: [ utcDate.toLocaleString(), utcDate.toLocaleString() ],
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
          setSeries([{
            data: [ feeds[0].field1, 83]
          }])
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Llamar a la función de solicitud de datos al montar el componente
  }, []); // El segundo argumento [] indica que este efecto se ejecuta solo una vez, equivalente a componentDidMount

  // Función para agregar un nuevo valor a 'data'
  const addNewData = () => {
    // Creamos una copia del estado actual
    const newData = [...data];
    // Agregamos el nuevo valor (en este caso, un número aleatorio)
    newData.push(Math.random());
    // Establecemos la copia actualizada como el nuevo estado
    setData(newData);
  };

  return (
    <div>
      <div>
      {createdAt && lastWrite && ( // Renderizar solo si createdAt y field1 no son nulos
        <ReactApexChart options={options} series={series} type="line" height={350} />
      )}
      </div>
    </div>
  );
};

export default ApexChart;