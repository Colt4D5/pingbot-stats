<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto'
  import moment from 'moment';

  type Salon = {
    domain: string;
    pings: {
      today: number;
      week: number[],
      thisMonth: number;
      prevMonth: number;
      yearToDate: number;
    }
  }

  export let salons: Salon[]
  
  let container: HTMLCanvasElement;

  type Day = {
    date: number,
    month: number,
    year: number,
    dayOfWeek: {
      long: string,
      short: string
    }
  }

  // const weekArr: Day[] = []
  // const date = new Date();
  // for (let i = 0; i < 7; i++) {
  //   const timestamp = new Date(date.setDate(date.getDate() - i))
  //   const dayOfWeek = {
  //     date: timestamp.getDate(),
  //     month: timestamp.getMonth() + 1,
  //     year: +String(timestamp.getFullYear()).substring(2),
  //     dayOfWeek: {
  //       long: timestamp.toLocaleDateString('en-us', { weekday: 'long' }),
  //       short: timestamp.toLocaleDateString('en-us', { weekday: 'short' }),
  //     }
  //   }
  //   weekArr.push(dayOfWeek)
  // }

  onMount(() => {
    (async function() {
      const data = [
        { year: 2010, count: 2 },
        { year: 2011, count: 7 },
        { year: 2012, count: 0 },
        { year: 2013, count: 2 },
        { year: 2014, count: 5 },
        { year: 2015, count: 11 },
        { year: 2016, count: 1 },
      ];

      const weekArr = [0,1,2,3,4,5,6,7].map(daysAgo => moment().subtract(daysAgo, 'days').format("YYYY-MM-DD"));
      const chartData = {}
      weekArr.forEach((day, i) => {
        chartData[day] = salons[day] || 0
      })

      // console.log(weekArr);
      // console.log(chartData);

      const config = {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      };

      new Chart(
        container, {
          type: 'bar',
          data: {
            labels: weekArr.reverse().map((label, i) => {
              switch (i) {
                case weekArr.length - 1:
                  return 'Today'
                  break;
                case weekArr.length - 2:
                  return 'Yesterday'
                  break;
              
                default:
                  return label
                  break;
              }
            }),
            datasets: [
              {
                label: 'Pings',
                data: weekArr.map(day => chartData[day]),
                backgroundColor: '#ff333366'
              }
            ]
          },
        }
      );
    })();
  });
</script>

<div class="container mx-auto" style="width: 800px;">
  <canvas bind:this={container} id="pings"></canvas>
</div>