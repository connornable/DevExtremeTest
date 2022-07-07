import { Component, ViewChild } from '@angular/core';
import 'devextreme/data/odata/store';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from './pokemon.service';
import { IPokemon } from '../pokemon/Pokemon';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import {
  DxChartComponent,
  DxDataGridComponent,
  DxDataGridModule,
} from 'devextreme-angular';
import { delay } from 'rxjs';

@Component({
  templateUrl: 'tasks.component.html',
})
export class TasksComponent {
  // @ViewChild(DxChartComponent)
  // chart!: DxChartComponent;
  // ds: any = {};
  // getDataSource() {
  //     this.ds = this.chart.instance.getDataSource();
  // }

  dataSource: any;
  pokemon: IPokemon[] = [];
  selectedItemKeys: any = [];
  popupVisible: boolean = false;
  pokeSprite: string = '';
  cahngeSelectionOptions: any;
  canAnimate: boolean = false;
  typeList: any[] = [];
  heightList: any[] = [];
  testList: any[] = [];
  typeSet = new Set<string>();
  filterList: string[] = [];
  chartKey: string = 'type';
  chartSource: any[] = [];
  filters: any[] = [];
  statsComparison: any[] = [];
  firstSubject: string = '';
  secondSubject: string = '';

  tabs: any[] = [
    {
      id: 0,
      text: 'Type',
    },
    {
      id: 1,
      text: 'Height',
    },
  ];

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid:
    | DxDataGridComponent
    | undefined;

  @ViewChild(DxChartComponent, { static: false }) chart:
    | DxDataGridComponent
    | undefined;

  constructor(
    private httpClient: HttpClient,
    private PokemonService: PokemonService
  ) {}

  async ngOnInit() {
    await new Promise((f) => setTimeout(f, 1000));
    this.pokemon = this.PokemonService.getPokemon();
    this.typeList = this.PokemonService.getTypeCount();
    this.heightList = this.PokemonService.getHeightCount();
    this.statsComparison = this.PokemonService.getStatsList();
    console.log(this.heightList);
    console.log(this.typeList);
    this.chartSource = this.typeList;
    for (let val of this.typeList) {
      this.typeSet.add(val.type);
    }

    console.log(this.chartKey);
  }

  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
    this.pokeSprite = this.pokemon[this.selectedItemKeys[0].id - 1].sprite[0];
    //  console.log(this.selectedItemKeys[0].id);
  }

  click = (e: any) => {
    (this.popupVisible = true), console.log('works');
  };

  popup_hiding(e: any) {
    this.canAnimate = false;
  }

  popup_shown(e: any) {
    this.canAnimate = true;
    this.animate();
  }

  clearFilter() {
    this.dataGrid?.instance.clearFilter();
    this.filters = [];
  }

  onPointClick(e: any) {
    console.log('bar clicked ' + e.target.originalArgument);
    this.filters.push(e.target.originalArgument);
    console.log(this.filters);
    this.dataGrid?.instance.columnOption(
      this.chartKey,
      'filterValues',
      this.filters
    );
    this.dataGrid?.instance.refresh();
  }

  treeView_itemSelectionChanged(e: any) {
    console.log('fired');
    if (e.component.getSelectedNodesKeys().length > 2) {
      e.component.unselectItem(e.itemData);
    }
    if (e.component.getSelectedNodes()[1] !== undefined) {
      this.firstSubject = e.component.getSelectedNodes()[0].itemData.name;
      this.secondSubject = e.component.getSelectedNodes()[1].itemData.name;
      this.comparePokemon(
        e.component.getSelectedNodes()[0].itemData,
        e.component.getSelectedNodes()[1].itemData
      );
    }
  }

  async updateTable() {
    // await new Promise((f) => setTimeout(f, 1100));
    // console.log('updated');

    // let filter = this.dataGrid?.instance.getCombinedFilter();
    // this.filterList = [];

    // console.log(this.typeList);
    // //   console.log(this.testList);
    // // console.log(filter);
    // // console.log(filter.filterValue);
    // // console.log(filter[0][2]);
    // // console.log(filter[1]);
    // // console.log(filter[2]);
    // // }
    // console.log(this.filterList);
    // if (filter) {
    //   if (
    //     !this.filterList.includes(filter.filterValue) &&
    //     this.typeSet.has(filter.filterValue)
    //   ) {
    //     this.filterList.push(filter.filterValue);
    //     console.log(this.filterList);
    //   }
    //   filter.forEach((element: { filterValue: any }) => {
    //     if (
    //       !this.filterList.includes(element.filterValue) &&
    //       this.typeSet.has(element.filterValue)
    //     ) {
    //       this.filterList.push(element.filterValue);
    //       console.log(this.filterList);
    //     }
    //   });
    //   console.log(this.filterList);
    //   this.filterList.forEach((element) => {
    //     console.log(element);
    //     if (this.typeList.some((e) => e.type === element)) {
    //       console.log('matched');
    //       const index = this.typeList.findIndex(
    //         (item) => item.type === element
    //       );
    //       console.log(index);
    //       console.log(this.typeList[index]);
    //       this.testList.push(this.typeList[index]);
    //     }

    //     console.log('test list ' + this.testList);
    //   });

    // }

    //  console.log(this.statsComparison)
    this.chart?.instance.refresh();
  }

  async animate() {
    if (this.pokeSprite) {
      let i = 0;
      while (this.canAnimate) {
        this.pokeSprite =
          this.pokemon[this.selectedItemKeys[0].id - 1].sprite[i];
        i++;
        await new Promise((f) => setTimeout(f, 1000));
        if (i === this.pokemon[this.selectedItemKeys[0].id - 1].sprite.length) {
          i = 0;
        }
      }
    }
  }

  selectTab(e: any) {
    switch (e.itemIndex) {
      case 0:
        this.chartKey = 'type';
        this.chartSource = this.typeList;
        break;
      case 1:
        this.chartKey = 'height';
        this.chartSource = this.heightList;
    }
  }

  comparePokemon(pokemon1: any, pokemon2: any) {
    this.statsComparison[0].firstSubject = pokemon1.hp;
    this.statsComparison[0].secondSubject = pokemon2.hp;

    this.statsComparison[1].firstSubject = pokemon1.attack;
    this.statsComparison[1].secondSubject = pokemon2.attack;

    this.statsComparison[2].firstSubject = pokemon1.defense;
    this.statsComparison[2].secondSubject = pokemon2.defense;

    this.statsComparison[3].firstSubject = pokemon1.specialAttack;
    this.statsComparison[3].secondSubject = pokemon2.specialAttack;

    this.statsComparison[4].firstSubject = pokemon1.specialDefense;
    this.statsComparison[4].secondSubject = pokemon2.specialDefense;

    this.statsComparison[5].firstSubject = pokemon1.speed;
    this.statsComparison[5].secondSubject = pokemon2.speed;

    this.chart?.instance.refresh();

    console.log(this.statsComparison);
  }
}
