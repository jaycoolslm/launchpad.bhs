import hashconnect, { appMetadata } from "./hashconnect"
import accountStore from '$lib/stores/accountStore'


export default async () => {
    hashconnect.connectToLocalWallet();


    // send ping to wallet
    // hashconnect.foundExtensionEvent.once((walletMetadata) => {
    //     hashconnect.connectToLocalWallet(initData.pairingString, walletMetadata);
    // })
    // handle pairing and sessionStorage structure



}