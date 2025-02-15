import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TictacComponent } from './tictac.component';

describe('TictacComponent', () => {
  let component: TictacComponent;
  let fixture: ComponentFixture<TictacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TictacComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TictacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
