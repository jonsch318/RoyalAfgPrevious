import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signout.dialog',
  templateUrl: './signout.dialog.component.html',
  styleUrls: ['./signout.dialog.component.scss']
})
export class SignoutDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SignoutDialogComponent>,
    private readonly ngZone: NgZone
  ) { }

  ngOnInit(): void {
  }

  close(result: boolean) {
    this.ngZone.run(() => {
      this.dialogRef.close(result);
    });
  }

  continue(){
    this.close(true);
  }

  cancel(){
    this.close(false);
  }

}
