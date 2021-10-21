import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterAppPasswordPage } from './enter-app-password.page';

describe('EnterAppPasswordPage', () => {
  let component: EnterAppPasswordPage;
  let fixture: ComponentFixture<EnterAppPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterAppPasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterAppPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
