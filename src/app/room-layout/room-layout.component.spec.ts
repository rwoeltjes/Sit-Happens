import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomLayoutComponent } from './room-layout.component';

describe('RoomLayoutComponent', () => {
  let component: RoomLayoutComponent;
  let fixture: ComponentFixture<RoomLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
