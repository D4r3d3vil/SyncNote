<script>

export let markdown = '';
import '@milkdown/theme-nord/style.css';
import { onMount } from 'svelte';
import { Crepe } from '@milkdown/crepe';
import { diagram } from '@milkdown/plugin-diagram';
import { math } from '@milkdown/plugin-math';
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener';
import 'katex/dist/katex.min.css';

import "@milkdown/crepe/theme/common/style.css";

// We have some themes for you to choose
// available themes: frame, classic, nord, frame-dark, classic-dark, nord-dark
import "@milkdown/crepe/theme/frame.css";

let crepe, post;

onMount(()=> {
	crepe = new Crepe({
		root: document.getElementById('app'),
		defaultValue: markdown,
	});
	crepe.editor.use(math, diagram)
	crepe.create().then(() => {
		$: post = crepe.getMarkdown()
	});
})
</script>
<div id="app" class="prose"></div>
<div id="preview" class="prose"></div>