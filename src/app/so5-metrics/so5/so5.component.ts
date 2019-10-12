import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SprintLevelService } from 'src/app/services/sprint-level.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { disableBindings } from '@angular/core/src/render3';
export interface Platform {
  value: string;
  id: BigInteger;
  viewValue: string;
  platformLead: string;
  so5Metrics: string;
}

export interface nonDeliveryKPIPlatform {
  id: bigint;
  so5EndDate: string;
  so5StartDate: string;
  platformName: string;
  so5Name: string;
}

export interface storyLevelPlatformForms {
  value: string;
  id: BigInteger;
  viewValue: string;
  platformLead: string;
  so5Metrics: string;
}
export interface releasePlatform {
  id: bigint;
  so5EndDate: string;
  so5StartDate: string;
  platformName: string;
}

export interface month {
  monthName: string;
  shortName: string;
  disabled: boolean;
}


@Component({
  selector: 'app-so5',
  templateUrl: './so5.component.html',
  styleUrls: ['./so5.component.css']
})

export class So5Component {
  updateSo5DetailsLevelBtn: any;
  showSo5DetailsLevel = true;
  so5DetailsLevelForm: FormGroup;
  so5DetailsVelocityForm: FormGroup;
  so5DetailsQualityForm: FormGroup;
  so5DetailsEffectivenessForm: FormGroup;
  so5DetailsBurndownForm: FormGroup;
  so5DetailsPeopleForm: FormGroup;
  so5DetailsLevelSubmitted = false;
  so5DetailsLevelUpdateBtn = false;
  so5DetailsLevelSelectedIndex: any = '';
  so5DetailsLevelDetails = [];

  selectedSo5Id: any;
  newPlatFormDetails = [];
  so5Names: any = [];
  showDialog: any;
  newSo5MappingDetails: any;
  showDialogSo5Mapping: any;

  Platforms: Platform[] = [];
  showStoryLevel = false;
  storyLevelPlatforms: storyLevelPlatformForms[] = [];
  storyLevelPlatformForm: FormGroup;
  storyLevelForm: FormGroup;
  storyLevelSubmitted = false;
  storyLevelUpdateBtn = false;
  storyLevelSelectedIndex = '';
  storyLevelDetails = [];

  platformForm: FormGroup;
  teamSquardForm: FormGroup;
  sprintForm: FormGroup;
  showSprintLevel = false;
  submitted = false;
  updateBtn = false;
  selectedIndex = '';
  sprintDetails = [];
  sprintDetails_Cal = [];

  releasePlatforms: releasePlatform[] = [];
  releasePlatformForm: FormGroup;
  releaseTeamSquardForm: FormGroup;
  releaseForm: FormGroup;
  showReleaseLevel = false;
  releaseSubmitted = false;
  updateReleaseBtn = false;
  selectedReleaseIndex = '';
  releaseDetails = [];
  releaseDetails_Cal = [];

  nonDeliveryKPIPlatforms: nonDeliveryKPIPlatform[] = [];
  nonDeliveryKPIForm: FormGroup;
  nonDeliveryKPITeamSquardForm: FormGroup;
  showNonDeliveryKPILevel = false;
  nonDeliveryKPISubmitted = false;
  nonDeliveryKPIDetails = [];
  updateNonDeliveryKPIBtn = false;
  selectedNonDeliveryKPIIndex = '';
  kpiIsDisable: boolean = true;
  nonDeliveryKPIPercentage = 0;

  month: month[] = [
    { monthName: 'Jan', shortName: 'Jan', disabled: false },
    { monthName: 'Feb', shortName: 'Feb', disabled: false },
    { monthName: 'Mar', shortName: 'Mar', disabled: false },
    { monthName: 'Apr', shortName: 'Apr', disabled: false },
    { monthName: 'May', shortName: 'May', disabled: false },
    { monthName: 'Jun', shortName: 'Jun', disabled: false },
    { monthName: 'Jul', shortName: 'Jul', disabled: false },
    { monthName: 'Aug', shortName: 'Aug', disabled: false },
    { monthName: 'Sep', shortName: 'Sep', disabled: false },
    { monthName: 'Oct', shortName: 'Oct', disabled: false },
    { monthName: 'Nov', shortName: 'Nov', disabled: false },
    { monthName: 'Dec', shortName: 'Dec', disabled: false }

  ];

  constructor(private formBuilder: FormBuilder, private SprintLevelService: SprintLevelService, private _snackBar: MatSnackBar) { }



