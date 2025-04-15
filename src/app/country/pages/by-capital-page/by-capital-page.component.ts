import { Component, inject, signal } from '@angular/core';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-contries.interface';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [TopMenuComponent, CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);

  isLoading = signal(false)
  isError = signal<string|null>(null)
  countries = signal<Country[]>([])

  onSearch(query: string) {

    if(this.isLoading()) return;

    this.isLoading.set(true)
    this.isError.set(null)


    console.log({query});
    this.countryService.searchByCapital(query)
      .subscribe((countries) => {


        this.isLoading.set(false);
        this.countries.set(countries)

        console.log({countries});
      } );;
  }

}
