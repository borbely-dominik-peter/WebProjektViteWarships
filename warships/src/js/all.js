export default class All{
    constructor(){
        this.TableMaker()
    }

    async LoadShipsJSON(){
        const response = await fetch("http://localhost:3000/Warships");
        const convresp = await response.json();
        return convresp;
    }

    async LoadCountriesJSON(){
        const response = await fetch("http://localhost:3000/countries");
        const convresp = await response.json();
        return convresp;
    }

    async TableMaker(){
        const ShipData = await this.LoadShipsJSON();
        const CountryData = await this.LoadCountriesJSON();
        const TargetTable = document.querySelector("#TargetTable tbody");
        TargetTable.innerHTML = "";
        ShipData.forEach(Ship => {
            let tr = document.createElement("tr");
            let ShipCountryShort = "";
            let ShipCountry = "";
            CountryData.forEach(Country => {
                console.log(Country)
                console.log(Ship.country)
                if (Country.name == Ship.country) {
                    ShipCountryShort = Country.shortname
                    ShipCountry = Country.name
                }
            });
            tr.innerHTML += `
                <td><img src="/src/images/${ShipCountryShort}.png" alt="..."></td>
                <td>${ShipCountry}</td>
                <td>${Ship.name}</td>
                <td>${Ship.class}</td>
                <td>${Ship.type}</td>
                <td>${Ship.launched}</td>
                <td>${Ship.main_gun_caliber}</td>
            `
            TargetTable.appendChild(tr);
        });
    }
}