import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TrainingService } from './training.service';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>
  //exerciseSubscription: Subscription

  constructor(private store: Store<fromTraining.State>, private trainingService: TrainingService) { }

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
    /*
    this.exerciseSubscription = this.trainingService.exerciseChanged
      .subscribe(ex => {
        this.ongoingTraining = ex ? true : false
      });*/
  }
/*
  ngOnDestroy() {
    
    if (this.exerciseSubscription)
      this.exerciseSubscription.unsubscribe();
  }*/

}
