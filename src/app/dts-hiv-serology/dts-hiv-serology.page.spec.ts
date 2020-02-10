import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DTSHIVSerologyPage } from './dts-hiv-serology.page';

describe('DTSHIVSerologyPage', () => {
  let component: DTSHIVSerologyPage;
  let fixture: ComponentFixture<DTSHIVSerologyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DTSHIVSerologyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DTSHIVSerologyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
