import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllPTSchemesPage } from './all-pt-schemes.page';

describe('AllPTSchemesPage', () => {
  let component: AllPTSchemesPage;
  let fixture: ComponentFixture<AllPTSchemesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPTSchemesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllPTSchemesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
