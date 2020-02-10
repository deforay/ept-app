import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DtsHivViralloadPage } from './dts-hiv-viralload.page';

describe('DtsHivViralloadPage', () => {
  let component: DtsHivViralloadPage;
  let fixture: ComponentFixture<DtsHivViralloadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtsHivViralloadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DtsHivViralloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
