import {
    AccountId,
    PrivateKey,
    Hbar,
    TransactionId,
    TransferTransaction
} from "@hashgraph/sdk";

const nftToken = import.meta.env.VITE_PUBLIC_NFT_ID!
const hbarTreasury = import.meta.env.VITE_PUBLIC_HBAR_TREASURY_ID!
const bhcTreasury = import.meta.env.VITE_PUBLIC_BHC_TREASURY_ID!
const treasuryKey = PrivateKey.fromString(import.meta.env.VITE_PUBLIC_TREASURY_KEY!)
const bhcToken = "0.0.1111899"

const hbarPrice = 1000
const bhcPrice = 1000

export default async (buyerId: string, bhc = false) => {
    const buyer = AccountId.fromString(buyerId)
    const transactionId = TransactionId.generate(buyer)
    // fetch first serial of treasury nft array
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_MIRRORNODE}/api/v1/accounts/${bhc ? bhcTreasury : hbarTreasury}/nfts?token.id=${nftToken}`)
    const data = await res.json()
    const serial = data.nfts[0].serial_number
    const tokenTransferTx = new TransferTransaction()
        .setTransactionId(transactionId)
        .setNodeAccountIds([new AccountId(3)])

    if (bhc) {
        tokenTransferTx
            .addNftTransfer(nftToken, serial, bhcTreasury, buyer)
            .addTokenTransfer(bhcToken, buyer, -1 * bhcPrice)
            .addTokenTransfer(bhcToken, import.meta.env.VITE_PUBLIC_BHC_TREASURY_ID, bhcPrice * 0.93)
            .addTokenTransfer(bhcToken, "0.0.665927", bhcPrice * 0.07)
    } else {
        tokenTransferTx
            .addNftTransfer(nftToken, serial, hbarTreasury, buyer)
            .addHbarTransfer(buyer, new Hbar(-1 * hbarPrice))
            .addHbarTransfer(import.meta.env.VITE_PUBLIC_HBAR_TREASURY_ID, new Hbar(hbarPrice * 0.93))
            .addHbarTransfer("0.0.665927", new Hbar(hbarPrice * 0.07))
    }

    await tokenTransferTx
        .freeze()
        .sign(treasuryKey)


    return tokenTransferTx.toBytes()
}