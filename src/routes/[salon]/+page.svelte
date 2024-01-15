<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import Chart from "$components/Chart.svelte";

  const totalMonthlyPings: number = 274
  const totalPingsInAMonth: number = 600

  const salons = [
    {
      domain: 'ruizsalon.com',
      pings:{
        today: 1,
        thisMonth: 6,
        prevMonth: 9,
        yearToDate: 23,
      }
    }
  ]

  function getRating(currPings: number): string {
    const score = (((totalMonthlyPings - currPings) / totalMonthlyPings) * 100).toFixed(1)
    let rating = ''
    if (+score > 97) {
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
</script>

<h1>Welcome to SvelteKit</h1>

<div class="container mt-20 mx-auto">
  <Table.Root>
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
        <Table.Row>
          <Table.Cell class="font-medium">{ salon.domain }</Table.Cell>
          <Table.Cell>{ salon.pings.today }</Table.Cell>
          <Table.Cell>{ salon.pings.thisMonth }</Table.Cell>
          <Table.Cell>{ getRating(salon.pings.prevMonth) }</Table.Cell>
          <Table.Cell class="text-right">{ getRating(salon.pings.thisMonth) }</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>

<div class="container mx-auto">
  <Chart />
</div>