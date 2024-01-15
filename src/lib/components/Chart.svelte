<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto'
  
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

  const weekArr: Day[] = []
  const date = new Date();
  for (let i = 0; i < 7; i++) {
    const timestamp = new Date(date.setDate(date.getDate() - i))
    const dayOfWeek = {
      date: timestamp.getDate(),
      month: timestamp.getMonth() + 1,
      year: +String(timestamp.getFullYear()).substring(2),
      dayOfWeek: {
        long: timestamp.toLocaleDateString('en-us', { weekday: 'long' }),
        short: timestamp.toLocaleDateString('en-us', { weekday: 'short' }),
      }
    }
    weekArr.push(dayOfWeek)
  }

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

      new Chart(
        container, {
          type: 'bar',
          data: {
            labels: weekArr.map(day => `${day.dayOfWeek.short} ${day.date}/${day.month}/${day.year}`),
            datasets: [
              {
                label: 'Pings per day',
                data: data.map(row => row.count),
                backgroundColor: '#ff333332'
              }
            ]
          }
        }
      );
    })();
  });
</script>

<div class="container mx-auto" style="width: 800px;">
  <canvas bind:this={container} id="pings"></canvas>
</div>