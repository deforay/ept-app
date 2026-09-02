import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { DtsHivViralloadPage } from './dts-hiv-viralload.page';

describe('DtsHivViralloadPage', () => {
  let component: DtsHivViralloadPage;
  let fixture: ComponentFixture<DtsHivViralloadPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DtsHivViralloadPage ],
      providers: [provideIonicAngular()]
    }).compileComponents();

    fixture = TestBed.createComponent(DtsHivViralloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
