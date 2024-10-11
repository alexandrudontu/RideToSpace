import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent{
  properties: Array<any> = [
    {
      "Id": 1,
      "Name": "Falcon 9",
      "Type": "Partially Reusable",
      "Price": 60000000
    },
    {
      "Id": 2,
      "Name": "Falcon Heavy",
      "Type": "Partially Reusable",
      "Price": 90000000
    },
    {
      "Id": 3,
      "Name": "Electron",
      "Type": "Expendable",
      "Price": 8000000
    },
    {
      "Id": 4,
      "Name": "Vulcan",
      "Type": "Expendable",
      "Price": 120000000
    },
    {
      "Id": 5,
      "Name": "Starship",
      "Type": "Fully Reusable",
      "Price": 20000000
    },
    {
      "Id": 6,
      "Name": "SLS",
      "Type": "Expendable",
      "Price": 2000000000
    },
    {
      "Id": 7,
      "Name": "New Glenn",
      "Type": "Partially Reusable",
      "Price": 100000000
    },
  ]
}
