import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { So5Component } from 'src/app/so5-metrics/so5/so5.component';
import { SprintLevelService } from 'src/app/services/sprint-level.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface Platform {
  value: string;
  id: BigInteger;
  viewValue: string;
  platformLead: string;
 
}

@Component({
  selector: 'app-so5-mapping',
  templateUrl: './so5-mapping.component.html',
  styleUrls: ['./so5-mapping.component.css'],
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
export class So5MappingComponent implements OnInit {
  @Input() so5MappingDetails: any;

  @Input() closableSo5Mapping = true;
  @Input() visibleSo5Mapping: boolean;
  @Output() visibleChangeSo5Mapping: EventEmitter<boolean> = new EventEmitter<boolean>();


  newSo5MappingDetailsForm: FormGroup;
  submitted = false;
  Platforms: Platform[] = [];

  constructor(private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private so5Component: So5Component, private SprintLevelService: SprintLevelService) { }

  ngOnInit() {
   this.get_products();
    this.newSo5MappingDetailsForm = this.formBuilder.group({
      platformName: ['', Validators.required],
      so5Name: ['', Validators.required],
      so5StartDate: ['', Validators.required],
      so5EndDate: ['', Validators.required]
    });
  }
  
  public data: any = { totalPages: 1, totalElements: 4, content: new Array() };

  get_products() {
    this.Platforms= [];
    this.SprintLevelService.get_products()
      .subscribe(
        (data: any) => {
         
          var result = data;
          this.data = data;
          console.log(data);
          
          this.data.forEach(element => {
            let temp = { id: element.id, value: element.platformName, viewValue: element.platformName, platformLead: element.platformLead };
            this.Platforms.push(temp);
          });
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        });
  }
  selectedSo5Id: any;
  
  onChange(val) {
    let index = this.Platforms.find(c => c.value == val);
    this.newSo5MappingDetailsForm.patchValue({ platformName: index.platformLead})
    this.selectedSo5Id = index.id;
  }

  addDetails() {
    this.submitted = true;
    if (this.newSo5MappingDetailsForm.valid) {
      this.SprintLevelService.SaveSo5MappingDetailsAPI(this.newSo5MappingDetailsForm.value);
      this._snackBar.open("Added Succesfully..!", "", {
        duration: 2000,
      });
      this.visibleSo5Mapping = false;
      this.visibleChangeSo5Mapping.emit(this.visibleSo5Mapping);
      this.so5Component.platFormChange(this.newSo5MappingDetailsForm.value);
      this.so5Component.get_products();
      this.so5Component.releaseGet_products();
      this.so5Component.nonDeliveryKPIGet_products();
      this.newSo5MappingDetailsForm.reset();
    } else {
      this._snackBar.open("Please provide required details in form..", "", {
        duration: 2000,
      });
    }
  }

  close() {
    this.visibleSo5Mapping = false;
    this.visibleChangeSo5Mapping.emit(this.visibleSo5Mapping);
    this.newSo5MappingDetailsForm.reset();
  }
}
