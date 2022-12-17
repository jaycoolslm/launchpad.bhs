<script>
    import { onMount } from "svelte";

    export let pairingString;

    let textarea;

    onMount(() => {
        textarea.select();
        document.execCommand("copy");
    });
</script>

<textarea bind:value={pairingString} bind:this={textarea} />
