import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { DTSHIVSerologyPage } from './dts-hiv-serology.page';

describe('DTSHIVSerologyPage', () => {
  let component: DTSHIVSerologyPage;
  let fixture: ComponentFixture<DTSHIVSerologyPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DTSHIVSerologyPage ],
      providers: [provideIonicAngular()]
    }).compileComponents();

    fixture = TestBed.createComponent(DTSHIVSerologyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