  ngOnInit() {
    this.get_products();
    this.get_So5();
    this.releaseGet_products();
    this.nonDeliveryKPIGet_products();

    this.so5DetailsVelocityForm = this.formBuilder.group({
      velocity: ['false', Validators.required],
      featureCycleTime: ['false', Validators.required],
      storyCycleTime: ['false', Validators.required],
    });
    this.so5DetailsQualityForm = this.formBuilder.group({
      onQualityCompletion: ['false', Validators.required],
      qualitySITDefectLeakage: ['false', Validators.required],
    });
    this.so5DetailsEffectivenessForm = this.formBuilder.group({
      sprintVariance: ['false', Validators.required],
      releaseVariance: ['false', Validators.required],
      storyVolatility: ['false', Validators.required],
      featureVolatility: ['false', Validators.required],
    });
    this.so5DetailsBurndownForm = this.formBuilder.group({
      sprintBurndown: ['false', Validators.required],
      releaseBurndown: ['false', Validators.required],
      sprintBurnUp: ['false', Validators.required],
      releaseBurnUp: ['false', Validators.required],

    });
    this.so5DetailsPeopleForm = this.formBuilder.group({
      people: ['false', Validators.required]
    });

    this.so5DetailsLevelForm = this.formBuilder.group({
      so5DetailsLevelPlatform: ['', Validators.required],
      sowNo: ['', Validators.required],
      sowName: ['', Validators.required],
      sowType: ['', Validators.required],
      hclPM: ['', Validators.required],
      hclDh: ['', Validators.required],
      cbaManager: ['', Validators.required],
      sowStartDate: ['', Validators.required],
      sowEndDate: ['', Validators.required]
    });

    this.storyLevelPlatformForm = this.formBuilder.group({
      platformName: ['', Validators.required],
      platformLead: ['', Validators.required],
      so5Name: ['', [Validators.required]]
    });

    this.storyLevelForm = this.formBuilder.group({
      storyLevelSprint: ['', Validators.required],
      UserStoryIDs: ['', Validators.required],
      storyStartDate: ['', [Validators.required]],
      storyReleaseDate: ['', [Validators.required]],
      storyCycleTime: ['', [Validators.required]]

    });

    this.platformForm = this.formBuilder.group({
      platformName: ['', Validators.required],
      platformLead: ['', Validators.required],
      so5Name: ['', [Validators.required]]
    });

    this.teamSquardForm = this.formBuilder.group({
      teamSquard: ['', Validators.required],
      sprint: ['', Validators.required],
      sprintStartDate: ['', [Validators.required]],
      sprintEndDate: ['', [Validators.required]],
    });

    this.sprintForm = this.formBuilder.group({
      completed: ['', Validators.required],
      commited: ['', Validators.required],
      done: ['', [Validators.required]],
      // startDate: ['', [Validators.required]],
      // endDate: ['', [Validators.required]],
      commitedInSprint: ['', [Validators.required]],
      completedInSprint: ['', [Validators.required]],
      changedInSprint: ['', [Validators.required]],
      comments: [''],
    });

    this.releasePlatformForm = this.formBuilder.group({
      releasePlatformName: ['', Validators.required],
      releaseSo5Name: ['', Validators.required],
      so5StartDate: ['', Validators.required],
      so5EndDate: ['', [Validators.required]],
    });

    this.releaseTeamSquardForm = this.formBuilder.group({
      releaseTeamSquad: ['', Validators.required],
      releaseNameNumber: ['', Validators.required],
      releaseMonth: ['', [Validators.required]],
    });

    this.releaseForm = this.formBuilder.group({
      quality: ['true', Validators.required],
      incidentsRaised: ['', Validators.required],
      totalIncidents: ['', [Validators.required]],
      storyPointsCommited: ['', [Validators.required]],
      storyPointDone: ['', [Validators.required]],
      featuresCommited: ['', [Validators.required]],
      featuresCompleted: ['', [Validators.required]],
      featuresChanged: ['', [Validators.required]],
      startDatePicker: ['', [Validators.required]],
      endDatePicker: ['', [Validators.required]],
      releaseComments: ['']
    });

    this.nonDeliveryKPIForm = this.formBuilder.group({
      nonDeliveryKPIPlatformName: ['', Validators.required],
      nonDeliveryKPISo5Name: ['', Validators.required],
      nonDeliveryKPISo5StartDate: ['', [Validators.required]],
      nonDeliveryKPISo5EndDate: ['', [Validators.required]],
      resourcesOnboarded: ['', [Validators.required]]
    });

    this.nonDeliveryKPITeamSquardForm = this.formBuilder.group({
      // resourcesOnboarded: ['', Validators.required],
      nonDeliveryKPIMonth: ['', Validators.required],
      attrition: ['', [Validators.required]],
      // retention: ['', [Validators.required]],
      // percentage: ['', [Validators.required]]
    });
  }

  so5DropdownClick() {
    // alert("so5DropdownClick");
    this.so5Names = [];
    let so5MetricsArr : any = [];
    if (this.storyLevelPlatformForm.value.platformName != "" ||
      this.platformForm.value.platformName != "" ||
      this.releasePlatformForm.value.releasePlatformName != "" ||
      this.nonDeliveryKPIForm.value.nonDeliveryKPIPlatformName != "") {
      var result = (this.storyLevelPlatformForm.value.platformName != "") ? this.storyLevelPlatformForm.value.platformName
        : (this.platformForm.value.platformName != "") ? this.platformForm.value.platformName
          : (this.releasePlatformForm.value.releasePlatformName != "") ? this.releasePlatformForm.value.releasePlatformName
            : (this.nonDeliveryKPIForm.value.nonDeliveryKPIPlatformName != "") ? this.nonDeliveryKPIForm.value.nonDeliveryKPIPlatformName
              : 'N/A'
      this.Platforms.forEach(element => {
        if (element.viewValue == result) {
          so5MetricsArr = element.so5Metrics;
          so5MetricsArr.forEach(ele => {
            let temp = { id: ele.id, value: ele.so5Name, viewValue: ele.so5Name, so5EndDate: ele.so5EndDate, so5StartDate: ele.so5StartDate };
            this.so5Names.push(temp);
          })
        }
      })
    } else {
      this.SprintLevelService.get_So5()
        .subscribe(
          (data: any) => {
            this.data = data;
            this.data.forEach(element => {
              let temp = { id: element.id, value: element.so5Name, viewValue: element.so5Name, so5EndDate: element.so5EndDate, so5StartDate: element.so5StartDate };
              this.so5Names.push(temp);
            });
          });
    }
  }

  platformDropdownClick() {
    // alert("platformDropdownClick");
    this.Platforms = [];
    this.so5Names = [];
    this.SprintLevelService.get_products()
      .subscribe(
        (data: any) => {
          var result = data;
          this.data = data;
          this.data.forEach(element => {
            let temp = { id: element.id, value: element.platformName, viewValue: element.platformName, platformLead: element.platformLead, so5Metrics: element.so5Metrics };
            this.Platforms.push(temp);
            this.storyLevelPlatforms.push(temp);

            element.so5Metrics.forEach(element => {
              let temp = { id: element.id, value: element.so5Name, viewValue: element.so5Name, platformLead: element.so5Name + ' Lead', so5Metrics: element.so5Name };
              this.so5Names.push(temp);
            });
          });

        },
        (err: HttpErrorResponse) => {
          console.log(err);
        });
  }
  platFormChange(platFormDetails) {
    //location.reload();
  }

