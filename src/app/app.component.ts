import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
  customReportInfo: any;
  customReportSearchCriteria: any;
  gridDataSource: any;
  gridColumns: any;
  gridWidth: number;

  constructor(private http: HttpClient) {
    this.getCustomReportInfo().subscribe(data => {
      this.customReportInfo = data;
        console.log(data);
        this.getCustomReportSearchCriteria().subscribe(data1 => {
          this.customReportSearchCriteria = data1;
          console.log(data1);
          this.gridDataSource = this.createGridDataSource(this.customReportInfo, this.customReportSearchCriteria);
      });
   });
  }

  public getCustomReportInfo(): Observable<any> {
      return this.http.get('../sampledata/customreportinfo.json');
  }

  public getCustomReportSearchCriteria(): Observable<any> {
    return this.http.get('../sampledata/customreportsearchcriteria.json');
  }

  createGridDataSource(customReportInfo: any, customReportSearchCriteria: any): any {
    this.gridColumns = customReportInfo.jqGridColumnList;
    const data = new Array();
    this.gridWidth = 900;
    let columnCount = 0;

    const customReportOutPutMetaDataList = customReportSearchCriteria.customReportOutPutMetaDataList;

    const customReportResults: any = new Array(customReportSearchCriteria.customResultList.length - 1);
    let k = 0;
    for (let i = 1; i < customReportSearchCriteria.customResultList.length; i++) {
      customReportResults[k++] = customReportSearchCriteria.customResultList[i];
    }

    for (let i = 0; i < customReportResults.length; i++) {
      const row = {};
      const rowData = customReportResults[i];
      for (let j = 0; j < customReportOutPutMetaDataList.length; j++) {
        const outputMetaData = customReportOutPutMetaDataList[j];
        if (outputMetaData.dataType && outputMetaData.dataType === 'number') {
          row[outputMetaData.displayName] = parseFloat(rowData[j]);
        } else {
          row[outputMetaData.displayName] = rowData[j];
        }
      }
      data.push(row);
    }

    const dataFieldArr = new Array();

    for (const outputMetaData of customReportOutPutMetaDataList) {
      const dataField = {
        name: outputMetaData.displayName,
        type: outputMetaData.dataType
      };
      dataFieldArr.push(dataField);
    }

    // create a data source and data adapter
    const source = {
      localdata: data,
      datatype: 'array',
      datafields: dataFieldArr
    };
    return source;
  }
}
