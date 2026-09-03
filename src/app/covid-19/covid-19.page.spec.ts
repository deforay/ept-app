import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { covid19Page } from './covid-19.page';

describe('covid19Page', () => {
  let component: covid19Page;
  let fixture: ComponentFixture<covid19Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ covid19Page ],
      providers: [provideIonicAngular()]
    }).compileComponents();

    fixture = TestBed.createComponent(covid19Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
