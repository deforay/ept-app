import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppPasswordPage } from './app-password.page';

describe('AppPasswordPage', () => {
  let component: AppPasswordPage;
  let fixture: ComponentFixture<AppPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
