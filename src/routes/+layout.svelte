<script lang="ts">
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
	import './styles.css';

	let topAppBar: TopAppBar;
</script>

<div class="app">
	<TopAppBar bind:this={topAppBar} variant="standard">
		<Row>
			<Section>
				<Title>Inventory Manager</Title>
			</Section>
		</Row>
	</TopAppBar>
	<AutoAdjust {topAppBar}>
		<main>
			<slot />
		</main>
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
