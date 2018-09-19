import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
  gridColumns: any[];
  gridWidth  = 200;
  source = this.createGridDataSource();
  gridDataSource = new jqx.dataAdapter(this.source);

  createGridDataSource(): any {
    const data = new Array();

    this.gridColumns = [
      {datafield: 'No', text: 'No'}
    ];

    for (let i = 0; i < 3; i++) {
      const row = {
      };
      row['No'] = 'Inv1';
      data[i] = row;
    }

    // create a data source and data adapter
    const source = {
      localdata: data,
      datatype: 'array',

      datafields:
      [
          { name: 'No', type: 'string' }
      ]

    };
    return source;
  }
}
