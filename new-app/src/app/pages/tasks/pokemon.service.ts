import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemon } from '../pokemon/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonList: IPokemon[] = [];
  private url: string = 'https://pokeapi.co/api/v2/pokemon/';
  typeList: any[] = [{
    type: "bug",
    value: 0,
  },
  {
    type: "dragon",
    value: 0,
  },
  {
    type: "electric",
    value: 0,
  },
  {
    type: "fairy",
    value: 0,
  },
  {
    type: "fighting",
    value: 0,
  },
  {
    type: "fire",
    value: 0,
  },
  {
    type: "ghost",
    value: 0,
  },
  {
    type: "grass",
    value: 0,
  },
  {
    type: "ground",
    value: 0,
  },
  {
    type: "ice",
    value: 0,
  },
  {
    type: "normal",
    value: 0,
  },
  {
    type: "poison",
    value: 0,
  },
  {
    type: "psychic",
    value: 0,
  },
  {
    type: "rock",
    value: 0,
  },
  {
    type: "water",
    value: 0,
  },];

  constructor(private httpClient: HttpClient) {
this.initPokemon();
   }


 initPokemon() {
  for (let i = 1; i < 152; i++) {
    
    let pokemon: IPokemon = {
      sprite: [],
      id: undefined,
      name: "",
      height: 0,
      type: ''
    };
    
    this.httpClient.get(this.url + i).subscribe((data: any) => {
     // console.log(data)
       pokemon.sprite[0] = data.sprites.front_default;
       pokemon.sprite[1] = data.sprites.back_default;
       pokemon.sprite[2] = data.sprites.front_shiny;
       pokemon.sprite[3] = data.sprites.back_shiny;
       pokemon.id = data.id;
       pokemon.name = data.name;
       pokemon.height = data.height;
       pokemon.type = data.types[0].type.name;
       this.calculateTypeCount(pokemon.type);
       
    })
    this.pokemonList.push(pokemon);

  }
}

public getPokemon(): IPokemon[] {
  return this.pokemonList;
}

calculateTypeCount(type: string) {

  switch(type) {
    case 'bug': {
      ++this.typeList[0].value;
      break;
    }
    case "dragon": {
      this.typeList[1].value ++;
      break;
    }
    case "electric": {
      this.typeList[2].value ++;
      break;
    }
    case "fairy": {
      this.typeList[3].value ++;
      break;
    }
    case "fighting": {
      this.typeList[4].value ++;
      break;
    }
    case "fire": {
      this.typeList[5].value ++;
      break;
    }
    case "ghost": {
      this.typeList[6].value ++;
      break;
    }
    case "grass": {
      this.typeList[7].value ++;
      break;
    }
    case "ground": {
      this.typeList[8].value ++;
      break;
    }
    case "ice": {
      this.typeList[9].value ++;
      break;
    }
    case "normal": {
      this.typeList[10].value ++;
      break;
    }
    case "poison": {
      this.typeList[11].value ++;
      break;
    }
    case "psychic": {
      this.typeList[12].value ++;
      break;
    }
    case "rock": {
      this.typeList[13].value ++;
      break;
    }
    case "water": {
      this.typeList[14].value ++;
      break;
    }
  }
}

getTypeCount() {
  console.log(this.typeList);
return this.typeList;
}

}
