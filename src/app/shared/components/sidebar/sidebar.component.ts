import { Component } from '@angular/core';
import { GifService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor ( private gifService: GifService){}

  get tags(): string[] {
    /* tag histori es el geter del servicio
    donde retorna las propiedades
    del elemento del arreglo*/
    return this.gifService.tagHistory;

  }

  searchTag(tag: string): void{
    this.gifService.searchTag( tag );
  }
}
