import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { So5Component } from './so5.component';
import { AppComponent } from 'src/app/app.component';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { SidenavListComponent } from 'src/app/components/sidenav-list/sidenav-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { So5MetricsModule } from '../so5-metrics.module';

describe('So5Component', () => {
  let component: So5Component;
  let fixture: ComponentFixture<So5Component>;
  let velocity: string = "";
  let storyCycleTime: number = 0;
  let sprintVariance: string = "";
  let storyVolatillity: string = "";
  let sprintBurndown: string = "";
  let completed: number = 0;
  let commited: number = 0;
  let completedInSprint: number = 0;
  let commitedInSprint: number = 0;
  let changedInSprint: number = 0;
  let done: number = 0;
  let cycleTime: number = 0;
  let defectLeakage = '';
  let releaseVariance = '';
  let featureVolatility = '';
  let releaseBurndown = '';
  let quality: number = 0;
  let incidentsRaised: number = 0;
  let totalIncidents: number = 0;
  let storyPointsCommited: number = 0;
  let storyPointDone: number = 0;
  let featuresCommited: number = 0;
  let featuresCompleted: number = 0;
  let featuresChanged: number = 0;
  let startDatePicker;
  let endDatePicker;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        WelcomeComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        SidenavListComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        So5MetricsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(So5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('So5 Details Test', () => {
    let velocity = component.so5DetailsVelocityForm.controls['velocity'];
    expect(velocity).not.toBeNull();
    let featureCycleTime = component.so5DetailsVelocityForm.controls['featureCycleTime'];
    expect(featureCycleTime).not.toBeNull();
    let storyCycleTime = component.so5DetailsVelocityForm.controls['storyCycleTime'];
    expect(storyCycleTime).not.toBeNull();

    let onQualityCompletion = component.so5DetailsQualityForm.controls['onQualityCompletion'];
    expect(onQualityCompletion).not.toBeNull();
    let qualitySITDefectLeakage = component.so5DetailsQualityForm.controls['qualitySITDefectLeakage'];
    expect(qualitySITDefectLeakage).not.toBeNull();
    
    let sprintVariance = component.so5DetailsEffectivenessForm.controls['sprintVariance'];
    expect(sprintVariance).not.toBeNull();
    let releaseVariance = component.so5DetailsEffectivenessForm.controls['releaseVariance'];
    expect(releaseVariance).not.toBeNull();
    let storyVolatility = component.so5DetailsEffectivenessForm.controls['storyVolatility'];
    expect(storyVolatility).not.toBeNull();
    let featureVolatility = component.so5DetailsEffectivenessForm.controls['featureVolatility'];
    expect(featureVolatility).not.toBeNull();

    let sprintBurndown = component.so5DetailsEffectivenessForm.controls['sprintBurndown'];
    expect(sprintBurndown).not.toBeNull();
    let releaseBurndown = component.so5DetailsEffectivenessForm.controls['releaseBurndown'];
    expect(releaseBurndown).not.toBeNull();
    let sprintBurnUp = component.so5DetailsEffectivenessForm.controls['sprintBurnUp'];
    expect(sprintBurnUp).not.toBeNull();
    let releaseBurnUp = component.so5DetailsEffectivenessForm.controls['releaseBurnUp'];
    expect(releaseBurnUp).not.toBeNull();

    let people = component.so5DetailsPeopleForm.controls['people'];
    expect(people).not.toBeNull();
  });

  it('calculate velocity', () => {
    completed = 75;
    commited = 90;
    velocity = ((completed / commited) * 100).toFixed(2);
    expect('83.33').toEqual(velocity);
  });

  it('calculate sprintVariance', () => {
    completedInSprint = 4;
    commitedInSprint = 5;
    sprintVariance = ((completedInSprint / commitedInSprint) * 100).toFixed(2);
    expect('80.00').toEqual(sprintVariance);
  });

  it('calculate storyVolatillity', () => {
    changedInSprint = 3;
    commitedInSprint = 5;
    storyVolatillity = ((changedInSprint / commitedInSprint) * 100).toFixed(2);
    expect('60.00').toEqual(storyVolatillity);
  });

  it('calculate sprintBurndown', () => {
    done = 72;
    commited = 90;
    sprintBurndown = ((done / commited) * 100).toFixed(2);
    expect('80.00').toEqual(sprintBurndown);
  });

  it('calculate storyCycleTime', () => {
    let startDatePicker = new Date("Wed Jun 24 2019 00:00:00 GMT+0530");
    let endDatePicker = new Date("Wed Jun 28 2019 00:00:00 GMT+0530");
    storyCycleTime = component.calcBusinessDays(startDatePicker, endDatePicker);
    expect(4).toEqual(storyCycleTime);
  });

  it('calculate cycleTime', () => {
    let startDatePicker = new Date("Wed Jun 24 2019 00:00:00 GMT+0530");
    let endDatePicker = new Date("Wed Jun 28 2019 00:00:00 GMT+0530");
    cycleTime = component.calcBusinessDays(startDatePicker, endDatePicker);
    expect(4).toEqual(cycleTime);
  });

  it('calculate defectLeakage', () => {
    incidentsRaised = 1;
    totalIncidents = 15;
    defectLeakage = ((incidentsRaised / totalIncidents) * 100).toFixed(2);
    expect('6.67')
      .toEqual(defectLeakage);
  });

  it('calculate releaseVariance', () => {
    featuresCompleted = 1;
    featuresCommited = 1;
    releaseVariance = ((featuresCompleted / featuresCommited) * 100).toFixed(2);
    expect('100.00')
      .toEqual(releaseVariance);
  });

  it('calculate featureVolatility', () => {
    featuresChanged = 0;
    featuresCompleted = 1;
    featureVolatility = ((featuresChanged / featuresCompleted) * 100).toFixed(2);
    expect('0.00')
      .toEqual(featureVolatility);
  });

  it('calculate releaseBurndown', () => {
    storyPointDone = 98;
    storyPointsCommited = 108;
    releaseBurndown = ((storyPointDone / storyPointsCommited) * 100).toFixed(2);
    expect('90.74')
      .toEqual(releaseBurndown);
  });

  it('calculate retention', () => {
    let resourcesOnboarded = 45;
    let attrition = 6;
    var retention = resourcesOnboarded - attrition;
    expect(39)
      .toEqual(retention);
  });

  it('calculate percentage', () => {
    let resourcesOnboarded = 45;
    let attrition = 6;
    var percentage = ((attrition / resourcesOnboarded) * 100).toFixed(2);
    expect('13.33')
      .toEqual(percentage);
  });

});
