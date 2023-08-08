<script lang="ts">
	import { itemsList } from '$lib/stores/db';
	import _ from 'lodash';
	import CircularDisplay from '$lib/components/CircularDisplay.svelte';
</script>

<div class="item-page">
	<Paper>
		<Title style="text-align: center;">Dashboard</Title>
		<Content style="display: grid; gap: 20px; margin-top: 50px;">
			<CircularDisplay label="Items">{$itemsList.length}</CircularDisplay>
			<Button href="/items" variant="raised">View Items</Button>
		</Content>
	</Paper>
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
