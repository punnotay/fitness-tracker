import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CurrentTrainingComponent } from './current-training.component';

@Component({
    selector: 'app-stop-training',
    template: `<h1 mat-dialog-title>Are you sure?</h1>
        <mat-dialog-content>
            <p>You already got {{data.progress}}%</p>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button mat-dialog-close>No</button>
            <button mat-button [mat-dialog-close]="true">Yes</button>
        </mat-dialog-actions>
    `,
    //styleUrls: ['./stop-training.component.css']
})

export class StopTrainingComponent implements OnInit {
    
    constructor(public dialogRef: MatDialogRef<CurrentTrainingComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
  
    ngOnInit() {
        
    }
}