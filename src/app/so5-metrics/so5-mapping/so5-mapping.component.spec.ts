import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { So5MappingComponent } from './so5-mapping.component';
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

describe('So5MappingComponent', () => {
  let component: So5MappingComponent;
  let fixture: ComponentFixture<So5MappingComponent>;

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
    fixture = TestBed.createComponent(So5MappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.so5MappingDetails.controls['platformName'].setValue('');
    component.so5MappingDetails.controls['so5Name'].setValue('');
    component.so5MappingDetails.controls['so5StartDate'].setValue('');
    component.so5MappingDetails.controls['so5EndDate'].setValue('');
    expect(component.so5MappingDetails.valid).toBeFalsy();
  });

  it('should set submitted to true', async(() =>{
    component.addDetails();
    expect(component.submitted).toBeTruthy();
  }));
  
});
