export default class ByCountry{
    constructor(){
        this.OptionFiller();
        document.querySelector("#CountryOpt").addEventListener("input", async (event) => {
            this.TableMaker(document.querySelector("#CountryOpt").value)
        })
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

    async OptionFiller(){
        const data = await this.LoadCountriesJSON();
        data.forEach(dat => {
            document.querySelector("#CountryOpt").innerHTML += `
                <option value="${dat.name}">${dat.name}</option>
            `
        })
    }

    async TableMaker(ChosenCountry){
        const ShipData = await this.LoadShipsJSON();
        const CountryData = await this.LoadCountriesJSON();
        const TargetTable = document.querySelector("#TargetTable tbody");
        TargetTable.innerHTML = "";
        ShipData.forEach(Ship => {
            if (ChosenCountry == Ship.country) {
                let tr = document.createElement("tr");
                let ShipCountryShort = "";
                let ShipCountry = "";
                CountryData.forEach(Country => {
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
            }
        });
    }
}