  onChange(val) {
    let index = this.Platforms.find(c => c.value == val);
    this.platformForm.patchValue({ platformLead: index.platformLead })
    //let indexSo5 = this.so5Names.find(c => c.value == val);
    this.so5Names = [];
    this.so5Names = index.so5Metrics;
    this.platformForm.patchValue({ platformLead: index.platformLead })
    this.selectedSo5Id = index.id;
  }
  storyLevelOnChange(val) {
    let index = this.storyLevelPlatforms.find(c => c.value == val);
    this.storyLevelPlatformForm.patchValue({ platformLead: index.platformLead, so5Name: index.so5Metrics })
    this.so5DetailsLevelSelectedIndex = index.id;
  }
  releaseOnChange(val) {
    let index = this.so5Names.find(c => c.value == val);
    this.releasePlatformForm.patchValue({ so5StartDate: index.so5StartDate, so5EndDate: index.so5EndDate })
    this.selectedSo5Id = index.id;
  }

  nonDeliveryKPIOnChange(val) {
    let index = this.so5Names.find(c => c.value == val);
    this.nonDeliveryKPIForm.patchValue({ nonDeliveryKPISo5StartDate: index.so5StartDate, nonDeliveryKPISo5EndDate: index.so5EndDate })
    this.selectedSo5Id = index.id;
  }
  releaseGet_products() {
    this.SprintLevelService.get_products()
      .subscribe(
        (data: any) => {
          this.data = data;
          this.data.forEach(element => {
            let temp = { id: element.id, so5EndDate: element.so5EndDate, so5StartDate: element.so5StartDate, platformName: element.platformName };
            this.releasePlatforms.push(temp);
          });

        },
        (err) => {
          console.log(err);
        });

  }
  nonDeliveryKPIGet_products() {
    this.SprintLevelService.get_products()
      .subscribe(
        (data: any) => {
          this.data = data;
          this.data.forEach(element => {
            let temp = { id: element.id, so5EndDate: element.so5EndDate, so5StartDate: element.so5StartDate, platformName: element.platformName, so5Name: element.so5Name };
            this.nonDeliveryKPIPlatforms.push(temp);
          });

        },
        (err) => {
          console.log(err);
        });
  }
  calcBusinessDays(start1: any, end1: any) {
    var start = new Date(start1);
    var end = new Date(end1);
    var totalBusinessDays = 0;
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    var current = new Date(start);
    current.setDate(current.getDate() + 1);
    var day;
    while (current <= end) {
      day = current.getDay();
      if (day >= 1 && day <= 5) {
        ++totalBusinessDays;
      }
      current.setDate(current.getDate() + 1);
    }
    return totalBusinessDays;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  startEditStoryLevel(index, row) {
    this.storyLevelSelectedIndex = index;
    this.storyLevelUpdateBtn = true;
    this.storyLevelForm.patchValue(row);
  }

  startEdit(index, row) {
    this.selectedIndex = index;
    this.updateBtn = true;
    this.teamSquardForm.patchValue(row);
    this.sprintForm.patchValue(row);
    this.sprintDetails_Cal = [];
    this.dataSource_Cal = new MatTableDataSource(this.sprintDetails_Cal);
  }
  startReleaseEdit(index, row) {
    this.selectedReleaseIndex = index;
    this.updateReleaseBtn = true;
    this.releaseTeamSquardForm.patchValue(row);
    this.releaseForm.patchValue(row);
    this.releaseDetails_Cal = [];
    this.releaseDataSource_Cal = new MatTableDataSource(this.releaseDetails_Cal);
  }

  startEditNonDeliveryKPI(index, row) {
    this.selectedNonDeliveryKPIIndex = index;
    this.updateNonDeliveryKPIBtn = true;
    this.nonDeliveryKPITeamSquardForm.patchValue(row);
    this.getDisMonth();
  }

  storyLevelUpdateDetails() {
    this.storyLevelSubmitted = true;
    if (this.storyLevelForm.valid) {
      this.storyLevelUpdateBtn = false;
      this.storyLevelDetails[this.storyLevelSelectedIndex] = this.storyLevelForm.value;
      this.storyLevelDataSource = new MatTableDataSource(this.storyLevelDetails);
      this.storyLevelForm.reset();
      this.storyLevelSubmitted = false;
      this._snackBar.open("Updated Succesfully..!", "", {
        duration: 2000,
      });
    }
    else {
      this._snackBar.open("Please provide required details in form..", "", {
        duration: 2000,
      });
    }
  }

  updateDetails() {
    this.submitted = true;
    if (this.sprintForm.valid && this.teamSquardForm.valid) {
      this.updateBtn = false;
      this.sprintDetails[this.selectedIndex] = (Object.assign({}, this.teamSquardForm.value, this.sprintForm.value));
      this.dataSource = new MatTableDataSource(this.sprintDetails);
      this.teamSquardForm.reset();
      this.sprintForm.reset();
      this.submitted = false;
      this._snackBar.open("Updated Succesfully..!", "", {
        duration: 2000,
      });
    }
    else {
      this._snackBar.open("Please provide required details in form..", "", {
        duration: 2000,
      });
    }
  }

  updateReleaseDetails() {
    this.releaseSubmitted = true;
    if (this.releaseForm.valid && this.releaseTeamSquardForm.valid) {
      this.updateReleaseBtn = false;
      this.releaseDetails[this.selectedReleaseIndex] = (Object.assign({}, this.releaseTeamSquardForm.value, this.releaseForm.value));
      this.releaseDataSource = new MatTableDataSource(this.releaseDetails);
      this.releaseTeamSquardForm.reset();
      this.releaseForm.reset();
      this.releaseForm.patchValue({ quality: "true" });
      this.releaseSubmitted = false;
      this._snackBar.open("Updated Succesfully..!", "", {
        duration: 2000,
      });
    }
    else {
      this._snackBar.open("Please provide required details in form..", "", {
        duration: 2000,
      });
    }
  }

  updateNonDeliveryKPIDetails() {
    var att = 0;
    this.updateNonDeliveryKPIBtn = true;
    if (this.nonDeliveryKPITeamSquardForm.valid) {
      this.updateNonDeliveryKPIBtn = false;
      this.nonDeliveryKPIDetails[this.selectedNonDeliveryKPIIndex] = (Object.assign({}, this.nonDeliveryKPITeamSquardForm.value));
      this.releaseDataSource = new MatTableDataSource(this.nonDeliveryKPIDetails);
      for (var i = 0; i < this.nonDeliveryKPIDetails.length; i++) {
        att += parseInt(this.nonDeliveryKPIDetails[i].attrition);
      }
      this.nonDeliveryKPIPercentage = parseInt((Number(att) / Number(this.nonDeliveryKPIForm.value.resourcesOnboarded) * 100).toFixed(2));
      this.nonDeliveryKPITeamSquardForm.reset();
      this.nonDeliveryKPITeamSquardForm.patchValue({ resourcesOnboarded: this.nonDeliveryKPIDetails[this.nonDeliveryKPIDetails.length - 1].retention });
      this._snackBar.open("Updated Succesfully..!", "", {
        duration: 2000,
      });
      this.getDisMonth();
    }
    else {
      this._snackBar.open("Please provide required details in form..", "", {
        duration: 2000,
      });
    }
  }

  storyLevelCancelEdit() {
    this.storyLevelUpdateBtn = false;
    this.storyLevelForm.reset();
    this.storyLevelSubmitted = false;
    this._snackBar.open("Cancelled update..!", "", {
      duration: 2000,
    });
  }


  cancelEdit() {
    this.updateBtn = false;
    this.teamSquardForm.reset();
    this.sprintForm.reset();
    this.submitted = false;
    this._snackBar.open("Cancelled update..!", "", {
      duration: 2000,
    });
  }

  cancelReleaseEdit() {
    this.updateReleaseBtn = false;
    this.releaseTeamSquardForm.reset();
    this.releaseForm.reset();
    this.releaseForm.patchValue({ quality: "true" });
    this.releaseSubmitted = false;
    this._snackBar.open("Cancelled update..!", "", {
      duration: 2000,
    });
  }

  cancelNonDeliveryKPIEdit() {
    this.updateNonDeliveryKPIBtn = false;
    this.nonDeliveryKPITeamSquardForm.reset();
    this.nonDeliveryKPITeamSquardForm.patchValue({ resourcesOnboarded: this.nonDeliveryKPIDetails[this.nonDeliveryKPIDetails.length - 1].retention });
    this._snackBar.open("Cancelled update..!", "", {
      duration: 2000,
    });
    this.getDisMonth();
  }

  deleteRowStoryLevel(index) {
    var retVal = confirm("Do you want to Delete ?");
    if (retVal == true) {
      this.storyLevelDetails.splice(index, 1);
      this.storyLevelDataSource = new MatTableDataSource(this.storyLevelDetails);
      this._snackBar.open("Deleted Succesfully..!", "", {
        duration: 2000,
      });
    }
  }

  deleteRow(index) {
    var retVal = confirm("Do you want to Delete ?");
    if (retVal == true) {
      this.sprintDetails.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.sprintDetails);
      this._snackBar.open("Deleted Succesfully..!", "", {
        duration: 2000,
      });
      this.sprintDetails_Cal = [];
      this.dataSource_Cal = new MatTableDataSource(this.sprintDetails_Cal);
    }
  }

