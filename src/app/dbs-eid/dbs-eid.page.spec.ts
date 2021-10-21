import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DbsEidPage } from './dbs-eid.page';

describe('DbsEidPage', () => {
  let component: DbsEidPage;
  let fixture: ComponentFixture<DbsEidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbsEidPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DbsEidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
