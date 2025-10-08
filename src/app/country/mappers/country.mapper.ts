import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital?.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish name',
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
    };
  }


  static mapRestCountryArrayToCountryArray( restCountries: RESTCountry[] ): Country[]{
    // return restCountries.map( (country) => this.mapRestCountryToCountry(country));
    // se puede reducir cuando los argumentos enviados son todos los solicitados si declarar el objeto con =>
    return restCountries.map(this.mapRestCountryToCountry);
  }
}
