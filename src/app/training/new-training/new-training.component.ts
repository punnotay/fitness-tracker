import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { UIService } from '../../shared/ui.service';
import * as fromApp from '../../app.reducer';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  //@Output() trainingStart = new EventEmitter<void>();
  isLoading$: Observable<boolean>;
  workouts$: Observable<Exercise[]>;
  //private exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromApp.getIsLoading);
    this.workouts$ = this.store.select(fromTraining.getAvailableExercises);
    /*
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(loading => {
      this.isLoading = loading;
    });*/
    /*
    this.exerciseSubscription = this.trainingService
      .exercisesChanged.subscribe(exercise => {
        this.workouts = exercise;
      });*/
    this.fetchExercises();
    }
    
  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
/*
  ngOnDestroy() {
    if (this.exerciseSubscription)
      this.exerciseSubscription.unsubscribe();
    
    if(this.loadingSub)
      this.loadingSub.unsubscribe();
  }*/

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.workout)
  }

}
