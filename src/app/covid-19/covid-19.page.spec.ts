import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { covid19Page } from './covid-19.page';

describe('covid19Page', () => {
  let component: covid19Page;
  let fixture: ComponentFixture<covid19Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ covid19Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(covid19Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
