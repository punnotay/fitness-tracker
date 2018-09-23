import { StopTrainingComponent } from './current-training/stop-training.component';
import { Action, createFeatureSelector, createSelector } from "@ngrx/store";
import {
    TrainingActions, SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS,
    START_TRAINING, STOP_TRAINING } from './training.actions';
import { Exercise } from "./exercise.model";
import * as fromApp from '../app.reducer';

export interface TrainingState {
    availableExercise: Exercise[];
    finishedExercise: Exercise[];
    activeTraining: Exercise
}

export interface State extends fromApp.State {
    training: TrainingState
}

const initialState: TrainingState = {
    availableExercise: [],
    finishedExercise: [],
    activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {
                ...state,
                availableExercise: action.payload
            };
        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                finishedExercise: action.payload
            };
        case START_TRAINING:
            return {
                ...state,
                activeTraining: { ...state.availableExercise.find(ex => ex.id === action.payload) }
            };
        case STOP_TRAINING:
            return {
                ...state,
                activeTraining: null
            };
        
        default: return state;
    }
}


export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercise);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercise);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);