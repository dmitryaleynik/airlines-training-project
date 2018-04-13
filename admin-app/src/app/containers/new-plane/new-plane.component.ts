import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

import { NewPlane } from '../../classes/NewPlane';
import { NewType } from '../../classes/NewType';

@Component({
  selector: 'app-new-plane',
  templateUrl: './new-plane.template.html',
  styleUrls: ['./new-plane.styles.less'],
})
export class NewPlaneComponent implements OnInit {
  newPlane = new NewPlane();
  errorMessage: string;
  isConfig = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {}

  onConfigClick() {
    this.isConfig = true;
    this.addType();
  }

  addType() {
    this.newPlane.types.push(new NewType());
  }

  removeType(i: number) {
    this.newPlane.types.splice(i, 1);
  }

  onSubmit() {
    if (!this.validateTypesForColumns()) {
      return;
    }

    this.dashboardService.addPlane(this.newPlane).subscribe(() => {
      window.location.href = '/dashboard/planes';
    });
  }

  validateTypesForColumns() {
    this.errorMessage = '';
    const columns = this.commonColumnsArray();
    let absentColumns = '';
    for (let i = 1; i <= this.newPlane.columns; ++i) {
      if (!columns.includes(i.toString(10))) {
        absentColumns = `${absentColumns}, ${i}`;
      }
    }
    if (absentColumns) {
      absentColumns = absentColumns.replace(/,/, '');
      const absentColumnsArray = absentColumns.split(',');
      console.log(absentColumnsArray);
      if (absentColumnsArray.length === 1) {
        this.errorMessage = `Column ${absentColumns} has no type.`;
      } else {
        this.errorMessage = `Columns ${absentColumns} have no type.`;
      }
      return false;
    }

    return true;
  }

  commonColumnsArray() {
    let result = [];
    for (const type of this.newPlane.types) {
      result = result.concat(this.columnsStringToArray(type.columns));
    }
    return result;
  }

  columnsStringToArray(string: string) {
    return string.split(',');
  }
}
