<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import TxModal from "./modals/TxModal.svelte";
    import txStore from "$lib/stores/txStore";
    import accountStore from "$lib/stores/accountStore";
    // Assets
    import Discord from "$lib/assets/hero/Discord.svg";
    import web from "$lib/assets/hero/web.svg";
    import Twitter from "$lib/assets/hero/Twitter.svg";
    import a from "$lib/assets/nft/a.png";
    import fetchRemaingSupply from "../mirrorNode/fetchRemaingSupply";
    let mint: any;
    let hbarSupply = 40;
    let bhcSupply = 10;
    let hbarNftRemaining = 40;
    let bhcNftRemaining = 10;

    export let pairingModal = false;

    const hbarTreasury = import.meta.env.VITE_PUBLIC_HBAR_TREASURY_ID;
    const bhcTreasury = import.meta.env.VITE_PUBLIC_BHC_TREASURY_ID;
    const fetchNftInterval = setInterval(async () => {
        hbarNftRemaining = Number(await fetchRemaingSupply(hbarTreasury));
        bhcNftRemaining = Number(await fetchRemaingSupply(bhcTreasury));
    }, 2000);

    onMount(async () => {
        fetchNftInterval;
        // const res = await fetch(
        //     `${import.meta.env.VITE_PUBLIC_MIRRORNODE}/api/v1/tokens/${
        //         import.meta.env.VITE_PUBLIC_NFT_ID
        //     }`
        // );
        // const data = await res.json();
        // hbarSupply = data.total_supply;
        mint = (await import("$lib/hashconnect/mint")).default;
    });

    onDestroy(() => {
        clearInterval(fetchNftInterval);
    });
</script>

