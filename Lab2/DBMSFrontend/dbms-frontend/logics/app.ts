import Router from "next/router"

export const routerJump = (menuKey: string) => {
    switch (menuKey) {
        default:
        case "0":
            Router.push("/flights");
            break;
        case "1":
            Router.push("/atc_query");
            break;
        case "2":
            Router.push("/airline_stats");
            break;
    }
}