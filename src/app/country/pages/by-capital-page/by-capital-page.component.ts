import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, resource, signal } from '@angular/core';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-contries.interface';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = signal(this.queryParam);

  countryResource = rxResource({
    request: () => ({query : this.query() }),
    loader: ({request}) => {
      console.log({query: request.query})
      if(!request.query ) return of([]);

      this.router.navigate(['/country/by-capital'], {
        queryParams: {query: request.query}
      })
      return this.countryService.searchByCapital(request.query)

    }
  })



  // V3 Resource with value, isLoading and error props.
  // countryResource = resource({
  //   request: () => ({query : this.query() }),
  //   loader: async({request}) => {
  //     if(!request.query ) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(request.query)
  //     );
  //   }
  // })


  //V2 con suscribe, next y error
  // isLoading = signal(false)
  // isError = signal<string|null>(null)
  // countries = signal<Country[]>([])

  // onSearch(query: string) {
  //   if(this.isLoading()) return;
  //   this.isLoading.set(true)
  //   this.isError.set(null)

  //   console.log({query});
  //   this.countryService.searchByCapital(query)
  //     .subscribe({
  //       next: (countries) => {
  //         this.isLoading.set(false);
  //         this.countries.set(countries);
  //       },
  //       error: (err) => {
  //         console.log(err)
  //         this.isLoading.set(false);
  //         this.countries.set([]);
  //         this.isError.set(err)
  //       }
  //     })
  //     // V1
  //     // .subscribe((countries) => {
  //     //   this.isLoading.set(false);
  //     //   this.countries.set(countries)

  //     //   console.log({countries});
  //     // } );;
  // }

}
