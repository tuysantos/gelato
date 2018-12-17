import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StepComponent } from './step.component';

describe('StepComponent', () => {
  let component: StepComponent;
  let fixture: ComponentFixture<StepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set setp 1 active', ()=>{
    component.step1Active = false;
    component.step2Active = false;
    component.step1HasData = false;
    component.step2HasData = false;

    component.goTo(0, true, false);
    expect(component.step1Active).toBe(true)
  });

  it('should set setp 1 active from storage', ()=>{
    component.step1Active = false;
    component.step2Active = false;
    component.step1HasData = true;
    component.step2HasData = false;

    component.goTo(0, false, true);
    expect(component.step1Active).toBe(true)
  });

  it('should set setp 2 active', ()=>{
    component.step1Active = true;
    component.step2Active = false;
    component.step1HasData = true;
    component.step2HasData = false;

    component.goTo(1, true, false);
    expect(component.step1Active).toBe(true)
  });

  it('should set setp 2 active from storage', ()=>{
    component.step1Active = true;
    component.step2Active = false;
    component.step1HasData = true;
    component.step2HasData = true;

    component.goTo(0, false, true);
    expect(component.step1Active).toBe(true)
  });
});
