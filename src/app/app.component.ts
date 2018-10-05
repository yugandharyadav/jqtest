import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
  gridColumns: any[];
  gridWidth = 200;
  source = this.createGridDataSource(false);
  gridDataSource = new jqx.dataAdapter(this.source);
  showNext = true;
  showPrev = false;

  createGridDataSource(next): any {
    const data = new Array();

    this.gridColumns = [
      { datafield: 'No', text: 'No' },
      { datafield: 'Quantity', text: 'Quantity', aggregates: ['count'] }
    ];

    if (next) {
      for (let i = 0; i < 3; i++) {
        const row = {
        };
        row['No'] = 'Inv2';
        row['Quantity'] = i;
        data[i] = row;
      }
    } else {
      for (let i = 0; i < 3; i++) {
        const row = {
        };
        row['No'] = 'Inv1';
        row['Quantity'] = i;
        data[i] = row;
      }
    }

    // create a data source and data adapter
    const source = {
      localdata: data,
      datatype: 'array',

      datafields:
        [
          { name: 'No', type: 'string' },
          { name: 'Quantity', type: 'number' },
        ]

    };
    return source;
  }

  next() {
    this.showNext = false;
    this.showPrev = true;
    this.gridDataSource = this.createGridDataSource(true);
  }

  prev() {
    this.showNext = true;
    this.showPrev = false;
    this.gridDataSource = this.createGridDataSource(false);
  }
}
