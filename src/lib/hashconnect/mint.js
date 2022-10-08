import hashconnect, { appMetadata } from "./hashconnect"
import accountStore from '../../accountStore'

export default async () => {
    const initData = await hashconnect.init(appMetadata, 'testnet', false);

    let buyer
    const unsubscribe = accountStore.subscribe(value => {
        buyer = value
    })

    console.log('buyer', buyer)

    const res = await fetch('https://launchpad-serverbhs-production.up.railway.app/transaction', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ buyer })
    })

    const { bytes } = await res.json()
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
            console.log('res', res)
            unsubscribe()
        })
        .catch(err => {
            console.error(err)
        })
}