  deleteReleaseRow(index) {
    var retVal = confirm("Do you want to Delete ?");
    if (retVal == true) {
      this.releaseDetails.splice(index, 1);
      this.releaseDataSource = new MatTableDataSource(this.releaseDetails);
      this._snackBar.open("Deleted Succesfully..!", "", {
        duration: 2000,
      });
      this.releaseDetails_Cal = [];
      this.releaseDataSource_Cal = new MatTableDataSource(this.releaseDetails_Cal);
    }
  }

  deleteRowNonDeliveryKPI(index) {
    var retVal = confirm("Do you want to Delete ?");
    if (retVal == true) {
      this.nonDeliveryKPIDetails.splice(index, 1);
      this.nonDeliveryKPIDataSource = new MatTableDataSource(this.nonDeliveryKPIDetails);
      this._snackBar.open("Deleted Succesfully..!", "", {
        duration: 2000,
      });
      this.getDisMonth();
    }
  }

  calculateCycleTime(storyLevelForm) {
    let result = 0;

    if (storyLevelForm.value.storyStartDate != "" && storyLevelForm.value.storyReleaseDate != "") {
      var diff = Math.abs(storyLevelForm.value.storyStartDate.getTime() - storyLevelForm.value.storyReleaseDate.getTime());
      result = Math.ceil(diff / (1000 * 3600 * 24)) - 1;
      this.storyLevelForm.patchValue({ storyCycleTime: result });
    }
  }

  getDisMonth() {
    this.month.forEach((element1, index1) => { element1.disabled = false; });
    this.month.forEach((element1, index1) => {
      this.nonDeliveryKPIDetails.forEach((element2, index2) => {
        if (element1.monthName == element2.nonDeliveryKPIMonth) {
          element1.disabled = true;
        }
      });
    });

    let s = this.month.filter(value => this.nonDeliveryKPIDetails.filter(val => value.monthName == val.nonDeliveryKPIMonth))
  }

