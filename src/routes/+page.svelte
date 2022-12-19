<script lang="ts">
    import Nav from "$lib/components/Nav.svelte";
    import Hero from "$lib/components/Hero.svelte";
    import Description from "$lib/components/Description.svelte";

    let pairingModal: boolean;
</script>

<main>
    <Nav bind:pairingModal />
    <Hero bind:pairingModal />
    <Description />
</main>

<style>
</style>
