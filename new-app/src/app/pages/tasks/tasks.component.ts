import { Component, ViewChild } from '@angular/core';
import 'devextreme/data/odata/store';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from './pokemon.service';
import { IPokemon } from '../pokemon/Pokemon';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
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
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent | undefined;
  

  

  constructor(
    private httpClient: HttpClient,
    private PokemonService: PokemonService
  ) {}

  async ngOnInit() {
    await new Promise( (f) => setTimeout(f, 1000))
    this.pokemon = this.PokemonService.getPokemon();
    this.typeList = this.PokemonService.getTypeCount();
    console.log(this.typeList[0].value);
    console.log(this.pokemon);
 
    
   
   
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
    let filter = this.dataGrid?.instance.getCombinedFilter();
    if (filter) {
    filter.forEach((element: { filterValue: any; }) => {
      console.log(element.filterValue);
    });
  }
    
    this.animate();
  }

  contentReady(e: any) {
    console.log("content updataed" + e.content);
  }

  async animate() {
    if(this.pokeSprite) {
   let i = 0;
   while (this.canAnimate) {
    this.pokeSprite = this.pokemon[this.selectedItemKeys[0].id - 1].sprite[i];
    i++;
    await new Promise(f => setTimeout(f, 1000));
    if (i === this.pokemon[this.selectedItemKeys[0].id - 1].sprite.length) {
      i = 0;
    }
   }
  }
  
}


}