  so5DetailsLevelAddDetails() {

    this.so5DetailsLevelSubmitted = true;
    if (this.so5DetailsLevelForm.valid) {

      this.so5DetailsLevelDetails.push(Object.assign({}, this.so5DetailsLevelForm.value, this.so5DetailsVelocityForm.value,
        this.so5DetailsQualityForm.value, this.so5DetailsEffectivenessForm.value,
        this.so5DetailsBurndownForm.value, this.so5DetailsPeopleForm.value
      ));
      this.SprintLevelService.so5DetailsLevelAddDetailsAPI(this.so5DetailsLevelDetails);
      this.so5DetailsLevelDataSource = new MatTableDataSource(this.so5DetailsLevelDetails);
      this.so5DetailsLevelForm.reset();
      this.so5DetailsVelocityForm.reset();
      this.so5DetailsVelocityForm.patchValue({ 'velocity': 'false', 'featureCycleTime': 'false', 'storyCycleTime': 'false' });
      this.so5DetailsQualityForm.reset();
      this.so5DetailsQualityForm.patchValue({ 'onQualityCompletion': 'false', 'qualitySITDefectLeakage': 'false' });
      this.so5DetailsEffectivenessForm.reset();
      this.so5DetailsEffectivenessForm.patchValue({ 'sprintVariance': 'false', 'releaseVariance': 'false', 'storyVolatility': 'false', 'featureVolatility': 'false' });
      this.so5DetailsBurndownForm.reset();
      this.so5DetailsBurndownForm.patchValue({ 'sprintBurndown': 'false', 'releaseBurndown': 'false', 'sprintBurnUp': 'false', 'releaseBurnUp': 'false' });
      this.so5DetailsPeopleForm.reset();
      this.so5DetailsPeopleForm.patchValue({ 'people': 'false' });
      this.so5DetailsLevelSubmitted = false;
      this._snackBar.open("Added Succesfully..!", "", {
        duration: 2000,
      });
    } else {
      this._snackBar.open("Please provide required details in form..", "", {
        duration: 2000,
      });
    }
  }

  addDetails() {
    this.submitted = true;
    if (this.platformForm.valid && this.teamSquardForm.valid && this.sprintForm.valid) {
      this.sprintDetails.push(Object.assign({}, this.teamSquardForm.value, this.sprintForm.value));
      this.dataSource = new MatTableDataSource(this.sprintDetails);
      this.sprintForm.reset();
      this.submitted = false;
      this._snackBar.open("Added Succesfully..!", "", {
        duration: 2000,
      });
    } else {
      this._snackBar.open("Please provide required details in form..", "", {
        duration: 2000,
      });
    }
  }

  storyLevelAddDetails() {
    this.storyLevelSubmitted = true;
    if (this.storyLevelPlatformForm.valid && this.storyLevelForm.valid) {
      this.storyLevelDetails.push(this.storyLevelForm.value);
      this.storyLevelDataSource = new MatTableDataSource(this.storyLevelDetails);
      this.storyLevelForm.reset();
      this.storyLevelSubmitted = false;
      this._snackBar.open("Added Succesfully..!", "", {
        duration: 2000,
      });
    } else {
      this._snackBar.open("Please provide required details in form..", "", {
        duration: 2000,
      });
    }
  }

  releasaeAddDetails() {
    this.releaseSubmitted = true;
    if (this.releasePlatformForm.valid && this.releaseForm.valid && this.releaseTeamSquardForm.valid) {
      this.releaseDetails.push(Object.assign({}, this.releaseTeamSquardForm.value, this.releaseForm.value));
      this.releaseDataSource = new MatTableDataSource(this.releaseDetails);
      this.releaseForm.reset();
      this.releaseSubmitted = false;
      this.releaseForm.patchValue({ quality: "true" });
      this._snackBar.open("Added Succesfully..!", "", {
        duration: 2000,
      });
    } else {
      this._snackBar.open("Please provide required details in form..", "", {
        duration: 2000,
      });
    }
  }

  addNonDeliveryKPIDetails() {
    var att = 0;
    this.nonDeliveryKPISubmitted = true;
    if (this.nonDeliveryKPITeamSquardForm.valid && this.nonDeliveryKPIForm.valid) {
      this.nonDeliveryKPIDetails.push(Object.assign({}, this.nonDeliveryKPITeamSquardForm.value));
      for (var i = 0; i < this.nonDeliveryKPIDetails.length; i++) {
        att += parseInt(this.nonDeliveryKPIDetails[i].attrition);
      }
      this.nonDeliveryKPIPercentage = parseInt((Number(att) / Number(this.nonDeliveryKPIForm.value.resourcesOnboarded) * 100).toFixed(2));
      this.nonDeliveryKPIDataSource = new MatTableDataSource(this.nonDeliveryKPIDetails);
      this.nonDeliveryKPITeamSquardForm.reset();
      this.nonDeliveryKPISubmitted = false;
      this.nonDeliveryKPITeamSquardForm.patchValue({ resourcesOnboarded: this.nonDeliveryKPIDetails[this.nonDeliveryKPIDetails.length - 1].retention });
      this._snackBar.open("Added Succesfully..!", "", {
        duration: 2000,
      });
      this.kpiIsDisable = false;
      this.getDisMonth();
    } else {
      this._snackBar.open("Please provide required details in form..", "", {
        duration: 2000,
      });
    }
  }

