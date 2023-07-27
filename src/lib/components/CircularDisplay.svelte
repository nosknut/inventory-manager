<script lang="ts">
    export let label: any;
</script>

<div class="circular-display">
	<div class="circular-display-value"><slot /></div>
	{#if label}
		<div class="circular-display-label">{label}</div>
	{/if}
</div>

<style>
	.circular-display {
		margin: 0 auto;
		display: grid;
		place-items: center;
	}

	.circular-display-value {
		display: grid;
		place-items: center;
		font-size: 100px;
		font-weight: bold;
		height: 150px;
		width: 150px;
		border-radius: 50%;
		border: 10px solid #00000020;
	}

	.circular-display-label {
		font-size: 1rem;
		font-weight: bold;
		transform: translateY(-40px);
	}
</style>
