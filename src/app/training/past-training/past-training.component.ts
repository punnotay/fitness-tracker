import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';

import { Exercise } from './../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.store.select(fromTraining.getFinishedExercises).subscribe((exercise: Exercise[]) => {
      this.dataSource.data = exercise;
    })
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /*ngOnDestroy() {
    if (this.exChangedSubscription)
      this.exChangedSubscription.unsubscribe();
  }*/

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
