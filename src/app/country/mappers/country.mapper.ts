import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-contries.interface";

export class CountryMapper {


  static mapRestCountryToCountry(item: RESTCountry) : Country {

    return {
      cca2 : item.cca2,
      flag : item.flag,
      flagSvg : item.flags.svg,
      name : item.translations["spa"].common,
      capital : item.capital.at(0),
      population : item.population
    }
  }

  static mapRestConutriesToCountries(items: RESTCountry[]) : Country[] {
    return items.map( item => this.mapRestCountryToCountry(item) )
  }


}
