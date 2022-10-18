import accountStore from "../../stores/accountStore";

export default () => {
    accountStore.set("")
    localStorage.removeItem("hashconnectData")
    location.reload()
}