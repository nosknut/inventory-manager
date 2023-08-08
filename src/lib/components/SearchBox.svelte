<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let value = '';
	export let hideSearchButton = false;

	function doSearch() {
		dispatch('search', value);
	}

	function handleKeyDown(event: CustomEvent | KeyboardEvent) {
		event = event as KeyboardEvent;
		if (event.key === 'Enter') {
			doSearch();
		}
	}
</script>

<div class="solo-container">
	<Paper class="solo-paper" elevation={6}>
		<Icon class="material-icons">search</Icon>
		<Input bind:value on:keydown={handleKeyDown} placeholder="Search" class="solo-input" />
	</Paper>
	{#if !hideSearchButton}
		<Fab on:click={doSearch} disabled={value === ''} color="primary" mini class="solo-fab">
			<Icon class="material-icons">arrow_forward</Icon>
		</Fab>
	{/if}
</div>

<style>
	.solo-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
	}
	* :global(.solo-paper) {
		display: flex;
		align-items: center;
		flex-grow: 1;
		margin: 0 12px 0 0;
		padding: 0;
		height: 48px;
	}
	* :global(.solo-paper > *) {
		display: inline-block;
		margin: 0 12px;
	}
	* :global(.solo-input) {
		flex-grow: 1;
		color: var(--mdc-theme-on-surface);
	}
	* :global(.solo-input::placeholder) {
		color: var(--mdc-theme-on-surface);
		opacity: 0.6;
	}
	* :global(.solo-fab) {
		flex-shrink: 0;
	}
</style>
