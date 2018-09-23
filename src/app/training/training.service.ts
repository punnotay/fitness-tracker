import { Injectable } from '../../../node_modules/@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Exercise } from './exercise.model';
import { UIService } from './../shared/ui.service';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

@Injectable()
export class TrainingService {
    //exerciseChanged = new Subject<Exercise>();
    //exercisesChanged = new Subject<Exercise[]>();
    //finishedExercisesChanged = new Subject<Exercise[]>();
    //private availableExercise: Exercise[] = [];
    private fbSub: Subscription[] = [];
    //private runningExercise: Exercise;
    
    constructor(private db: AngularFirestore, private uiService: UIService, private store: Store<fromTraining.State>) { }

    fetchAvailableExercises() {
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.fbSub.push(this.db
            .collection('availableExercises')
            .snapshotChanges()
            .pipe(
            map(docArray => {
                    return docArray.map(doc => {
                        const id = doc.payload.doc.id;
                        const data = doc.payload.doc.data() as Exercise;
                        return { id, ...data }
                    });
                })
            )
            .subscribe((exercises: Exercise[]) => {
                //this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading());
                this.store.dispatch(new Training.SetAvailableTrainings(exercises));
               /* this.availableExercise = exercises;
                this.exercisesChanged.next([...this.availableExercise]);*/
            }, error => {
                this.store.dispatch(new UI.StopLoading);
                this.uiService.showSnackbar('Cannot retreiving data! Please try again.', null, 3000);
                
            }));
            
    }

    startExercise(selectedId: string) {
        /*this.runningExercise = this.availableExercise.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });*/
        this.store.dispatch(new Training.StartTraining(selectedId));
    }

   
    completeExercise() {
        this.store.select(fromTraining.getActiveTraining)
            .pipe(take(1)).subscribe(ex => {
                this.addDataToDatabase({ ...ex, date: new Date(), state: 'completed' });
                /*this.runningExercise = null;
                this.exerciseChanged.next(null);*/
                this.store.dispatch(new Training.StopTraining());
        });
        
    }

    cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveTraining)
            .pipe(take(1)).subscribe(ex => { 
                this.addDataToDatabase(
                    {
                        ...ex,
                        duration: ex.duration * (progress / 100),
                        calories: ex.calories * (progress / 100),
                        date: new Date(),
                        state: 'cancelled'
                    });
                /*this.runningExercise = null;
                this.exerciseChanged.next(null);*/
                this.store.dispatch(new Training.StopTraining());
        })
        
    }

    fetchCompletedOrCancelledExercises() {
        this.fbSub.push(this.db.collection('finisedExerciese').valueChanges()
            .subscribe((exercise: Exercise[]) => { 
                this.store.dispatch(new Training.SetFinishedTrainings(exercise));
            }));
    }

    cancelSubscription() {
        this.fbSub.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finisedExerciese').add(exercise);
    }
}