  so5DetailsLevelDisplayedColumns: string[] = ['index', 'so5DetailsLevelPlatform', 'sowNo', 'sowName', 'sowType', 'hclPM', 'hclDh', 'cbaManager', 'sowStartDate', 'sowEndDate', 'velocity', 'featureCycleTime', 'storyCycleTime', 'onQualityCompletion', 'qualitySITDefectLeakage', 'sprintVariance', 'releaseVariance', 'storyVolatility', 'featureVolatility', 'sprintBurndown', 'releaseBurndown', 'sprintBurnUp', 'releaseBurnUp', 'people'];
  so5DetailsLevelDataSource = new MatTableDataSource(this.so5DetailsLevelDetails);

  storyLevelDisplayedColumns: string[] = ['index', 'storyLevelSprint', 'UserStoryIDs', 'storyStartDate', 'storyReleaseDate', 'storyCycleTime', 'actions'];
  storyLevelDataSource = new MatTableDataSource(this.storyLevelDetails);

  displayedColumns: string[] = ['index', 'teamSquard', 'sprint', 'sprintStartDate', 'sprintEndDate',
    'completed', 'commited', 'done', 'commitedInSprint', 'completedInSprint',
    'changedInSprint', 'comments', 'actions'];
  dataSource = new MatTableDataSource(this.sprintDetails);


  releaseDisplayedColumns: string[] = ['index', 'releaseTeamSquad', 'releaseNameNumber', 'releaseMonth', 'quality', 'incidentsRaised', 'totalIncidents', 'storyPointsCommited', 'storyPointDone',
    'featuresCommited', 'featuresCompleted', 'featuresChanged', 'releaseComments', 'actions'];
  releaseDataSource = new MatTableDataSource(this.releaseDetails);

  nonDeliveryKPIDisplayedColumns: string[] = ['index', 'nonDeliveryKPIMonth', 'attrition', 'actions'];
  nonDeliveryKPIDataSource = new MatTableDataSource(this.nonDeliveryKPIDetails);

  calculateSprintDetails() {
    this.sprintDetails_Cal = [];
    this.sprintDetails.forEach(sprintDet => {
      var velocity = (Number(sprintDet.completed) / Number(sprintDet.commited) * 100).toFixed(2);
      var storyCycleTime = 0;//this.calcBusinessDays(sprintDet.startDate, sprintDet.endDate) + 1;
      var sprintVariance = (Number(sprintDet.completedInSprint) / Number(sprintDet.commitedInSprint) * 100).toFixed(2);
      var storyVolatillity = (Number(sprintDet.changedInSprint) / Number(sprintDet.commitedInSprint) * 100).toFixed(2);
      var sprintBurndown = (Number(sprintDet.done) / Number(sprintDet.commited) * 100).toFixed(2);
      this.sprintDetails_Cal.push({
        'velocity': velocity, 'storyCycleTime': storyCycleTime, 'sprintVariance': sprintVariance,
        'storyVolatillity': storyVolatillity, 'sprintBurndown': sprintBurndown
      });
    });
    this.dataSource_Cal = new MatTableDataSource(this.sprintDetails_Cal);
  }

  calculateReleaseDetails() {

    this.releaseDetails_Cal = [];
    this.releaseDetails.forEach(releaseDet => {
      var cycleTime = this.calcBusinessDays(releaseDet.startDatePicker, releaseDet.endDatePicker) + 1;
      var qualityCompletion = "NA";
      var defectLeakage = ((Number(releaseDet.incidentsRaised) / Number(releaseDet.totalIncidents)) * 100).toFixed(2);;
      var releaseVariance = (Number(releaseDet.featuresCompleted) / Number(releaseDet.featuresCommited) * 100).toFixed(2);
      var featureVolatility = (Number(releaseDet.featuresChanged) / Number(releaseDet.featuresCompleted) * 100).toFixed(2);
      var releaseBurndown = (Number(releaseDet.storyPointDone) / Number(releaseDet.storyPointsCommited) * 100).toFixed(2);
      this.releaseDetails_Cal.push({
        'cycleTime': cycleTime, 'qualityCompletion': qualityCompletion, 'defectLeakage': defectLeakage,
        'releaseVariance': releaseVariance, 'featureVolatility': featureVolatility, 'releaseBurndown': releaseBurndown
      });

    });
    this.releaseDataSource_Cal = new MatTableDataSource(this.releaseDetails_Cal);

  }

  displayedColumns_Cal: string[] = ['index', 'velocity', 'storyCycleTime', 'sprintVariance',
    'storyVolatillity', 'sprintBurndown'];
  dataSource_Cal = new MatTableDataSource(this.sprintDetails_Cal);

  public data: any = { totalPages: 1, totalElements: 4, content: new Array() };

  get_So5() {
    this.SprintLevelService.get_So5()
      .subscribe(
        (data: any) => {
          this.data = data;
          this.data.forEach(element => {
            let temp = { id: element.id, value: element.so5Name, viewValue: element.so5Name, platformLead: element.so5Name + ' Lead', so5Name: element.so5Name };
            this.so5Names.push(temp);
          });

        },
        (err: HttpErrorResponse) => {
          console.log(err);
        });
  }

  get_products() {
    this.so5Names = [];
    this.Platforms = [];
    this.SprintLevelService.get_products()
      .subscribe(
        (data: any) => {
          var result = data;
          this.data = data;
          this.data.forEach(element => {
            let temp = { id: element.id, value: element.platformName, viewValue: element.platformName, platformLead: element.platformLead, so5Metrics: element.so5Metrics };
            this.Platforms.push(temp);
            this.storyLevelPlatforms.push(temp);

            element.so5Metrics.forEach(element => {
              let temp = { id: element.id, value: element.so5Name, viewValue: element.so5Name, platformLead: element.so5Name + ' Lead', so5Metrics: element.so5Name };
              this.so5Names.push(temp);
            });
          });

        },
        (err: HttpErrorResponse) => {
          console.log(err);
        });

  }


