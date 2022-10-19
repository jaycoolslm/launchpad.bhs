<script>
    import txStore from "../../stores/txStore";

    const seeTransaction = () => {
        const transactiionId = $txStore;
        let targetUrl = "https://hashscan.io/#/testnet/transaction/";
        for (let i in transactiionId) {
            if ($txStore[i] == "@") {
                targetUrl += "-";
                continue;
            } else if ($txStore[i] == "." && i > 3) {
                targetUrl += "-";
                continue;
            } else {
                targetUrl += $txStore[i];
            }
        }
        window.open(
            targetUrl,
            "_blank" // <- This is what makes it open in a new window.
        );
        console.log(targetUrl);
    };

    const closeModal = () => {
        txStore.set("");
    };
</script>

<main>
    <h1>Success!</h1>
    <div class="success-checkmark">
        <div class="check-icon">
            <span class="icon-line line-tip" />
            <span class="icon-line line-long" />
            <div class="icon-circle" />
            <div class="icon-fix" />
        </div>
    </div>
    <div>
        <svg
            on:click={closeModal}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            ><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
            /></svg
        >
        <button on:click={seeTransaction}>HashScan</button>
    </div>
</main>

<style type="text/scss">
    main {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100vw;
        max-width: 500px;
        min-height: 300px;
        background: #5858ff;
        // background: rgba(255, 255, 255, 0.06);
        // box-shadow: inset 2px 2px 2px rgba(255, 255, 255, 0.12);
        // backdrop-filter: blur(10px);
        /* Note: backdrop-filter has minimal browser support */
        border-radius: 16px;
        padding: 40px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        h1 {
            background: linear-gradient(94.44deg, #cccce9 0%, #f1e0ec 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
        }

        svg {
            width: 20px;
            position: absolute;
            top: 45px;
            right: 40px;
            cursor: pointer;
        }

        button {
            /* Button */
            padding: 18px 32px;
            width: 194px;
            height: 52px;
            /* Linear */
            background-image: linear-gradient(
                94.44deg,
                #cccce9 0%,
                #f1e0ec 100%
            );
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

        .success-checkmark {
            width: 80px;
            height: 115px;
            margin: 0 auto;

            .check-icon {
                width: 80px;
                height: 80px;
                position: relative;
                border-radius: 50%;
                box-sizing: content-box;
                border: 4px solid #4caf50;

                &::before {
                    top: 3px;
                    left: -2px;
                    width: 30px;
                    transform-origin: 100% 50%;
                    border-radius: 100px 0 0 100px;
                }

                &::after {
                    top: 0;
                    left: 30px;
                    width: 60px;
                    transform-origin: 0 50%;
                    border-radius: 0 100px 100px 0;
                    animation: rotate-circle 4.25s ease-in;
                }

                &::before,
                &::after {
                    content: "";
                    height: 100px;
                    position: absolute;
                    // background: rgba(255, 255, 255, 0.06);
                    transform: rotate(-45deg);
                }

                .icon-line {
                    height: 5px;
                    background-color: #4caf50;
                    display: block;
                    border-radius: 2px;
                    position: absolute;
                    z-index: 10;

                    &.line-tip {
                        top: 46px;
                        left: 14px;
                        width: 25px;
                        transform: rotate(45deg);
                        animation: icon-line-tip 0.75s;
                    }

                    &.line-long {
                        top: 38px;
                        right: 8px;
                        width: 47px;
                        transform: rotate(-45deg);
                        animation: icon-line-long 0.75s;
                    }
                }

                .icon-circle {
                    top: -4px;
                    left: -4px;
                    z-index: 10;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    position: absolute;
                    box-sizing: content-box;
                    border: 4px solid rgba(76, 175, 80, 0.5);
                }

                .icon-fix {
                    top: 8px;
                    width: 5px;
                    left: 26px;
                    z-index: 1;
                    height: 85px;
                    position: absolute;
                    transform: rotate(-45deg);
                    // background-color: rgba(255, 255, 255, 0.06);
                }
            }
        }

        @keyframes rotate-circle {
            0% {
                transform: rotate(-45deg);
            }
            5% {
                transform: rotate(-45deg);
            }
            12% {
                transform: rotate(-405deg);
            }
            100% {
                transform: rotate(-405deg);
            }
        }

        @keyframes icon-line-tip {
            0% {
                width: 0;
                left: 1px;
                top: 19px;
            }
            54% {
                width: 0;
                left: 1px;
                top: 19px;
            }
            70% {
                width: 50px;
                left: -8px;
                top: 37px;
            }
            84% {
                width: 17px;
                left: 21px;
                top: 48px;
            }
            100% {
                width: 25px;
                left: 14px;
                top: 45px;
            }
        }

        @keyframes icon-line-long {
            0% {
                width: 0;
                right: 46px;
                top: 54px;
            }
            65% {
                width: 0;
                right: 46px;
                top: 54px;
            }
            84% {
                width: 55px;
                right: 0px;
                top: 35px;
            }
            100% {
                width: 47px;
                right: 8px;
                top: 38px;
            }
        }
    }
</style>
