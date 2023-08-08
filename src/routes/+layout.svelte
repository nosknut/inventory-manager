<script lang="ts">
	import './styles.css';
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

	<footer />
</div>
