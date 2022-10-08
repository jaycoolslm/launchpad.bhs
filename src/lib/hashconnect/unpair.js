import accountStore from "../../accountStore";

export default () => {
    accountStore.set("")
    localStorage.removeItem("hashconnectData")
    location.reload()
}