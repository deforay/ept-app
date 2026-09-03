import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { SyncAllShipmentsPage } from './sync-all-shipments.page';

describe('SyncAllShipmentsPage', () => {
  let component: SyncAllShipmentsPage;
  let fixture: ComponentFixture<SyncAllShipmentsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncAllShipmentsPage ],
      providers: [provideIonicAngular()]
    }).compileComponents();

    fixture = TestBed.createComponent(SyncAllShipmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
