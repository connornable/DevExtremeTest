import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemon } from '../pokemon/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonList: IPokemon[] = [];
  private url: string = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private httpClient: HttpClient) {
this.init();
   }

  init() {

    for (let i = 1; i < 152; i++) {
    
    let pokemon: IPokemon = {
      sprite: '',
      id: undefined,
      name: '',
      height: 0,
      type: ''
    };
    
    this.httpClient.get(this.url + i).subscribe((data: any) => {
      console.log(data)
       pokemon.sprite = data.sprites.front_default;
       pokemon.id = data.id;
       pokemon.name = data.name;
       pokemon.height = data.height;
       pokemon.type = data.types[0].type.name;
       
    })
    this.pokemonList.push(pokemon);

  }
}

public getPokemon(): IPokemon[] {
  return this.pokemonList;
}
}
