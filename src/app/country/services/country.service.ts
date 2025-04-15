import { CountryMapper } from './../mappers/country.mapper';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-contries.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';


const API_URL = 'https://restcountries.com/v3.1'


@Injectable({
  providedIn: 'root'
})
export class CountryService {


  private http = inject(HttpClient);


  searchByCapital(query: string) : Observable<Country[]>{
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`   ).
    pipe(
      map((data) => CountryMapper.mapRestConutriesToCountries(data)),
      catchError(error => {
        console.log("Error fetching " , error)
        return throwError(
          () => new Error('No se pudo tener paises con el query ' + query)
         )
      })

    )
  }

  searchByCountry(query: string) : Observable<Country[]>{
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).
    pipe(
      map((data) => CountryMapper.mapRestConutriesToCountries(data)),
      delay(1000),
      catchError(error => {
        console.log("Error fetching " , error)
        return throwError(
          () => new Error('No se pudo tener paises con el query ' + query)
         )
      })
    )
  }

  searchByCountryByAlphaCode(code: string) : Observable<Country>{
    // code = code.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).
      pipe(
        map((data) => CountryMapper.mapRestConutriesToCountries(data)),
        map(countries => countries[0]),

        catchError(error => {
          console.log("Error fetching " , error)
          return throwError(
            () => new Error('No se pudo tener paises con el codigo ' + code)
          )
        })
      )
  }




}
