import {
    AccountId,
    PrivateKey,
    TokenId,
    Hbar,
    TransactionId,
    TransferTransaction,
    NftId
} from "@hashgraph/sdk";

const nftToken = import.meta.env.VITE_PUBLIC_NFT_ID!
const treasuryId = import.meta.env.VITE_PUBLIC_TREASURY_ID!
const treasuryKey = PrivateKey.fromString(import.meta.env.VITE_PUBLIC_TREASURY_KEY!)
const bhcToken = "0.0.48163190"

export default async (buyerId: string, bhc = false) => {
    const buyer = AccountId.fromString(buyerId)
    const transactionId = TransactionId.generate(buyer)
    // fetch first serial of treasury nft array
    const res = await fetch(`${import.meta.env.VITE_PUBLIC_MIRRORNODE}/api/v1/accounts/${treasuryId}/nfts?token.id=${nftToken}`)
    const data = await res.json()
    const serial = data.nfts[0].serial_number
    const tokenTransferTx = new TransferTransaction()
        .setTransactionId(transactionId)
        .setNodeAccountIds([new AccountId(3)])
        .addNftTransfer(nftToken, serial, treasuryId, buyer)

    if (bhc) {
        tokenTransferTx
            .addTokenTransfer(bhcToken, buyer, -200)
            .addTokenTransfer(bhcToken, treasuryId, 200)
    } else {
        tokenTransferTx
            .addHbarTransfer(buyer, new Hbar(-1 * 200))
            .addHbarTransfer(treasuryId, new Hbar(200))
    }

    await tokenTransferTx
        .freeze()
        .sign(treasuryKey)


    return tokenTransferTx.toBytes()
}