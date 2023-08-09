<script lang="ts">
	import { goto } from '$app/navigation';
	import { db, itemsList } from '$lib/stores/db';
	import { v4 as uuidv4 } from 'uuid';

	import {
		TableSearch,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		Button
	} from 'flowbite-svelte';

	let searchValue = '';
	$: searchableValues = searchValue.toLowerCase().split(' ');

	$: itemIndex = $itemsList.reduce((acc, item) => {
		acc[item.id] = JSON.stringify(item).toLowerCase().trim();
		return acc;
	}, {} as { [id: string]: string });

	$: filtered = $itemsList.filter((item) =>
		searchableValues.every((term) => itemIndex[item.id].includes(term))
	);

	$: properties = Array.from(new Set(filtered.map((i) => Object.keys(i.properties)).flat()));

	function createItem() {
		const id = uuidv4();
		
		$db.items[id] = {
			id,
			name: 'New Item',
			description: '',
			tags: [],
			properties: {}
		};

		goto(`/items/${id}`);
	}
</script>

<br />

<TableSearch placeholder="Search" bind:inputValue={searchValue}>
	<TableHead>
		<TableHeadCell>
			<span class="sr-only"> Edit</span>
		</TableHeadCell>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Description</TableHeadCell>
		<TableHeadCell>Tags</TableHeadCell>
		{#each properties as property}
			<TableHeadCell>{property}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#if filtered.length > 0}
			{#each filtered as item}
				<TableBodyRow>
					<TableBodyCell>
						<a
							href="items/{item.id}"
							class="font-medium text-primary-600 hover:underline dark:text-primary-500"
						>
							Edit
						</a>
					</TableBodyCell>
					<TableBodyCell>{item.name}</TableBodyCell>
					<TableBodyCell>{item.description || 'No description'}</TableBodyCell>
					<TableBodyCell>{item.tags.join(' | ') || 'No tags'}</TableBodyCell>
					{#each properties as property}
						<TableHeadCell>{item.properties[property] || 'N/A'}</TableHeadCell>
					{/each}
				</TableBodyRow>
			{/each}
		{:else}
			<TableBodyRow>
				<TableBodyCell colspan={4}>No items found</TableBodyCell>
			</TableBodyRow>
		{/if}
	</TableBody>
</TableSearch>

<Button pill class="p-4 fixed bottom-5 right-5" on:click={createItem}>
	<svg
		class="w-6 h-6 text-gray-800 dark:text-white"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 18 18"
	>
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M9 1v16M1 9h16"
		/>
	</svg>
</Button>
