export const prerender = true;

import { writable } from "svelte/store";

let accountStore: {
    accounts: string[]
    active: number | null
} = {
    accounts: [],
    active: null
};
// console.log(localStorage.getItem('hashconnectData'))



export default writable(accountStore)