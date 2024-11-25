<script>
	export let data;
	let selectedPage = data.schedules.length - 1;
</script>

<!-- Tab List -->
<div role="tablist" class="tabs tabs-bordered mx-auto">
	{#each Array(data.schedules.length) as _, i}
		<a
			role="tab"
			class="tab {selectedPage == i ? 'tab-active' : ''}"
			on:click={() => (selectedPage = i)}
		>
			Week {i + 1}
		</a>
	{/each}
</div>

<!-- Schedule Grid -->
<div class="flex flex-col items-center pt-8">
	{#each data.schedules[selectedPage].plan as day}
		<div class="flex justify-center">
			{#each JSON.parse(day) as subject}
				<div class="h-32 w-32 flex flex-col justify-between border border-black p-2">
					<!-- Subject -->
					<div class="text-2xl font-semibold text-center pt-6">
						{subject}
					</div>
					<!-- Lesson Button -->
					<button class="btn btn-sm rounded-lg">Lesson</button>
				</div>
			{/each}
		</div>
	{/each}
</div>
