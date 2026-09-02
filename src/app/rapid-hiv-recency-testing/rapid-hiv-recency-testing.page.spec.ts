import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { RapidHIVRecencyTestingPage } from './rapid-hiv-recency-testing.page';

describe('RapidHIVRecencyTestingPage', () => {
  let component: RapidHIVRecencyTestingPage;
  let fixture: ComponentFixture<RapidHIVRecencyTestingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RapidHIVRecencyTestingPage ],
      providers: [provideIonicAngular()]
    }).compileComponents();

    fixture = TestBed.createComponent(RapidHIVRecencyTestingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
