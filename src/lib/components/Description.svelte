<script>
    // Assets
    import Discord from "../../assets/hero/Discord.svg";
    import web from "../../assets/hero/web.svg";
    import Twitter from "../../assets/hero/Twitter.svg";
    import open from "../../assets/description/open.svg";
    import { onMount } from "svelte";

    const nftId = "this";

    export const roadmapValues = [
        {
            title: "Q1 - 2023",
            para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
        },
        {
            title: "Q2 - 2023",
            para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
        },
        {
            title: "Q3 - 2023",
            para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
        },
        {
            title: "Q4 - 2023",
            para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
        },
    ];

    let roadmapActive = true;
    let roadmap, team;
    onMount(() => {
        roadmap = document.getElementById("roadmap");
        team = document.getElementById("team");
    });

    const toggle = () => {
        if (roadmap.classList.contains("active")) {
            toggleClass();
            roadmapActive = false;
        } else {
            toggleClass();
            roadmapActive = true;
        }
    };

    const toggleClass = () => {
        roadmap.classList.toggle("active");
        team.classList.toggle("active");
        roadmap.classList.toggle("passive");
        team.classList.toggle("passive");
    };
</script>

<section>
    <div class="text-1">
        <h2>Panzerdogs Hoodies 1st Edition</h2>
        <div class="socials">
            <div>
                <img src={web} alt="Bored Hash Club Website" />
                <a href="/">Website</a>
            </div>
            <div>
                <img src={Discord} alt="Bored Hash Club Discord" />
                <a href="/">Discord</a>
            </div>
            <div>
                <img src={Twitter} alt="Bored Hash Club Twitter" />
                <a href="/">Twitter</a>
            </div>
        </div>
        <div class="nft-info">
            <img src={open} alt="Bored Hash Club NFT ID" />
            <a href="/">{nftId}</a>
        </div>
        <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
            magni libero soluta minus maiores accusamus ipsam enim non quibusdam
            minima. Assumenda voluptatum beatae in ex perspiciatis blanditiis ab
            vitae magni.
        </p>
    </div>
    <div class="text-2">
        <div class="toggle">
            <button on:click={toggle} id="roadmap" class="active"
                >Roadmap</button
            >
            <button on:click={toggle} id="team" class="passive">Team</button>
        </div>
        <div class="roadmap">
            {#if roadmapActive}
                {#each roadmapValues as { title, para }}
                    <h3>{title}</h3>
                    <p>{para}</p>
                {/each}
            {/if}
        </div>
    </div>
</section>

<style type="text/scss">
    $min-width: calc(360px - 2 * 5.83vw);
    section {
        margin: 5.83vw;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        // LEFT / TOP
        .text-1 {
            min-width: $min-width;
            max-width: 44.86vw;
            // TITLE
            h2 {
                font-family: "Montserrat";
                font-style: normal;
                font-weight: 700;
                font-size: 48px;
                line-height: 100%;
                background: linear-gradient(94.44deg, #cccce9 0%, #f1e0ec 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                margin-bottom: 26px;
            }
            // SOCIAL LINKS
            .socials {
                display: flex;
                margin-bottom: 39px;
                div {
                    display: flex;
                    margin-right: 26px;
                    align-items: center;
                    a {
                        font-family: "Montserrat";
                        font-style: normal;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 100%;
                        /* identical to box height, or 14px */
                        cursor: pointer;
                        color: #ffffff;
                    }
                    img {
                        margin-right: 9px;
                    }
                }
            }
            // NFT ON HASHSCAN
            .nft-info {
                margin-bottom: 39px;
                display: flex;
                align-items: center;
                img {
                    margin-right: 12px;
                }
                a {
                    font-family: "Montserrat";
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 100%;
                    /* identical to box height, or 16px */

                    color: #ffffff;
                }
            }
            // DESCRIPTION
            p {
                font-family: "Montserrat";
                font-style: normal;
                font-weight: 300;
                font-size: 16px;
                line-height: 100%;
                color: #ffffff;
                margin-bottom: 39px;
            }
        }
        // RIGHT / BOTTOM
        .text-2 {
            min-width: $min-width;
            max-width: 37.78vw;
            // BUTTONS
            .toggle {
                background: rgba(255, 255, 255, 0.06);
                border-radius: 23px;
                display: inline-block;
                margin-bottom: 48px;
                .active {
                    padding: 16px 28px;
                    gap: 10px;
                    background: #ffffff;
                    border-radius: 23px;
                    font-family: "Montserrat";
                    font-style: normal;
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 100%;
                    text-align: center;
                    color: #1d0030;
                }
                .passive {
                    background: transparent;
                    padding: 16px 51px 16px 28px;
                    gap: 10px;
                    border-radius: 23px;
                    font-family: "Montserrat";
                    font-style: normal;
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 100%;
                    text-align: center;
                    color: rgba(255, 255, 255, 0.5);
                }
            }
            // ROADMAP
            .roadmap {
                h3 {
                    font-family: "Montserrat";
                    font-style: normal;
                    font-weight: 700;
                    font-size: 20px;
                    line-height: 100%;
                    color: #ffffff;
                    margin-bottom: 20px;
                }
                p {
                    font-family: "Montserrat";
                    font-style: normal;
                    font-weight: 300;
                    font-size: 16px;
                    line-height: 100%;
                    color: rgba(255, 255, 255, 0.5);
                    margin-bottom: 34px;
                }
            }
        }
    }
</style>
