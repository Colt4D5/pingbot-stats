<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
  import * as Drawer from "$lib/components/ui/drawer";
  import { Button } from "$lib/components/ui/button";

  import MdCloudDownload from 'svelte-icons/md/MdCloudDownload.svelte'
</script>

<Drawer.Root>
  <header class="flex p-4 mb-12 justify-between items-center bg-[var(--bg-color)] border-slate-800 border-b-2 shadow shadow-neutral-900">
    <a href="/">
      <Avatar.Root>
        <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar.Root>
    </a>
    <nav>
      <ul class="flex items-center gap-4">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li>
          <Drawer.Trigger class="flex items-center">
            <Button class="flex gap-2 items-center">
              <MdCloudDownload />
              Download
            </Button>
          </Drawer.Trigger>
        </li>
      </ul>
    </nav>
  </header>


  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
      <Drawer.Description>This action cannot be undone.</Drawer.Description>
    </Drawer.Header>
    <Drawer.Footer>
      <Button>Submit</Button>
      <Drawer.Close>Cancel</Drawer.Close>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
