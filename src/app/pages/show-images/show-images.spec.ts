import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowImages } from './show-images';

describe('ShowImages', () => {
  let component: ShowImages;
  let fixture: ComponentFixture<ShowImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowImages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowImages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
