<script lang="ts">
	import { db } from '$lib/stores/db';
	import type { PageData } from './$types';
	import Textfield from '@smui/textfield';
	import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list';
	import Paper, { Title, Subtitle, Content } from '@smui/paper';

	import Button, { Label } from '@smui/button';
	import _ from 'lodash';
	import { selectedItem } from '$lib/stores/selectedItem';
	import { onEnter } from '$lib/helpers/onEnter';
	import IconButton from '@smui/icon-button';
	import Chip, { Set, TrailingAction, Text as ChipText } from '@smui/chips';

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

<div class="item-page">
	{#if !$selectedItem}
		<p>Item not found</p>
		<a href="/item">Back to list</a>
	{:else}
		<Paper>
			<Title>Details</Title>
			<Content style="display: grid; gap: 20px;">
				<Textfield
					style="width: 100%;"
					on:keydown={onEnter(save)}
					helperLine$style="width: 100%;"
					bind:value={$selectedItem.name}
					label="Name"
				/>
				<Textfield
					style="width: 100%;"
					helperLine$style="width: 100%;"
					on:keydown={onEnter(save)}
					textarea
					bind:value={$selectedItem.description}
					label="Description"
				/>
				<Button on:click={save} disabled={!hasChanges} variant="raised">
					<Label>Save changes</Label>
				</Button>
			</Content>
		</Paper>
		<Paper>
			<Title>Tags</Title>
			<Content>
				<Set chips={$selectedItem.tags} let:chip>
					<Chip {chip}>
						<ChipText>{chip}</ChipText>
						<TrailingAction icon$class="material-icons" on:click={()=>deleteTag(chip)}>cancel</TrailingAction>
					</Chip>
				</Set>
				<div style="display: flex; gap: 10px; padding-bottom: 5px;">
					<Textfield
						style="width: 100%;"
						bind:value={newTag}
						on:keydown={onEnter(saveNewTag)}
						label="Name"
						helperLine$style="width: 100%;"
					/>
					<Button on:click={saveNewTag} style="margin: auto 0;" variant="raised">
						<Label>Add</Label>
					</Button>
				</div>
			</Content>
		</Paper>
		<Paper>
			<Title>Properties</Title>
			<Content>
				<div style="display: flex; gap: 10px; padding-bottom: 5px;">
					<Textfield
						style="width: 100%;"
						bind:value={newProperty.key}
						label="Name"
						helperLine$style="width: 100%;"
					/>
					<Textfield
						style="width: 100%;"
						bind:value={newProperty.value}
						on:keydown={onEnter(saveNewProperty)}
						label="Value"
					/>
					<Button on:click={saveNewProperty} style="margin: auto 0;" variant="raised">
						<Label>Set</Label>
					</Button>
				</div>
				{#each Object.entries($selectedItem.properties) as [key, value]}
					<List nonInteractive separator>
						<Item>
							<Text>
								<PrimaryText>{key}</PrimaryText>
								<SecondaryText>{value}</SecondaryText>
							</Text>
							<Meta>
								<IconButton class="material-icons" on:click={() => deleteProperty(key)}>
									delete
								</IconButton>
							</Meta>
						</Item>
					</List>
				{/each}
			</Content>
		</Paper>
	{/if}
</div>

<style>
	.item-page {
		max-width: 600px;
		margin: 20px auto;
		width: 100%;
		display: grid;
		gap: 20px;
	}
</style>
