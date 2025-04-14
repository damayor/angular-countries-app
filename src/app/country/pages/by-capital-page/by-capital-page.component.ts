import { Component } from '@angular/core';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";

@Component({
  selector: 'app-by-capital-page',
  imports: [TopMenuComponent, CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  onSearch(value: string) {
    console.log({value});
    // this.searchValue.emit(value)
  }

}
