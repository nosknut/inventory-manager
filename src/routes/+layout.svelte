<script lang="ts">
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
	import './styles.css';
	import Button from '@smui/button';
	import { db } from '$lib/stores/db';

	let topAppBar: TopAppBar;

	$: blob = new Blob([JSON.stringify($db, null, 2)], { type: 'application/json' });
	$: url = URL.createObjectURL(blob);
</script>

<div class="app">
	<TopAppBar bind:this={topAppBar} variant="standard">
		<Row>
			<Section>
				<Title>Inventory Manager</Title>
			</Section>

			<Section align="end" toolbar>
				<Button href="/">Home</Button>
				<Button href="/items">Items</Button>
				<Button href={url} download="inventory.json">download items</Button>
			</Section>
		</Row>
	</TopAppBar>
	<AutoAdjust {topAppBar}>
		<slot />
	</AutoAdjust>

	<style>
		/* Hide everything above this component. */
		:global(#smui-app),
		:global(body),
		:global(html) {
			display: block !important;
			height: auto !important;
			width: auto !important;
			position: static !important;
		}
	</style>

	<footer />
</div>
