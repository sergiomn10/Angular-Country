import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  // el snapshot toma los valores una primera vez y no esta actualizando como un obervable
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);

  // ESTE NUEVO COMPONENTE DE resource ESTA DISPONIBLE APARTIR DE LA VERSION 19
  // rxResource trabaja con observables
  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) {
        // el of es para retornar el tipo de lo que esta esperando el codigo en este caso un obervable array
        return of([]);
      }

        this.router.navigate(['./country/by-country'], {
        queryParams: {
          query: params.query,
        }
      });
      return this.countryService.searchByCountry(params.query);
    },
  });
 }
