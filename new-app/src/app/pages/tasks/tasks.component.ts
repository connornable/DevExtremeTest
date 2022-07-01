import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from './pokemon.service';
import { IPokemon } from '../pokemon/Pokemon';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { delay } from 'rxjs';

@Component({
  templateUrl: 'tasks.component.html',
})
export class TasksComponent {
  dataSource: any;
  pokemon: IPokemon[] = [];
  selectedItemKeys: any = [];
  popupVisible: boolean = false;
  pokeSprite: string = '';
  cahngeSelectionOptions: any;
  canAnimate: boolean = false;
  typeList: any[] = [];

  constructor(
    private httpClient: HttpClient,
    private PokemonService: PokemonService
  ) {}

  async ngOnInit() {
    await new Promise( (f) => setTimeout(f, 1000))
    this.pokemon = this.PokemonService.getPokemon();
    this.typeList = this.PokemonService.getTypeCount();
    console.log(this.typeList[0].value);
   
   
  }


  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
    this.pokeSprite = this.pokemon[this.selectedItemKeys[0].id - 1].sprite[0];
  //  console.log(this.selectedItemKeys[0].id);
  }

  click = (e: any) => {
    (this.popupVisible = true), console.log("works");
  };

  popup_hiding(e: any) {
    this.canAnimate = false;
  }

  popup_shown(e: any) {
    this.canAnimate = true;
    this.animate();
  }

  async animate() {
   let i = 0;
   while (this.canAnimate) {
    this.pokeSprite = this.pokemon[this.selectedItemKeys[0].id - 1].sprite[i];
    console.log("hello");
    i++;
    await new Promise(f => setTimeout(f, 1000));
    if (i === this.pokemon[this.selectedItemKeys[0].id - 1].sprite.length) {
      i = 0;
    }
   }
  
}


}
