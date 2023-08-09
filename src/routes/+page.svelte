<script lang="ts">
	import { itemsList } from '$lib/stores/db';
	import _ from 'lodash';
	import CircularDisplay from '$lib/components/CircularDisplay.svelte';
	import { Button, Card, Heading } from 'flowbite-svelte';
</script>

<div class="flex justify-center mt-16 px-2">
	<Card class="w-full">
		<Heading level="1" customSize="text-4xl" class="text-center">Dashboard</Heading>
		<div class="grid gap-5 mt-5">
			<CircularDisplay label="Items">{$itemsList.length}</CircularDisplay>
			<Button href="/items" variant="raised">View Items</Button>
		</div>
	</Card>
</div>
