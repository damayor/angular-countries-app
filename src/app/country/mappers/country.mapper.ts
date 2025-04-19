import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-contries.interface";

export class CountryMapper {


  static mapRestCountryToCountry(item: RESTCountry) : Country {

    return {
      cca2 : item.cca2,
      flag : item.flag,
      flagSvg : item.flags.svg,
      name : item.translations["spa"].common,
      capital : item.capital?.at(0),
      population : item.population,
      phoneCode: item.idd.root + item.idd?.suffixes[0],
      domain: item.tld ? item.tld[0] : 'N/A',
      coatSvg: item.coatOfArms.svg,
      area: item.area,
      region: item.region,
      subregion: item.subregion
    }
  }

  static mapRestConutriesToCountries(items: RESTCountry[]) : Country[] {
    return items.map( item => this.mapRestCountryToCountry(item) )
  }


}
