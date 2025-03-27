// code goes brrr

import All from "./all.js";
import Start from "./start.js";
import ByCountry from "./bycountry.js";

const ROUTINGTARGET = document.querySelector("#root");

const PAGESFOLDER = "/src/html/"

const NavLinks = document.querySelectorAll("a[data-href]");

const RoutingTable = {
    "/" : {page: "start.html", code: Start},
    "/all" : {page: "all.html", code: All},
    "/bycountry" : {page: "bycountry.html", code: ByCountry},
    "/byclass" : {page: "byclass.html", code: null},
    "/credits" : {page: "credits.html", code: null}
}

const LoadPage = async (page) => {
    const resp = await fetch(PAGESFOLDER+page);
    const convresp = await resp.text();
    return convresp;
}

const NavClickEvent = async (event) => {
    event.preventDefault();
    let page = event.target.dataset.href;
    let data = await LoadPage(RoutingTable[page].page);
    DynCode(RoutingTable[page].code)
    window.history.pushState({},"",page)
    ROUTINGTARGET.innerHTML = data;
}

const DynCode = (code) => {
    if (code != null) {
        let DynamicCode = eval(code);
        new DynamicCode();
    }
}

window.addEventListener("popstate", async () => {
    const data = await LoadPage(RoutingTable[window.location.pathname].page);
    ROUTINGTARGET.innerHTML = data;
    DynCode(RoutingTable[window.location.pathname].code);
})

window.addEventListener("load", async () => {
    const data = await LoadPage(RoutingTable[window.location.pathname].page);
    ROUTINGTARGET.innerHTML = data;
    DynCode(RoutingTable[window.location.pathname].code);

})

NavLinks.forEach(NavI => {
    NavI.addEventListener("click", NavClickEvent)
})
