import hashconnect, { appMetadata } from "./hashconnect"
import accountStore from '../../stores/accountStore'


export default async () => {
    hashconnect.connectToLocalWallet();

    let unsubscribe

    // send ping to wallet
    // hashconnect.foundExtensionEvent.once((walletMetadata) => {
    //     hashconnect.connectToLocalWallet(initData.pairingString, walletMetadata);
    // })
    // handle pairing and sessionStorage structure
    hashconnect.pairingEvent.once((pairingData) => {
        unsubscribe = accountStore.update(value => {
            let updatedValue = value
            pairingData.accountIds.forEach((id) => {
                if (value.accounts.indexOf(id) === -1) {
                    updatedValue.accounts.push(id)
                }
            })
            updatedValue.active = 0
            return updatedValue
        })
    })
}