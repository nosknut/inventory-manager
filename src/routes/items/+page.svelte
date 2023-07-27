<script lang="ts">
	import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list';
	import { db, itemsList } from '$lib/stores/db';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import IconButton from '@smui/icon-button';

	// @ts-ignore
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { goto } from '$app/navigation';

	let searchValue = '';
	$: searchableValues = searchValue.toLowerCase().split(' ');

	$: itemIndex = $itemsList.reduce((acc, item) => {
		acc[item.id] = JSON.stringify(item).toLowerCase().trim();
		return acc;
	}, {} as { [id: string]: string });

	$: filtered = $itemsList.filter((item) =>
		searchableValues.every((term) => itemIndex[item.id].includes(term))
	);

	let start: number;
	let end: number;

	function deleteItem(id: string) {
		const confirm = window.confirm('Are you sure you want to delete this item?');
		if (!confirm) {
			return;
		}

		delete $db.items[id];
		$db.items = $db.items;
	}
</script>

<br />

<SearchBox hideSearchButton bind:value={searchValue} />

{#if filtered.length > 0}
	<List threeLine>
		<VirtualList height="500px" items={filtered} bind:start bind:end let:item>
			<Item on:click={() => goto(`items/${item.id}`)}>
				<Text>
					<PrimaryText>{item.name}</PrimaryText>
					<SecondaryText>{item.description || 'No description'}</SecondaryText>
					<SecondaryText>
						{item.tags.join(' | ') || 'No tags'}
					</SecondaryText>
				</Text>
				<Meta>
					<IconButton class="material-icons" href="items/{item.id}">edit</IconButton>
					<IconButton class="material-icons" on:click={() => deleteItem(item.id)}>delete</IconButton
					>
				</Meta>
			</Item>
		</VirtualList>
	</List>
{/if}

{#if filtered.length === 0}
	<p class="item-counter">No items found</p>
{:else}
	<p class="item-counter">Showing {start} to {end} of {filtered.length}</p>
{/if}

<style>
	.item-counter {
		text-align: center;
	}
</style>
