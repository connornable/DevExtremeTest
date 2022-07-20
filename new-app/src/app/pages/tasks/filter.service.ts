import { Injectable } from '@angular/core';

export class Filter {
  key: string = "";
  items: string[] = [];
}

const deviceTableFilters: Filter[] = [{
  key: "Devices",
  items: ["server", "workstation", "laptop"]
},
{
  key: "os",
  items: ["Windows", "macOS", "Linux"]
}
]


@Injectable({
  providedIn: 'root'
})

export class FilterService {
getFilters() {
  return deviceTableFilters;
}
}
