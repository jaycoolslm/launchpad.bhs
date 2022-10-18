<script>
    // Stores
    import accountStore from "../../stores/accountStore";
    // Functions
    import pair from "../hashconnect/pair";
    import unpair from "../hashconnect/unpair";
    // Assets
    import logo from "../../assets/logo.png";
</script>

<nav>
    <img src={logo} alt="Bored Hash Club Logo" />
    {#if !$accountStore}
        <button on:click={pair} class="pos-action">Connect Wallet</button>
    {:else}
        <div>
            <p>Paired: {$accountStore}</p>
            <button on:click={unpair} class="neg-action">Disconnect</button>
        </div>
    {/if}
</nav>

<style type="text/scss">
    $img-max-width: calc(360px - 2 * 5.83vw - 1945px);
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

        p {
            height: 14px;
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 100%;
            color: #ffffff;
            margin-bottom: 6px;
            text-align: center;
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
