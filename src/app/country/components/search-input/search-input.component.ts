import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  placeholder = input('Buscar');

  initialValue = input<string>('');

  value = output<string>();
  debounceTime = input(2000)

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '')
  debounceEffect = effect ((onCleanUp) => {

    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
    } , this.debounceTime())

    onCleanUp(() => {
      clearTimeout(timeout);
    })
  })



}
