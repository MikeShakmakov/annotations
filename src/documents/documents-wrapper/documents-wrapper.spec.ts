import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsWrapper } from './documents-wrapper';

describe('Documents', () => {
  let component: DocumentsWrapper;
  let fixture: ComponentFixture<DocumentsWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsWrapper],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentsWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
