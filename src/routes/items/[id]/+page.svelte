<script lang="ts">
	import { db } from '$lib/stores/db';
	import type { PageData } from './$types';
	import _ from 'lodash';
	import { selectedItem } from '$lib/stores/selectedItem';
	import { onEnter } from '$lib/helpers/onEnter';
	import {
		Badge,
		Button,
		ButtonGroup,
		Card,
		DescriptionList,
		Heading,
		Input,
		Label,
		List,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Textarea
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	let newTag = '';

	let newProperty = {
		key: '',
		value: ''
	};

	export let data: PageData;

	$selectedItem = _.clone($db.items[data.id]);
	$: hasChanges = !_.isEqual($selectedItem, $db.items[data.id]);

	function save() {
		if ($selectedItem) {
			$db.items[data.id] = _.clone($selectedItem);
		}
	}

	function deleteItem() {
		if (!$selectedItem) {
			return;
		}

		const confirm = window.confirm('Are you sure you want to delete this item?');

		if (!confirm) {
			return;
		}

		$selectedItem = null;
		delete $db.items[data.id];
		$db = $db;

		goto('/items');
	}

	function deleteProperty(key: string) {
		if (!$selectedItem) {
			return;
		}

		const confirm = window.confirm('Are you sure you want to delete this property?');

		if (!confirm) {
			return;
		}

		delete $selectedItem.properties[key];
		$selectedItem = $selectedItem;
		save();
	}

	function saveNewTag() {
		if (!$selectedItem) {
			return;
		}
		if (!newTag) {
			return;
		}

		$selectedItem.tags.push(newTag);
		$selectedItem = $selectedItem;

		newTag = '';

		save();
	}

	function deleteTag(tag: string) {
		if (!$selectedItem) {
			return;
		}

		$selectedItem.tags = $selectedItem.tags.filter((t) => t !== tag);
		save();
	}

	function saveNewProperty() {
		if (!$selectedItem) {
			return;
		}
		if (!newProperty.key || !newProperty.value) {
			return;
		}

		$selectedItem.properties[newProperty.key] = newProperty.value;

		newProperty = {
			key: '',
			value: ''
		};

		save();
	}
</script>

<div class="grid gap-5 w-full py-10 justify-center">
	{#if !$selectedItem}
		<p>Item not found</p>
		<a href="/item">Back to list</a>
	{:else}
		<Card class="max-w-3xl sm:rounded-lg rounded-none">
			<Heading level="1" customSize="text-2xl">Details</Heading>
			<div class="grid gap-5 pt-5">
				<Label>
					<span>Name</span>
					<Input on:keydown={onEnter(save)} bind:value={$selectedItem.name} />
				</Label>
				<Label>
					<span>Description</span>
					<Textarea
						on:keydown={onEnter(save)}
						textarea
						placeholder="Description"
						rows="4"
						bind:value={$selectedItem.description}
					/>
				</Label>
				<div class="flex justify-between">
					<Button on:click={deleteItem} color="red">Delete item</Button>
					<Button on:click={save} disabled={!hasChanges} variant="raised">Save changes</Button>
				</div>
			</div>
		</Card>
		<Card class="max-w-3xl sm:rounded-lg rounded-none">
			<Heading level="1" customSize="text-2xl">Tags</Heading>
			<div class="grid gap-5 pt-5">
				<div>
					{#each $selectedItem.tags as tag}
						<Badge class="m-1" dismissable large on:dismiss={() => deleteTag(tag)}>
							{tag}
						</Badge>
					{/each}
				</div>
				<Label>
					<span>Name</span>
					<ButtonGroup class="w-full">
						<Input bind:value={newTag} on:keydown={onEnter(saveNewTag)} />
						<Button on:click={saveNewTag} color="primary">Add</Button>
					</ButtonGroup>
				</Label>
			</div>
		</Card>
		<Card class="max-w-3xl sm:rounded-lg rounded-none">
			<Heading level="1" customSize="text-2xl">Properties</Heading>
			<div class="grid gap-5">
				<div class="flex gap-2 w-full justify-between">
					<Label>
						<span>Name</span>
						<Input bind:value={newProperty.key} />
					</Label>
					<Label>
						<span>Value</span>
						<Input bind:value={newProperty.value} on:keydown={onEnter(saveNewProperty)} />
					</Label>
					<div class="flex flex-col-reverse">
						<Button on:click={saveNewProperty}>Set</Button>
					</div>
				</div>

				{#if Object.keys($selectedItem.properties).length > 0}
					<Table>
						<TableHead>
							<TableHeadCell>Name</TableHeadCell>
							<TableHeadCell>Value</TableHeadCell>
							<TableHeadCell>
								<span class="sr-only">Delete</span>
							</TableHeadCell>
						</TableHead>
						<TableBody tableBodyClass="divide-y">
							{#each Object.entries($selectedItem.properties) as [key, value]}
								<TableBodyRow>
									<TableBodyCell>{key}</TableBodyCell>
									<TableBodyCell>{value}</TableBodyCell>
									<TableBodyCell tdClass="px-6">
										<div class="flex justify-end">
											<Button size="xs" on:click={() => deleteProperty(key)}>Delete</Button>
										</div>
									</TableBodyCell>
								</TableBodyRow>
							{/each}
						</TableBody>
					</Table>
				{/if}
			</div>
		</Card>
	{/if}
</div>
