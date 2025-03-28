export default class ByYear{
    constructor(){
        this.OptionFiller();
        this.TableMaker();
        document.querySelector("#YearOpt").addEventListener("input", async (event) => {
            this.TableMaker(event.target.value)
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
        const data = await this.LoadShipsJSON();
        const formSelect = document.querySelector("#YearOpt")
        const classGroups = Object.groupBy(data, ({launched}) => launched);
        let selectList = [];
        Object.entries(classGroups).forEach(entry => {
            const[key] = entry;
            selectList.push({name: key});
        });
        selectList.sort((a,b) => a.name.localeCompare(b.name));
        let options = '<option value="">All</option>'
        selectList.forEach(c =>{
            options += `<option value="${c.name}">${c.name}</option>`;
        });
        formSelect.innerHTML = options;
    }

    async TableMaker(){
        var ChosenYear = document.querySelector("#YearOpt").value;
        const ShipData = await this.LoadShipsJSON();
        const CountryData = await this.LoadCountriesJSON();
        const TargetTable = document.querySelector("#TargetTable tbody");
        TargetTable.innerHTML = "";
        ShipData.forEach(Ship => {
            if (ChosenYear == Ship.launched || ChosenYear == "") {
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