import { Component, ViewChild } from '@angular/core';
import 'devextreme/data/odata/store';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { PokemonService } from './pokemon.service';
import { IPokemon } from '../pokemon/Pokemon';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import {
  DxChartComponent,
  DxDataGridComponent,
  DxDataGridModule,
  DxListComponent,
} from 'devextreme-angular';
import { delay } from 'rxjs';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { DevicesService } from './devices.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { ClientsService } from './clients.service';
import { Filter, FilterService } from './filter.service';

@Component({
  templateUrl: 'tasks.component.html',
})
export class TasksComponent {
  dataSource: any;
  pokemon: IPokemon[] = [];
  selectedItemKeys: any = [];
  popupVisible: boolean = false;
  devicePopupVisible: boolean = false;
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
  firstPokemonComparisonSlot: string = '';
  secondPokemonComparisonSlot: string = '';
  stateConfig: string[] = [
    'storage_slot_1',
    'storage_slot_2',
    'storage_slot_3',
  ];
  currentState: string = 'storage_slot_1';
  initialState: string = 'storage_slot_1';

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

  devices: any[] = [];
  clients: DataSource;
  deviceTableFilters: Filter[] = [];
  activeTableDevicesFilter: string[] = [];
  activeTableOsFilter: any[] = [];

  selectedDevice: any = null;

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid:
    | DxDataGridComponent
    | undefined;

  @ViewChild('deviceGrid', { static: false }) deviceGrid:
    | DxDataGridComponent
    | undefined;

  @ViewChild(DxListComponent, { static: false }) list:
    | DxListComponent
    | undefined;

  selectedRowIndex: number = -1;

  constructor(
    private httpClient: HttpClient,
    private PokemonService: PokemonService,
    private deviceService: DevicesService,
    private clientsService: ClientsService,
    private filterService: FilterService
  ) {
    this.clients = new DataSource({
      store: new ArrayStore({
        key: 'id',
        data: this.clientsService.getClients(),
      }),
    });
  }

  async ngOnInit() {
    await new Promise((f) => setTimeout(f, 1000));
    this.pokemon = this.PokemonService.getPokemon();
    this.typeList = this.PokemonService.getTypeCount();
    this.heightList = this.PokemonService.getHeightCount();
    this.statsComparison = this.PokemonService.getStatsList();
    this.deviceTableFilters = this.filterService.getFilters();
    this.currentState = localStorage.getItem("lastState") || this.initialState;
    this.loadState(this.currentState);
    this.dataGrid?.instance.refresh();
    this.chartSource = this.typeList;
    for (let val of this.typeList) {
      this.typeSet.add(val.type);
    }
  }

