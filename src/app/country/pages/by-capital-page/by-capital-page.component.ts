import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  // el snapshot toma los valores una primera vez y no esta actualizando como un obervable
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);

  // rxResource trabaja con observables
  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) {
        // el of es para retornar el tipo de lo que esta esperando el codigo en este caso un obervable array
        return of([]);
      }

      this.router.navigate(['./country/by-capital'], {
        queryParams: {
          query: params.query,
          hola: 'mundo',
          saludos: 'sergio'
        }
      });
      return this.countryService.searchByCapital(params.query);
    },
  });

  // ESTE NUEVO COMPONENTE DE resource ESTA DISPONIBLE APARTIR DE LA VERSION 19
  // TRABAJA CON PROMESAS

  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (!params.query) {
  //       return [];
  //     }

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(params.query)
  //     );
  //   },
  // });

  // EN LA VERSION MENOR A 19 SOLO SE PUEDE HACER DE ESTA MANERA
  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoading()) {
  //     return;
  //   }

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query).subscribe({
  //     // next(countries) {
  //     // se colocan los : y => para no perder la referencia al this
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     },
  //   });
  // }
}
