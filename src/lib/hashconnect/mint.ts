import hashconnect, { appMetadata } from "./hashconnect"
import accountStore from '$lib/stores/accountStore'
import txStore from "$lib/stores/txStore";

export default async (bhc: boolean) => {
    const initData = await hashconnect.init(appMetadata, 'testnet', false);

    let buyer
    const unsubscribe = accountStore.subscribe(value => {
        buyer = value.accounts[value.active!]
    })

    console.log(buyer, 'buyer')

    const res = await fetch(`/api/buy-${bhc ? "bhc" : "hbar"}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ buyer })
    })

    const bytes = await res.json()
    console.log(bytes, 'bytes')

    const txData = {
        topic: initData.topic,
        byteArray: bytes,
        metadata: {
            accountToSign: buyer,
            returnTransaction: false,
            hideNft: true
        }
    }

    await hashconnect.sendTransaction(initData.topic, txData)
        .then((res) => {
            if (!res.success) {
                alert("Mint Failed!")
                throw new Error("Mint failed!")
            }
            console.log('res', res)
            const { transactionId } = res.response
            unsubscribe()
            txStore.set(transactionId)
        })
        .catch(err => {
            console.error(err)
            txStore.set("")
        })
}