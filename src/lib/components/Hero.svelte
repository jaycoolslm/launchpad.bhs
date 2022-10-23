<script>
    import { onMount, onDestroy } from "svelte";
    import TxModal from "./TxModal.svelte";
    import txStore from "../../stores/txStore";
    import accountStore from "../../stores/accountStore";
    // Functions
    import mint from "../hashconnect/mint";
    import pair from "../hashconnect/pair";
    // Assets
    import Discord from "../../assets/hero/Discord.svg";
    import web from "../../assets/hero/web.svg";
    import Twitter from "../../assets/hero/Twitter.svg";
    import a from "../../assets/nft/a.png";

    import fetchRemaingSupply from "../mirrorNode/fetchRemaingSupply";

    let nftSupply = 0;
    let nftRemaining = 0;

    const fetchNftInterval = setInterval(async () => {
        nftRemaining = Number(await fetchRemaingSupply());
    }, 2000);

    onMount(async () => {
        fetchNftInterval;
        const res = await fetch(
            `https://testnet.mirrornode.hedera.com/api/v1/tokens/48163190`
        );
        const data = await res.json();
        nftSupply = data.total_supply;
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
        <div class="mint-info-card">
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
        </div>
        <!-- MINT ACTIONS -->
        <div class="mint-actions">
            {#if nftRemaining && $accountStore.accounts.length}
                <button on:click={mint}>Mint</button>
            {:else if nftRemaining && !$accountStore.accounts.length}
                <button>Pair wallet</button>
            {:else}
                <button style="opacity: 0.2; cursor: auto">Mint</button>
            {/if}
            <div class="remaining-mints">
                <div class="top">
                    <div
                        style={`width: ${
                            100 - (nftRemaining * 100) / nftSupply
                        }%;`}
                        class="slider"
                    />
                </div>
                <div class="bottom">
                    <p>Total Minted</p>
                    <p>
                        <span>{100 - (nftRemaining * 100) / nftSupply}%</span>
                        ({nftRemaining}/{nftSupply})
                    </p>
                </div>
            </div>
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

<style type="text/scss">
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
                background: linear-gradient(94.44deg, #cccce9 0%, #f1e0ec 100%);
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
                    box-shadow: inset 0px 0px 2px 2px #ff4d82;
                    border-radius: 16px;
                    // margin-right: 3px;
                    p {
                        font-family: "Montserrat";
                        font-style: normal;
                        font-weight: 600;
                        font-size: 14px;
                        line-height: 100%;
                        color: #ff4d82;
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
                color: #ffffff;
            }
            // MINT INFO CARD
            .mint-info-card {
                min-width: $min-width;
                max-width: 30.9vw;
                // height: 88px;
                margin: 6px 0;
                padding: 22px 20px;
                background: rgba(255, 255, 255, 0.06);
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
                        color: #ffffff;
                    }
                    .pink {
                        font-family: "Montserrat";
                        font-style: normal;
                        font-weight: 600;
                        font-size: 14px;
                        line-height: 100%;
                        color: #ff4d82;
                    }
                }
                .bottom {
                    p {
                        font-family: "Montserrat";
                        font-style: normal;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 100%;
                        color: rgba(255, 255, 255, 0.5);
                        text-align: justify;
                    }
                }
            }
            .mint-actions {
                margin-top: 32px;
                display: flex;
                width: 100%;
                justify-content: space-between;

                button {
                    padding: 24px 40px;
                    width: 119px;
                    height: 64px;
                    background: #5858ff;
                    border-radius: 16px;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 100%;
                    text-align: center;
                    color: #ffffff;
                }
                .remaining-mints {
                    width: calc(100% - 122px);
                    margin-left: 3px;
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
                            background: #5858ff;
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
                            color: rgba(255, 255, 255, 0.5);
                            span {
                                color: #ffffff;
                            }
                        }
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
