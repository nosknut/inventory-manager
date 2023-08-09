<script lang="ts">
	export let label: any;
</script>

<div class="circular-display">
	<div class="circular-display-frame">
		<div class="circular-display-value"><slot /></div>
		{#if label}
			<div class="circular-display-label">{label}</div>
		{/if}
	</div>
</div>

<style>
	.circular-display {
		margin: 0 auto;
		display: grid;
		place-items: center;
	}

	.circular-display-frame {
		text-align: center;
		height: 150px;
		width: 150px;
		border-radius: 50%;
		border: 10px solid #00000020;
	}

	.circular-display-value {
		font-size: 100px;
		font-weight: bold;
		line-height: 1;
	}

	.circular-display-label {
		font-size: 1rem;
		font-weight: bold;
	}
</style>
