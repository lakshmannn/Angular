import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { So5Component } from 'src/app/so5-metrics/so5/so5.component';
import { SprintLevelService } from 'src/app/services/sprint-level.service';


@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css'],
  providers: [So5Component],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class PlatformComponent implements OnInit {
  @Input() platFormDetails: any;

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  newPlatFormDetailsForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private so5Component: So5Component, private SprintLevelService: SprintLevelService) { }

  ngOnInit() {
    this.newPlatFormDetailsForm = this.formBuilder.group({
      platformName: ['', Validators.required],
      platformLead: ['', Validators.required],
    });
  }

  addDetails() {
    this.submitted = true;
    if (this.newPlatFormDetailsForm.valid) {
      this.SprintLevelService.SavePlatFormDetailsAPI(this.newPlatFormDetailsForm.value);
      this._snackBar.open("Added Succesfully..!", "", {
        duration: 2000,
      });
      this.visible = false;
      this.visibleChange.emit(this.visible);
      this.so5Component.platFormChange(this.newPlatFormDetailsForm.value);
      // this.so5Component.get_products();
      // this.so5Component.releaseGet_products();
      // this.so5Component.nonDeliveryKPIGet_products();
      this.newPlatFormDetailsForm.reset();
    } else {
      this._snackBar.open("Please provide required details in form..", "", {
        duration: 2000,
      });
    }
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.newPlatFormDetailsForm.reset();
  }
}