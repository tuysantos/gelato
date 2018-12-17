import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'step-view',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  @Input() step1Active : boolean = false;
  @Input() step2Active : boolean = false;
  @Input() step3Active : boolean = false;
  @Input() isLogged : boolean = false;
  @Output() stepEvent: EventEmitter<number> = new EventEmitter<number>();

  @Input() step1HasData : boolean = false;
  @Input() step2HasData : boolean = false;

  constructor() { }

  ngOnInit() {

  }

  goTo(index: number, isActive: boolean, stepHasData: boolean): void {
    if(isActive || stepHasData){
      if(index === 0){
        this.step1Active = true;
      }
      else if(index === 1){
        this.step2Active = true;
      }

      this.stepEvent.emit(index);
    }
  }



}
