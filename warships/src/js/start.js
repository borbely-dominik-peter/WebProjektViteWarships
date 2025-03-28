export default class Start{
    constructor() {
        this.Counter()
        this.AddCountries()
    }

    async LoadJSON(){
        const response = await fetch("http://localhost:3000/Warships");
        const convresp = await response.json();
        return convresp;
    }

    async LoadCountriesJSON(){
        const response = await fetch("http://localhost:3000/countries");
        const convresp = await response.json();
        return convresp;
    }

    async Counter(){
        const data = await this.LoadJSON();
        let countries = await this.LoadCountriesJSON();
        let CountryCount = countries.length;
        let ShipCount = data.length
        console.log(data);
        document.querySelector("#CountryCount").innerHTML = CountryCount;
        document.querySelector("#ShipCount").innerHTML = ShipCount;
    }

    async AddCountries(){
        let countries = await this.LoadCountriesJSON();
        countries.forEach(c => {
            let li = document.createElement("li");
            li.innerHTML =  c.name;
            document.querySelector("#countries").appendChild(li);
        });
    }
}