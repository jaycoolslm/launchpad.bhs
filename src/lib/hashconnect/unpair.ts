import accountStore from "$lib/stores/accountStore";

export default () => {
    accountStore.set("")
    localStorage.removeItem("hashconnectData")
    location.reload()
}