  releaseDisplayedColumns_Cal: string[] = ['index', 'cycleTime', 'qualityCompletion', 'defectLeakage',
    'releaseVariance', 'featureVolatility', 'releaseBurndown'];
  releaseDataSource_Cal = new MatTableDataSource(this.releaseDetails_Cal);

  saveStoryLevel() {
    this.SprintLevelService.StoryLevelResourceAPI(this.so5DetailsLevelSelectedIndex, this.storyLevelPlatformForm.value, this.storyLevelDetails);
    let event = { 'index': '' };
    event.index = '1';
    this.tabChange(event);
    this._snackBar.open("Added Succesfully..!", "", {
      duration: 2000,
    });
  }

  saveSprintCal() {
    this.SprintLevelService.SprintResourceAPI(this.selectedSo5Id, this.platformForm.value, this.sprintDetails);
    this.SprintLevelService.SprintLevelCalAPI(this.sprintDetails_Cal);
    let event = { 'index': '' };
    event.index = '0';
    this.tabChange(event);
  }

  saveReleaseCal() {
    this.SprintLevelService.ReleaseLevelCalAPI(this.releaseDetails_Cal);
    this.SprintLevelService.releaseResourceAPI(this.selectedSo5Id, this.releasePlatformForm.value, this.releaseDetails);
    let event = { 'index': '' };
    event.index = '1';
    this.tabChange(event);
  }
  saveNonDeliveryKPICal() {
    this.SprintLevelService.NonDeliveryKpiAPI(this.selectedSo5Id, this.platformForm, this.nonDeliveryKPIDetails);
    let event = { 'index': '' };
    event.index = '2';
    this.tabChange(event);
  }

  tabChange($event) {
    if ($event.index == 0) {
      this.Platforms = [];
      this.so5Names = [];
      this.so5DetailsLevelDetails = [];
      this.so5DetailsLevelDataSource = new MatTableDataSource(this.so5DetailsLevelDetails);
      this.showSo5DetailsLevel = true;
      this.showStoryLevel = false;
      this.showSprintLevel = false;
      this.showReleaseLevel = false;
      this.showNonDeliveryKPILevel = false;
      this.so5DetailsLevelSubmitted = false;
      this.ngOnInit();

    }
    if ($event.index == 1) {
      this.Platforms = [];
      this.so5Names = [];
      this.showStoryLevel = true;
      this.showSprintLevel = false;
      this.showReleaseLevel = false;
      this.showNonDeliveryKPILevel = false;
      this.storyLevelSubmitted = false;
      this.storyLevelUpdateBtn = false;
      this.storyLevelSelectedIndex = '';
      this.ngOnInit();
      this.storyLevelDetails = [];
      this.storyLevelDataSource = new MatTableDataSource(this.storyLevelDetails);
    }
    if ($event.index == 2) {
      this.Platforms = [];
      this.so5Names = [];
      this.showStoryLevel = false;
      this.showSprintLevel = true;
      this.showReleaseLevel = false;
      this.showNonDeliveryKPILevel = false;
      this.submitted = false;
      this.updateBtn = false;
      this.selectedIndex = '';
      this.ngOnInit();
      this.sprintDetails = [];
      this.dataSource = new MatTableDataSource(this.sprintDetails);
      this.sprintDetails_Cal = [];
      this.dataSource_Cal = new MatTableDataSource(this.sprintDetails_Cal);
    }
    if ($event.index == 3) {
      this.Platforms = [];
      this.so5Names = [];
      this.showStoryLevel = false;
      this.showSprintLevel = false;
      this.showReleaseLevel = true;
      this.showNonDeliveryKPILevel = false;
      this.releaseSubmitted = false;
      this.updateReleaseBtn = false;
      this.selectedReleaseIndex = '';
      this.ngOnInit();
      this.releaseDetails = [];
      this.releaseDataSource = new MatTableDataSource(this.releaseDetails);
      this.releaseDetails_Cal = [];
      this.releaseDataSource_Cal = new MatTableDataSource(this.releaseDetails_Cal);
    }
    if ($event.index == 4) {
      this.Platforms = [];
      this.so5Names = [];
      this.showStoryLevel = false;
      this.showSprintLevel = false;
      this.showReleaseLevel = false;
      this.showNonDeliveryKPILevel = true;
      this.nonDeliveryKPISubmitted = false;
      this.updateNonDeliveryKPIBtn = false;
      this.selectedNonDeliveryKPIIndex = '';
      this.ngOnInit();
      this.getDisMonth();
      this.nonDeliveryKPIDetails = [];
      this.nonDeliveryKPIDataSource = new MatTableDataSource(this.nonDeliveryKPIDetails);
    }
  }


  public export_Excel() {
    const readyToExport_test = [];
    let readyToExport = [];
    this.sprintDetails.forEach((element, index) => {
      readyToExport_test.push(Object.assign({}, this.platformForm.value, element, this.sprintDetails_Cal[index]));
    });
    readyToExport = readyToExport_test.map(rec => {
      return {
        "Platform Name": rec.platformName,
        "Platform Lead": rec.platformLead,
        "SO5 Name": rec.so5Name,
        "Team/Squad": rec.teamSquard,
        "Sprint #	": rec.sprint,
        "Sprint Start Date": rec.sprintStartDate,
        "Sprint End Date": rec.sprintEndDate,
        "# Story Points Completed": rec.completed,
        "# Story Points Committed	": rec.commited,
        "# Story Points marked as 'Done'	": rec.done,
        // "Min Story 'In Dev' start date	": new Date(rec.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).split(' ').join('-'),
        // "Story marked as 'Done'  - Max Date	": new Date(rec.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).split(' ').join('-'),
        "# User stories committed in the Sprint": rec.commitedInSprint,
        "#User Stories Completed within the Sprint	": rec.completedInSprint,
        "# User stories changed during the Sprint": rec.changedInSprint,
        "FC1 - Velocity	": rec.velocity + "%",
        "FC3-Story Cycle Time	": rec.storyCycleTime,
        "FC6-Sprint Variance": rec.sprintVariance + "%",
        "FC8- Story Volatility	": rec.storyVolatillity + "%",
        "FC10 - Sprint Burndown	": rec.sprintBurndown + "%",
        "Comments": rec.comments
      }
    })
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(readyToExport);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sprint Level'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'Sprint_Level_Details.xlsx'); // initiate a file download in browser
  }

