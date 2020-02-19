import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SummaryReportPage } from './summary-report.page';

describe('SummaryReportPage', () => {
  let component: SummaryReportPage;
  let fixture: ComponentFixture<SummaryReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
