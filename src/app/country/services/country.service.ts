import { Country } from './../interfaces/country.interface';
import { CountryMapper } from './../mappers/country.mapper';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-contries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';


const API_URL = 'https://restcountries.com/v3.1'


@Injectable({
  providedIn: 'root'
})
export class CountryService {


  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();



  searchByCapital(query: string) : Observable<Country[]>{
    query = query.toLowerCase();

    if(this.queryCacheCapital.has(query)) {
      return of( this.queryCacheCapital.get(query) ?? []);
    }

    console.log(`Llegando al servidor endpoint por ${query}`)

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`   ).
    pipe(
      map((data) => CountryMapper.mapRestConutriesToCountries(data)),
      tap( countries =>  this.queryCacheCapital.set(query, countries)),
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

    if(this.queryCacheCountry.has(query)) {
      return of( this.queryCacheCountry.get(query) ?? []);
    }

    console.log(`Llegando al endpoint por ${query}`)

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).
    pipe(
      map((data) => CountryMapper.mapRestConutriesToCountries(data)),
      tap( countries =>  this.queryCacheCountry.set(query, countries)),
      delay(1000),
      catchError(error => {
        console.log("Error fetching " , error)
        return throwError(
          () => new Error('No se pudo tener paises con el query ' + query)
         )
      })
    )
  }

  searchByRegion(region: string): Observable<Country[]> {

    if(this.queryCacheRegion.has(region)) {
      return of( this.queryCacheRegion.get(region) ?? []);
    }

    console.log(`Llegando al endpoint por ${region}`)

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).
      pipe(
        map((data) => CountryMapper.mapRestConutriesToCountries(data)),
        tap( countries =>  console.log("Countries by region ",countries) /*this.queryCacheRegion.set(region, countries)*/),
        catchError(error => {
          console.log("Error fetching " , error)
          return throwError(
            () => new Error('No se pudo tener paises por la region ' + region)
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
