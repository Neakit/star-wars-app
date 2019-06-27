export default class SwapiService {
    // private variable
    _apiBase = 'https://swapi.co/api' 

    async getResource (url) {
        const res = await fetch(`${this._apiBase}${url}`);
        
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        
        return await res.json();
    }

    async getAllPlanets() {
        const res = await this.getResource(`/planet/`);
        return res.results.map(this._transformPlanet);
    }

    async getAllPeople() {
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson);
    }

    async getAllStartships() {
        const res = await this.getResource(`/startships/`);

        return res.results.map(this._transformStarship);
    }

    async getPerson(id) {
        const person = await this.getResource(`/people/${id}`);
        return this._transformPerson(person);
    }

    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}`);
        return this._transformPlanet(planet);
    }

    getStarship(id) {
        return this.getResource(`/starships/${id}`);
    }

    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformPlanet = (planet) => {
          return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter 
        } 
    }

    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.length,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    }

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            sex: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor 
        }
    }
}
