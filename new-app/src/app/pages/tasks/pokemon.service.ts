import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemon } from '../pokemon/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemonList: IPokemon[] = [];
  private url: string = 'https://pokeapi.co/api/v2/pokemon/';
  typeList: any[] = [
    {
      type: 'bug',
      value: 0,
    },
    {
      type: 'dragon',
      value: 0,
    },
    {
      type: 'electric',
      value: 0,
    },
    {
      type: 'fairy',
      value: 0,
    },
    {
      type: 'fighting',
      value: 0,
    },
    {
      type: 'fire',
      value: 0,
    },
    {
      type: 'ghost',
      value: 0,
    },
    {
      type: 'grass',
      value: 0,
    },
    {
      type: 'ground',
      value: 0,
    },
    {
      type: 'ice',
      value: 0,
    },
    {
      type: 'normal',
      value: 0,
    },
    {
      type: 'poison',
      value: 0,
    },
    {
      type: 'psychic',
      value: 0,
    },
    {
      type: 'rock',
      value: 0,
    },
    {
      type: 'water',
      value: 0,
    },
  ];

  heightList: any[] = [];
  statsList: any[] = [
    {
      name: 'HP',
      firstPokemonComparisonSlot: 0,
      secondPokemonComparisonSlot: 0,
    },
    {
      name: 'Attack',
      firstPokemonComparisonSlot: 0,
      secondPokemonComparisonSlot: 0,
    },
    {
      name: 'Defense',
      firstPokemonComparisonSlot: 0,
      secondPokemonComparisonSlot: 0,
    },
    {
      name: 'Special Attack',
      firstPokemonComparisonSlot: 0,
      secondPokemonComparisonSlot: 0,
    },
    {
      name: 'Special Defense',
      firstPokemonComparisonSlot: 0,
      secondPokemonComparisonSlot: 0,
    },
    {
      name: 'Speed',
      firstPokemonComparisonSlot: 0,
      secondPokemonComparisonSlot: 0,
    },
  ];

  constructor(private httpClient: HttpClient) {
    this.initPokemon();
  }

  initPokemon() {
    for (let i = 1; i < 152; i++) {
      let pokemon: IPokemon = {
        sprite: [],
        id: undefined,
        name: '',
        height: 0,
        type: '',
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      };

      this.httpClient.get(this.url + i).subscribe((data: any) => {
        pokemon.sprite[0] = data.sprites.front_default;
        pokemon.sprite[1] = data.sprites.back_default;
        pokemon.sprite[2] = data.sprites.front_shiny;
        pokemon.sprite[3] = data.sprites.back_shiny;
        pokemon.id = data.id;
        pokemon.name = data.name;
        pokemon.height = data.height;
        pokemon.type = data.types[0].type.name;
        pokemon.hp = data.stats[0].base_stat;
        pokemon.attack = data.stats[1].base_stat;
        pokemon.defense = data.stats[2].base_stat;
        pokemon.specialAttack = data.stats[3].base_stat;
        pokemon.specialDefense = data.stats[4].base_stat;
        pokemon.speed = data.stats[5].base_stat;
        this.calculateTypeCount(pokemon.type);
        this.buildHeightMap(data.height);
      });
      this.pokemonList.push(pokemon);
    }
  }

  public getPokemon(): IPokemon[] {
    return this.pokemonList;
  }

  initStatList(pokemon: IPokemon) {
    let statObject = {
      pokemonName: '',
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    };
    statObject.pokemonName = pokemon.name;
    statObject.hp = pokemon.hp;
    statObject.attack = pokemon.attack;
    statObject.defense = pokemon.defense;
    statObject.specialDefense = pokemon.specialDefense;
    statObject.specialAttack = pokemon.specialAttack;
    statObject.speed = pokemon.speed;
  }

  buildHeightMap(height: number) {
    let heightObj = {
      height: '',
      value: 1,
    };
    // if(this.heightList.has(height)) {
    //   this.heightList.set(height, this.heightList.get(++height) );
    // }
    // else {
    //   this.heightList.set(height, 1);
    // }
    if (this.heightList.some((e) => e.height === height.toString())) {
      const index = this.heightList.findIndex(
        (item) => item.height === height.toString()
      );
      ++this.heightList[index].value;
    } else {
      heightObj.height = height.toString();
      this.heightList.push(heightObj);
    }
  }

  calculateTypeCount(type: string) {
    switch (type) {
      case 'bug': {
        ++this.typeList[0].value;
        break;
      }
      case 'dragon': {
        this.typeList[1].value++;
        break;
      }
      case 'electric': {
        this.typeList[2].value++;
        break;
      }
      case 'fairy': {
        this.typeList[3].value++;
        break;
      }
      case 'fighting': {
        this.typeList[4].value++;
        break;
      }
      case 'fire': {
        this.typeList[5].value++;
        break;
      }
      case 'ghost': {
        this.typeList[6].value++;
        break;
      }
      case 'grass': {
        this.typeList[7].value++;
        break;
      }
      case 'ground': {
        this.typeList[8].value++;
        break;
      }
      case 'ice': {
        this.typeList[9].value++;
        break;
      }
      case 'normal': {
        this.typeList[10].value++;
        break;
      }
      case 'poison': {
        this.typeList[11].value++;
        break;
      }
      case 'psychic': {
        this.typeList[12].value++;
        break;
      }
      case 'rock': {
        this.typeList[13].value++;
        break;
      }
      case 'water': {
        this.typeList[14].value++;
        break;
      }
    }
  }

  getStatsList() {
    return this.statsList;
  }

  getTypeCount() {
    return this.typeList;
  }

  getHeightCount() {
    this.heightList.sort((a, b) =>
      parseInt(a.height) < parseInt(b.height) ? -1 : 1
    );

    return this.heightList;
  }
}
