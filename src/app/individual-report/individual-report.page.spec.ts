import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndividualReportPage } from './individual-report.page';

describe('IndividualReportPage', () => {
  let component: IndividualReportPage;
  let fixture: ComponentFixture<IndividualReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndividualReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
