import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template:`
    <h5>Buscar</h5>
    <input type="text"
      class="form-control"
      placeholder="Buacar Gifs"
      (keyup.enter)="searchTag()"
      #txtTagInput
    >
  `
})

export class SearchBoxComponent {


  @ViewChild('txtTagInput')
  public tagInput!:ElementRef<HTMLInputElement>;


  /*
    llamamos el servicio gifService
    y para llmarlo lo inyectamos en el constructor.
  */
  constructor(private gifService:GifService ) { }


  /* este search tag sera llmado desde el lado del template */
  searchTag(){
    const newTag = this.tagInput.nativeElement.value;

    this.gifService.searchTag(newTag)
    this.tagInput.nativeElement.value = '';

  }
}
