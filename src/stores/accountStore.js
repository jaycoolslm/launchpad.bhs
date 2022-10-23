import { writable } from "svelte/store";

let accountStore = {
    accounts: [],
    active: null
};
// console.log(localStorage.getItem('hashconnectData'))

if (localStorage.getItem('hashconnectData')) {
    const { pairingData } = JSON.parse(localStorage.getItem('hashconnectData'))
    pairingData.forEach(data => {
        data.accountIds.forEach(id => {
            if (accountStore.accounts.indexOf(id) === -1) {
                accountStore.accounts.push(id)
            }
        })
    })
    accountStore.active = 0
}

export default writable(accountStore)