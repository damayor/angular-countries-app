import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country, Region } from '../../interfaces/country.interface';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map, of } from 'rxjs';
import { CountryService } from '../../services/country.service';

function validateQueryParam(queryParam: string) {

  queryParam = queryParam.toLowerCase();
  const validRegions: Record<string, Region> = {
    'africa':'Africa',
    'americas':'Americas',
    'asia':'Asia',
    'europe':'Europe',
    'oceania':'Oceania',
    'antarctic':'Antarctic'
  }

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export default class ByRegionPageComponent {

  countries = signal<Country[]>([])

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  // region = toSignal(inject(ActivatedRoute).params.pipe( map((params) => params['region']) ));

  countryService = inject(CountryService);
  selectedRegion = linkedSignal<Region>( () => validateQueryParam(this.queryParam));

  countryResource = rxResource({
    request:() => ({region : this.selectedRegion()}),
    loader: ({request}) => {
      if(!request.region ) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {region: request.region}
      })

      return this.countryService.searchByRegion(request.region)
    }
  })



}
