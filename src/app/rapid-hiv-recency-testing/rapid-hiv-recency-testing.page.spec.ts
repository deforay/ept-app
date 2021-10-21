import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RapidHIVRecencyTestingPage } from './rapid-hiv-recency-testing.page';

describe('RapidHIVRecencyTestingPage', () => {
  let component: RapidHIVRecencyTestingPage;
  let fixture: ComponentFixture<RapidHIVRecencyTestingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapidHIVRecencyTestingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RapidHIVRecencyTestingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