<section>
    <!-- TEXT CONTAINER -->
    <div class="text">
        <!-- TITLE -->
        <h1 class="title">Bored Hash Club: Gen 3 NFTS</h1>
        <!-- TAGS -->
        <div class="tags">
            <div class="tag-pink"><p>Escrow: 1d</p></div>
            <div class="tag">
                <p>Items: 7,777</p>
            </div>
            <div class="tag">
                <p>??? HBAR</p>
            </div>
            <!-- SOCIALS -->
            <div class="socials">
                <img src={web} alt="Bored Hash Club Website" />
                <img src={Discord} alt="Bored Hash Club Discord" />
                <img src={Twitter} alt="Bored Hash Club Twitter" />
            </div>
        </div>
        <!-- NFT PROJECT DESCRIPTION -->
        <p class="nft-project-desc">
            Quis irure aliquip cupidatat est consequat quis esse aliquip ex
            velit adipisicing ullamco dolore officia.
        </p>
        <!-- MINT INFO CARD -->
        <!-- <div class="mint-info-card">
            <div class="top">
                <p class="white">Whitelist</p>
                <p class="pink">Ended</p>
            </div>
            <div class="bottom">
                <p>Whitelist 5,000 | Max 1 Token | Price: ??? HBAR</p>
            </div>
        </div>
        <div class="mint-info-card">
            <div class="top">
                <p class="white">Public Sale</p>
                <p class="pink">Ended</p>
            </div>
            <div class="bottom">
                <p>Max 2 Tokens | Price: ??? HBAR</p>
            </div>
        </div> -->

        <div class="remaining-mints" style="margin-bottom: 8px;">
            <div class="top">
                <div
                    style={`width: ${
                        100 - (hbarNftRemaining * 100) / hbarSupply
                    }%;`}
                    class="slider"
                />
            </div>
            <div class="bottom">
                <p><span>Total Minted with HBAR:</span></p>
                <p>
                    {Math.round(100 - (hbarNftRemaining * 100) / hbarSupply)}%
                    <span>({hbarSupply - hbarNftRemaining}/{hbarSupply})</span>
                </p>
            </div>
        </div>

        <div class="remaining-mints">
            <div class="top">
                <div
                    style={`width: ${
                        100 - (bhcNftRemaining * 100) / bhcSupply
                    }%;`}
                    class="slider"
                />
            </div>
            <div class="bottom">
                <p><span>Total Minted with BHC:</span></p>
                <p>
                    {Math.round(100 - (bhcNftRemaining * 100) / bhcSupply)}%
                    <span>({bhcSupply - bhcNftRemaining}/{bhcSupply})</span>
                </p>
            </div>
        </div>
        <!-- MINT ACTIONS -->
        <div class="mint-actions">
            {#if hbarNftRemaining && $accountStore.accounts.length}
                <button on:click={() => mint(false)}>Mint HBAR</button>
                <button on:click={() => mint(true)}>Mint BHC</button>
            {:else if hbarNftRemaining && !$accountStore.accounts.length}
                <button on:click={() => (pairingModal = true)}
                    >Pair wallet</button
                >
            {:else}
                <button style="opacity: 0.2; cursor: auto">Mint</button>
            {/if}
            <!-- <div class="remaining-mints">
                <div class="top">
                    <div
                        style={`width: ${
                            100 - (nftRemaining * 100) / nftSupply
                        }%;`}
                        class="slider"
                    />
                </div>
                <div class="bottom">
                    <p><span>Total Minted:</span></p>
                    <p>
                        {Math.round(100 - (nftRemaining * 100) / nftSupply)}%
                        <span>({nftSupply - nftRemaining}/{nftSupply})</span>
                    </p>
                </div>
            </div> -->
        </div>
    </div>
    <!-- IMAGE CONTAINER -->
    <div class="image">
        <img src={a} alt="Bored Hash Club" />
    </div>
</section>

{#if $txStore}
    <TxModal />
{/if}

<style lang="scss">
    $min-width: calc(360px - 2 * 5.83vw);
    section {
        margin: 5.83vw;
        display: flex;
        flex-wrap: wrap-reverse;
        justify-content: space-evenly;
        // TEXT CONTAINER
        .text {
            min-width: $min-width;
            max-width: 44.86vw;
            // TITLE
            .title {
                font-family: "Montserrat";
                font-style: normal;
                font-weight: 900;
                font-size: 56px;
                line-height: 100%;
                background: linear-gradient(
                    94.44deg,
                    var(--five) 0%,
                    var(--two) 100%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
            }
            @media screen and (max-width: 683px) {
                .title {
                    font-size: 42px !important;
                }
            }
            // TAGS
            .tags {
                display: flex;
                flex-wrap: wrap;
                margin-top: 26px;
                gap: 6px;
                .tag-pink {
                    padding: 16px 28px;
                    background: rgba(255, 77, 130, 0.06);
                    box-shadow: inset 0px 0px 2px 2px var(--five);
                    border-radius: 16px;
                    // margin-right: 3px;
                    p {
                        font-family: "Montserrat";
                        font-style: normal;
                        font-weight: 600;
                        font-size: 14px;
                        line-height: 100%;
                        color: var(--two);
                    }
                }
                .tag {
                    padding: 16px 28px;
                    // width: 10px;
                    height: 46px;
                    background: rgba(255, 255, 255, 0.06);
                    box-shadow: inset 0px 0px 2px 2px rgba(255, 255, 255, 0.12);
                    border-radius: 16px;
                    p {
                        height: 14px;
                        font-family: "Montserrat";
                        font-style: normal;
                        font-weight: 600;
                        font-size: 14px;
                        line-height: 100%;
                        color: #ffffff;
                    }
                }
                // SOCIALS
                .socials {
                    width: 96px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    // margin-left: 27px;
                    img {
                        height: 20px;
                    }
                }
            }
            // NFT PROJECT DESCRIPTION
            .nft-project-desc {
                font-family: "Montserrat";
                font-style: normal;
                font-weight: 300;
                font-size: 16px;
                line-height: 100%;
                margin-top: 36px;
                margin-bottom: 16px;
                color: var(--five);
            }
            // MINT INFO CARD
            .mint-info-card {
                min-width: $min-width;
                max-width: 30.9vw;
                // height: 88px;
                margin: 6px 0;
                padding: 22px 20px;
                background: var(--four);
                box-shadow: inset 2px 2px 2px rgba(255, 255, 255, 0.12);
                backdrop-filter: blur(10px);
                /* Note: backdrop-filter has minimal browser support */
                border-radius: 16px;
                .top {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 16px;
                    .white {
                        height: 14px;
                        font-family: "Montserrat";
                        font-style: normal;
                        font-weight: 600;
                        font-size: 14px;
                        line-height: 100%;
                        color: var(--five);
                    }
                    .pink {
                        font-family: "Montserrat";
                        font-style: normal;
                        font-weight: 600;
                        font-size: 14px;
                        line-height: 100%;
                        color: var(--five);
                    }
                }
                .bottom {
                    p {
                        font-family: "Montserrat";
                        font-style: normal;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 100%;
                        color: var(--five);
                        text-align: justify;
                    }
                }
            }
            .mint-actions {
                margin-top: 32px;
                display: flex;
                width: 100%;

                button {
                    padding: 23px;
                    background: var(--five);
                    border-radius: 16px;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 100%;
                    text-align: center;
                    color: var(--one);
                    transition: all 0.7s ease;
                    margin-right: 23px;
                    &:hover {
                        box-shadow: 2px 2px 20px 0px #fff;
                    }
                }
            }
        }

        .remaining-mints {
            width: calc(100% - 122px);
            max-width: 390px;
            height: 64px;
            background: rgba(255, 255, 255, 0.06);
            box-shadow: inset 2px 2px 2px rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(10px);
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            /* Note: backdrop-filter has minimal browser support */
            border-radius: 16px;
            padding: 19px 23px;
            .top {
                .slider {
                    // width: 100%;
                    height: 4px;
                    background: var(--five);
                    border-radius: 2px;
                }
            }
            .bottom {
                display: flex;
                justify-content: space-between;
                p {
                    font-weight: 300;
                    font-size: 12px;
                    line-height: 100%;
                    color: var(--five);
                    span {
                        opacity: 0.5 !important;
                    }
                }
            }
        }
        .image {
            img {
                min-width: $min-width;
                max-width: 37.78vw;
                border-radius: 16px;
            }
        }
    }
</style>
