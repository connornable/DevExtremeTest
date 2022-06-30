import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from './pokemon.service';
import { IPokemon } from '../pokemon/Pokemon';
import { DxButtonModule } from 'devextreme-angular/ui/button';



@Component({
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {
  dataSource: any;
  pokemon: IPokemon[] = []
  selectedItemKeys: any =[];
  popupVisible: boolean = false;
  pokeSprite: string = "";
  cahngeSelectionOptions: any;

  constructor(private httpClient: HttpClient, private PokemonService: PokemonService) {
  }
  ngAfterViewInit() {
this.pokemon = this.PokemonService.getPokemon();
console.log(this.pokemon);
    }

    selectionChanged(data: any) {
      this.selectedItemKeys = data.selectedRowKeys;
      this.pokeSprite = this.pokemon[this.selectedItemKeys[0].id - 1].sprite
      console.log(this.selectedItemKeys[0].id);
    }

    click = (e: any) => {this.popupVisible = true, console.log("popup")};

    changeSelection() {
       this.selectedItemKeys =
       console.log(this.selectedItemKeys[0].id)
    }

    nextPokemon(e: any) {
      this.selectedItemKeys[0].id + 1;
      this.pokeSprite = this.pokemon[this.selectedItemKeys[0].id - 1].sprite
    }
    
  }