  onExporting(e: any) {
    const doc = new jsPDF();
    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
      indent: 5,
    }).then(() => {
      doc.save('Pokemon.pdf');
    });
  }

  editRow() {
    this.dataGrid?.instance.editRow(this.selectedRowIndex);
    this.dataGrid?.instance.deselectAll();
  }

  deleteRow() {
    this.dataGrid?.instance.deleteRow(this.selectedRowIndex);
    this.dataGrid?.instance.deselectAll();
  }

  addRow() {
    this.dataGrid?.instance.addRow();
    this.dataGrid?.instance.deselectAll();
  }

  saveState() {
    console.log('saving state');
    const state = this.dataGrid?.instance.state();
    localStorage.setItem(this.currentState, JSON.stringify(state));
  }
  loadState(stateToLoad: string) {
    console.log('loading state');
    const state = JSON.parse(localStorage.getItem(stateToLoad) || '{}');
    this.dataGrid?.instance.state(state);
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  onSaveSlotChanged(e: any) {
    this.currentState = e.itemData;
    localStorage.setItem("lastState", this.currentState)
    this.loadState(this.currentState);
  }

  onDataGridChange() {
    this.saveState();
  }

  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
    this.pokeSprite = this.pokemon[this.selectedItemKeys[0].id - 1].sprite[0];
    this.selectedRowIndex = data.component.getRowIndexByKey(
      data.selectedRowKeys[0]
    );
    this.saveState();
  }

  deviceGridSelectionChanged(e: any) {



    
//this.selectedDevice = this.devices[e.selectedItemKeys[0]];
    console.log(e.selectedItemKeys);
    this.devicePopupVisible = true;
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

  //FIX!!!

  deviceListClientSelectionChanged(e: any) {
    // let filter: any[] = [];

    // e.addedItems.forEach((element: { name: any }) => {
    //   filter.push(element.name);
    // });
    // console.log(filter + ' client filter');
    // this.deviceGrid?.instance.columnOption('Client', 'filterValues', filter);

    // this.deviceGrid?.instance.refresh();
  }

  deviceListFilterSelectionChanged(e: any) {
    // console.log(e.selectedItems);
    // console.log(JSON.stringify(e.addedItems) + ' added items');
    e.addedItems.forEach((element: any) => {
      if (element.key === 'Devices') {
        this.activeTableDevicesFilter.push(element.text);
        console.log(this.activeTableDevicesFilter);
      } else if (element.key === 'os') {
        this.activeTableOsFilter.push(element.text);
      }
    });

    e.removedItems.forEach((element: any) => {
      if (this.activeTableDevicesFilter.includes(element.text)) {
        this.activeTableDevicesFilter.splice(
          this.activeTableDevicesFilter.indexOf(element),
          1
        );
      } else if (this.activeTableOsFilter.includes(element.text)) {
        this.activeTableOsFilter.splice(
          this.activeTableOsFilter.indexOf(element),
          1
        );
      }
    });

    this.deviceGrid?.instance.columnOption(
      'Type',
      'filterValues',
      this.activeTableDevicesFilter
    );

    this.deviceGrid?.instance.columnOption(
      'Os',
      'filterValues',
      this.activeTableOsFilter
    );
    if (
      this.activeTableDevicesFilter.length === 0 &&
      this.activeTableOsFilter.length === 0
    ) {
      this.deviceGrid?.instance.clearFilter();
    }
    this.deviceGrid?.instance.refresh();

  
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
      this.firstPokemonComparisonSlot =
        e.component.getSelectedNodes()[0].itemData.name;
      this.secondPokemonComparisonSlot =
        e.component.getSelectedNodes()[1].itemData.name;
      this.comparePokemon(
        e.component.getSelectedNodes()[0].itemData,
        e.component.getSelectedNodes()[1].itemData
      );
    }
  }

  async populateDeviceTable() {
    this.devices = this.deviceService.getDevices();
    this.clients = new DataSource({
      store: new ArrayStore({
        key: 'id',
        data: this.clientsService.getClients(),
      }),
    });
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
    this.statsComparison[0].firstPokemonComparisonSlot = pokemon1.hp;
    this.statsComparison[0].secondPokemonComparisonSlot = pokemon2.hp;

    this.statsComparison[1].firstPokemonComparisonSlot = pokemon1.attack;
    this.statsComparison[1].secondPokemonComparisonSlot = pokemon2.attack;

    this.statsComparison[2].firstPokemonComparisonSlot = pokemon1.defense;
    this.statsComparison[2].secondPokemonComparisonSlot = pokemon2.defense;

    this.statsComparison[3].firstPokemonComparisonSlot = pokemon1.specialAttack;
    this.statsComparison[3].secondPokemonComparisonSlot =
      pokemon2.specialAttack;

    this.statsComparison[4].firstPokemonComparisonSlot =
      pokemon1.specialDefense;
    this.statsComparison[4].secondPokemonComparisonSlot =
      pokemon2.specialDefense;

    this.statsComparison[5].firstPokemonComparisonSlot = pokemon1.speed;
    this.statsComparison[5].secondPokemonComparisonSlot = pokemon2.speed;
  }
}
