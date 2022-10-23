<script>
    import CopyClipBoard from "./utils/CopyClipBoard.svelte";
    import QRCode from "./utils/QRJS.svelte";
    // Stores
    import accountStore from "../../stores/accountStore";
    // Functions
    import hashconnect, { appMetadata } from "../hashconnect/hashconnect";
    import pair from "../hashconnect/pair";
    import unpair from "../hashconnect/unpair";
    // Assets
    import logo from "../../assets/logo.png";

    let pairingModal = false;
    let pairingString = "";

    const openPairingModal = async () => {
        const initData = await hashconnect.init(appMetadata, "testnet", false);
        pairingString = initData.pairingString;
        pairingModal = true;
    };

    const copy = () => {
        const app = new CopyClipBoard({
            target: document.getElementById("clipboard"),
            props: { pairingString },
        });
        app.$destroy();
    };

    const handleSelectWallet = (e) => {
        e.preventDefault();
        const accountOptions = e.target;
        for (let i = 0; i < accountOptions.length; i++) {
            console.log(accountOptions[i].value);
            if (accountOptions[i].value == accountOptions.value) {
                accountStore.update((prev) => {
                    return {
                        accounts: prev.accounts,
                        active: i,
                    };
                });
            }
        }
    };

    $: console.log("acc store", $accountStore.active);
</script>

<nav>
    <img src={logo} alt="Bored Hash Club Logo" />
    {#if !$accountStore.accounts.length}
        <button on:click={openPairingModal} class="pos-action"
            >Connect Wallet</button
        >
    {:else}
        <div id="connected_btns">
            <div>
                <select on:change={handleSelectWallet}>
                    {#each $accountStore.accounts as account}
                        <option value={account}>{account}</option>
                    {/each}
                </select>
                <svg
                    on:click={openPairingModal}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    ><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                    /></svg
                >
            </div>

            <button on:click={unpair} class="neg-action">Disconnect</button>
        </div>
    {/if}
</nav>

{#if pairingModal}
    <section id="pairing_modal">
        <h2>Pair wallet</h2>
        <svg
            on:click={() => (pairingModal = false)}
            style="position: absolute; top: 1em; right: 1em"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            ><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
            /></svg
        >
        <h3>Pair with HashPack</h3>
        <button
            class="pos-action"
            on:click={() => pair().then(() => (pairingModal = false))}
            >One-click pair</button
        >

        <h3>Pair with pairing string</h3>
        <div style="display: flex; align-items: center; gap: 1em">
            <input
                bind:value={pairingString}
                disabled
                type="text"
                name="pairing_string"
                id="pairing_string"
            />
            <svg
                on:click={copy}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                ><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                    d="M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z"
                /></svg
            >
        </div>

        <div id="clipboard" />
        <h3>Pair with QR code</h3>
        <QRCode codeValue={pairingString} squareSize="200" />
    </section>
{/if}

<style type="text/scss">
    $img-max-width: calc(360px - 2 * 5.83vw - 1945px);
    svg {
        width: 20px;
        background-image: linear-gradient(94.44deg, #cccce9 0%, #f1e0ec 100%);
        border-radius: 3px;
        box-sizing: content-box;
        padding: 3px;
        cursor: pointer;
    }
    nav {
        width: 100vw;
        height: 120px;
        background: rgba(255, 255, 255, 0.06);
        box-shadow: inset 0px -2px 2px rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(30px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 5.83vw;
        border-radius: 4px;
        img {
            max-height: 120px;
        }
        @media screen and (max-width: 460px) {
            img {
                max-width: $img-max-width;
            }
        }
        div#connected_btns {
            display: flex;
            flex-direction: column;

            div {
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                select {
                    padding: 4px;
                    border-radius: 1em;
                }
            }
            button {
                margin-top: 6px;
            }
        }
    }

    #pairing_modal {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #5858ff;
        z-index: 10;
        width: 90vw;
        padding: 1em;
        border-radius: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 500px;
        gap: 0.5em;

        h2,
        h3 {
            background: linear-gradient(94.44deg, #cccce9 0%, #f1e0ec 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
        }
        input {
            padding: 5px;
            border-radius: 3px;
        }
    }

    .pos-action {
        /* Button */
        padding: 18px 32px;
        width: 194px;
        height: 52px;
        /* Linear */
        background-image: linear-gradient(94.44deg, #cccce9 0%, #f1e0ec 100%);
        border-radius: 26px;
        /* Connect Wallet */
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 100%;
        /* identical to box height, or 16px */
        text-align: center;
        color: #1a0929;
    }

    .neg-action {
        /* Button */
        padding: 18px 32px;
        width: 194px;
        height: 52px;
        /* Linear */
        background-image: linear-gradient(94.44deg, #e9cce5 0%, #f1e0ec 100%);
        border-radius: 26px;
        /* Connect Wallet */
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 100%;
        /* identical to box height, or 16px */
        text-align: center;
        color: #1a0929;
    }
</style>
