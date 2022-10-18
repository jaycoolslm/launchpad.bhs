import hashconnect, { appMetadata } from "./hashconnect"
import accountStore from '../../stores/accountStore'


export default async () => {
    const initData = await hashconnect.init(appMetadata, "testnet", false)
    // send ping to wallet
    hashconnect.foundExtensionEvent.once((walletMetadata) => {
        hashconnect.connectToLocalWallet(initData.pairingString, walletMetadata);
    })
    // handle pairing and sessionStorage structure
    hashconnect.pairingEvent.once((pairingData) => {
        accountStore.set(pairingData.accountIds[0])
    })
}