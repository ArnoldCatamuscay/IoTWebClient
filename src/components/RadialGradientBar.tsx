import { useEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useMqttStore } from '../store/mqtt-store';

const RadialGradientBar = () => {

  const maxWeight = useMqttStore(state => state.maxWeight);
  const seriesData = useMqttStore(state => state.seriesData);
  const maxWeightRef = useRef(maxWeight);
  useEffect(() => {
    maxWeightRef.current = maxWeight;
  }, [maxWeight]);
  // Define the formatter function outside of radialOptions
  const formatter = (val:any) => {
    console.log("valor de max weight: ", maxWeightRef.current);
    const res = (val * maxWeightRef.current) / 100;
    return res.toFixed(2);
  };

  
  const [radialOptions, setRadialOptions] = useState<any>({
    chart: {
      height: 350,
      type: 'radialBar',
      toolbar: {
        show: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },
            
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px'
          },
          value: {
            formatter: formatter,
            color: '#111',
            fontSize: '36px',
            show: true,
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Peso (kg)'],
  });

  // (seriesData.slice(-1)[0]*100)/maxWeight
  

  useEffect(() => {
    console.log("Use effect de series data - maxWeight: ", maxWeight)
    setRadialOptions({
      chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
              
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px'
            },
            value: {
              formatter: formatter,
              color: '#111',
              fontSize: '36px',
              show: true,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Peso (kg)'],
    });
  }, [seriesData]);

  return (
    <>
      <div id="card">
        <div id="chart">
          <p className='text-white'>{maxWeight}</p>
          <ReactApexChart 
            options={radialOptions} 
            series={[(seriesData.slice(-1)[0]*100)/maxWeightRef.current]} 
            type="radialBar" 
            height={350} 
            width={350}
          />
        </div>
      </div>
    </>
  );
};

export default RadialGradientBar;