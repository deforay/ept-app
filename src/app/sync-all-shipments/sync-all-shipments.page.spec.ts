import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SyncAllShipmentsPage } from './sync-all-shipments.page';

describe('SyncAllShipmentsPage', () => {
  let component: SyncAllShipmentsPage;
  let fixture: ComponentFixture<SyncAllShipmentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncAllShipmentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SyncAllShipmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
