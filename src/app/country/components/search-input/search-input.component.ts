import {
  Component,
  effect,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  placeholder = input('Buscar');
  value = output<string>();
  debounceTime = input(1000);
  initialValue = input<string>('');

  // el linkedSignal es para inicializar una señal con algun proceso computado
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  // un efecto para emitir cada tecla ingresada en el input buscar, con una relentizacion de 500 milisegundos para que no emita al instante de teclear, y lo emita cuando se deje de escribir
  // oncleanup es para limpiar el efecto cuando se vuelve a disparar el efecto cuando cambie el input
  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