  export_Excel_Release() {
    const readyToExport_test = [];
    let readyToExport = [];
    this.releaseDetails.forEach((element, index) => {
      readyToExport_test.push(Object.assign({}, this.releasePlatformForm.value, element, this.releaseDetails_Cal[index]));
    });
    readyToExport = readyToExport_test.map(rec => {
      return {
        "Platform Name": rec.releasePlatformName,
        "SO5 Start Date": new Date(rec.so5StartDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).split(' ').join('-'),
        "SO5 End Date": new Date(rec.so5EndDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).split(' ').join('-'),
        "Team/Squad": rec.releaseTeamSquad,
        "Release Name/Release Number": rec.releaseNameNumber,
        "Release Month ": rec.releaseMonth,
        "Release - On Quality (Y/N)? ": rec.quality == 'true' ? 'Y' : 'N',
        "# Incidents raised in Production	 ": rec.incidentsRaised,
        "Total # Incidents (including Production Incidents)": rec.totalIncidents,
        "# of Story points committed in the Release": rec.storyPointsCommited,
        "# of Story points marked as 'Done' in the Release ": rec.storyPointDone,
        "# of Features committed in the Release	 ": rec.featuresCommited,
        "# of Features completed in the Release	 ": rec.featuresCompleted,
        "# Features changed in a Release ": rec.featuresChanged,
        "Min Feature Start Date (Inception Date)": new Date(rec.startDatePicker).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).split(' ').join('-'),
        "Max Feature End Date (Date Marked as 'Done')": new Date(rec.endDatePicker).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).split(' ').join('-'),
        "FC2 - Feature Cycle Time	 ": rec.cycleTime,
        "FC4 - On Quality Completion	 ": "NA",
        "FC5 - Quality - SIT Defect Leakage	 ": rec.defectLeakage + "%",
        "FC7-Release Variance	 ": rec.releaseVariance + "%",
        "FC9-Feature Volatility	 ": rec.featureVolatility + "%",
        "FC11-Release Burndown	 ": rec.releaseBurndown + "%"
      }
    })
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(readyToExport);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Release Level'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'Release_Level_Details.xlsx'); // initiate a file download in browser
  }

  export_Excel_NonDeliveryKPI() {
    const readyToExport_test = [];
    let readyToExport = [];
    this.nonDeliveryKPIDetails.forEach((element, index) => {
      readyToExport_test.push(Object.assign({}, this.nonDeliveryKPIForm.value, element, this.nonDeliveryKPITeamSquardForm[index]));
    });
    readyToExport = readyToExport_test.map(rec => {
      return {
        "Platform Name": rec.nonDeliveryKPIPlatformName,
        "SO5 Name": rec.nonDeliveryKPISo5Name,
        "SO5 Start Date": new Date(rec.nonDeliveryKPISo5StartDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).split(' ').join('-'),
        "SO5 End Date": new Date(rec.nonDeliveryKPISo5EndDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).split(' ').join('-'),
        "Resources Onboarded": rec.resourcesOnboarded,
        "Month": rec.nonDeliveryKPIMonth,
        "Attrition": rec.attrition,
        "Retention ": rec.retention,
        "Percentage": rec.percentage + "%"
      }
    })
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(readyToExport);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Non Delivery KPI Level'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'NonDeliveryKPI_Level_Details.xlsx'); // initiate a file download in browser
  }

  valueChange(val, index) {
    if (index == 0) {
      if (this.nonDeliveryKPITeamSquardForm.value.resourcesOnboarded != null && this.nonDeliveryKPITeamSquardForm.value.resourcesOnboarded != "") {
        this.kpiIsDisable = false;
      } else {
        this.kpiIsDisable = true;
      }
    }
    if (index == 1) {
      if ((this.nonDeliveryKPITeamSquardForm.value.attrition != null && this.nonDeliveryKPITeamSquardForm.value.attrition != "")
        && (parseInt(this.nonDeliveryKPITeamSquardForm.value.attrition) <= parseInt(this.nonDeliveryKPITeamSquardForm.value.resourcesOnboarded))) {
        this.nonDeliveryKPITeamSquardForm.patchValue({
          retention: (this.nonDeliveryKPITeamSquardForm.value.resourcesOnboarded - this.nonDeliveryKPITeamSquardForm.value.attrition),
          percentage: ((this.nonDeliveryKPITeamSquardForm.value.attrition / this.nonDeliveryKPITeamSquardForm.value.resourcesOnboarded) * 100).toFixed(2)
        });
      } else {
        this.nonDeliveryKPITeamSquardForm.patchValue(
          { attrition: '', retention: '', percentage: '', })
      }
    }
    if (index == 2) {
      if ((this.nonDeliveryKPITeamSquardForm.value.retention != null && this.nonDeliveryKPITeamSquardForm.value.retention != "")
        && (parseInt(this.nonDeliveryKPITeamSquardForm.value.retention) <= parseInt(this.nonDeliveryKPITeamSquardForm.value.resourcesOnboarded))) {
        this.nonDeliveryKPITeamSquardForm.patchValue({
          percentage: ((this.nonDeliveryKPITeamSquardForm.value.attrition / this.nonDeliveryKPITeamSquardForm.value.resourcesOnboarded) * 100).toFixed(2)
        });
      }
    }
  }
}
