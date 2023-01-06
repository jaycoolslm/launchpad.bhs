// fetch remaining supply data
const token = import.meta.env.VITE_PUBLIC_NFT_ID!
// const treasury = import.meta.env.VITE_PUBLIC_TREASURY_ID!
export default async (treasury: string) => {
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_MIRRORNODE}/api/v1/accounts/${treasury}/nfts?token.id=${token}&limit=50`)
    const data = await res.json()
    const treasuryBalance = data.nfts.length
    return treasuryBalance
}