<script lang="ts">
	import '../app.postcss';
	import './styles.css';
	import { db } from '$lib/stores/db';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Button,
		Modal,
		DarkMode
	} from 'flowbite-svelte';

	let showDownloadModal = false;

	let blob: Blob | null;
	let url: string = '';

	$: if (showDownloadModal) {
		blob = new Blob([JSON.stringify($db, null, 2)], { type: 'application/json' });
		url = URL.createObjectURL(blob);
	} else {
		url = '';
		blob = null;
	}
</script>

<div class="h-screen overflow-hidden">
	<Navbar let:hidden let:toggle navClass="px-2 sm:px-4 py-2.5 w-full dark:bg-gray-800">
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				Inventory Manager
			</span>
		</NavBrand>
		<div class="flex md:order-2 gap-2">
			<DarkMode />
			<Button size="sm" class="hidden md:block" on:click={() => (showDownloadModal = true)}
				>Download Items</Button
			>
			<NavHamburger on:click={toggle} />
		</div>
		<NavUl {hidden} class="order-1">
			<NavLi href="/">Home</NavLi>
			<NavLi href="/items">Items</NavLi>
			<Button size="sm" class="md:hidden mt-2" on:click={() => (showDownloadModal = true)}
				>Download Items</Button
			>
		</NavUl>
	</Navbar>

	<Modal bind:open={showDownloadModal} size="xs" autoclose>
		<div class="text-center">
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				Click the button to download the inventory database
			</h3>
			<Button
				disabled={!url}
				href={url}
				download="inventory.json"
				on:click={() => (showDownloadModal = false)}>Download</Button
			>
			<Button color="alternative">Cancel</Button>
		</div>
	</Modal>

	<main class="h-full overflow-auto pb-16">
		<slot />
	</main>
	<footer />
</div>
