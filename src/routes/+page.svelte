<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import LineChart from "$lib/components/LineChart.svelte";
  import { goto } from "$app/navigation";
  import Countup from "svelte-countup";
  import moment from 'moment';

  export let data;

  const totalMonthlyPings: number = 274

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

  const salons: Salon[] = [
    {
      domain: 'ruizsalon.com',
      pings:{
        today: 1,
        week: [1,0,4,4,0,0,6],
        thisMonth: 6,
        prevMonth: 9,
        yearToDate: 23,
      }
    },
    {
      domain: 'spa-bleu.com',
      pings:{
        today: 0,
        week: [7,2,3,0,1,1,9],
        thisMonth: 1,
        prevMonth: 25,
        yearToDate: 44,
      }
    },
    {
      domain: 'copperfalls.com',
      pings:{
        today: 1,
        week: [1,0,0,0,1,0,2],
        thisMonth: 3,
        prevMonth: 0,
        yearToDate: 8,
      }
    },
  ]

  function getRating(currPings: number): string {
    const score = (((totalMonthlyPings - currPings) / totalMonthlyPings) * 100).toFixed(1)
    let rating = ''
    if (+score > 98) {
      rating = 'Exceptional!'
    } else if (+score > 90) {
      rating = 'Good!'
    } else if (+score > 80) {
      rating = 'Needs work!'
    } else if (+score > 70) {
      rating = 'Much issues!'
    } else {
      rating = "Something's up!"
    }
    return `${score}: ${rating}`
  }

  const formatter = new Intl.DateTimeFormat('en', { month: 'long', timeZone: 'UTC' });
</script>

<div class="container row top-row grid grid-cols-6 text-center gap-8">
  <div class="card py-8 border col-span-2 border-neutral-500 rounded-lg">
    <div class="icon w-40 h-40 mx-auto mb-8 rounded-full border border-neutral-500"></div>
    <h2 class="text-5xl font-bold leading-6">
      <Countup
        initial={0}
        value={data.pings.today}
        duration={500}
        step={1}
        format={true}
      /><br>
      <small class="text-base font-normal">Pings today</small>
    </h2>
  </div>
  <div class="card py-8 border col-span-2 border-neutral-500 rounded-lg">
    <div class="icon w-40 h-40 mx-auto mb-8 rounded-full border border-neutral-500"></div>
    <h2 class="text-5xl font-bold leading-6">
        <Countup
        initial={0}
        value={data.pings.lastScan}
        duration={1000}
        step={1}
        format={true}
      /><br>
      <small class="text-base font-normal">Last Scan</small>
    </h2>
  </div>
  <div class="card py-8 border col-span-2 border-neutral-500 rounded-lg">
    <div class="icon w-40 h-40 mx-auto mb-8 rounded-full border border-neutral-500"></div>
    <h2 class="text-5xl font-bold leading-6">
      <Countup
      initial={0}
      value={data.pings.thisMonth}
      duration={1000}
      step={1}
      format={true}
    /><br>
    <small class="text-base font-normal">Pings in {new Date().toLocaleString('default', { month: 'long' })}</small>
    </h2>
  </div>
  <div class="card py-8 border bg-white col-span-6 border-neutral-500 rounded-lg">
    <LineChart salons={data.days} />
  </div>

  <div class="card col-span-2 py-8 border border-neutral-500 rounded-lg">
    <Table.Root>
      <Table.Caption>Most recent pings</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head class="w-[100px]">Domain</Table.Head>
          <Table.Head class="text-right">Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each data.salons as salon}
          <Table.Row>
            <Table.Cell class="text-left font-medium">{ salon.domain }</Table.Cell>
            <Table.Cell class="text-right">{ salon.status === null ? '' : salon.status }</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>

</div>

<div class="container mt-20 mx-auto">
  <!-- <Table.Root>
    <Table.Caption>Stats for ruizsalon.com</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[100px]">Domain</Table.Head>
        <Table.Head>Today</Table.Head>
        <Table.Head>This Month</Table.Head>
        <Table.Head>Last Month</Table.Head>
        <Table.Head class="text-right">Rating</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each salons as salon}
        <Table.Row on:click={() => goto('/ruizsalon')}>
          <Table.Cell class="font-medium">{ salon.domain }</Table.Cell>
          <Table.Cell>{ salon.pings.today }</Table.Cell>
          <Table.Cell>{ salon.pings.thisMonth }</Table.Cell>
          <Table.Cell>{ getRating(salon.pings.prevMonth) }</Table.Cell>
          <Table.Cell class="text-right">{ getRating(salon.pings.thisMonth) }</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root> -->
</div>

<!-- <div class="container mx-auto" style="width: 800px;">
  <canvas bind:this={container} id="pings"></canvas>
</div> -->
