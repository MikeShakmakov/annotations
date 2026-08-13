import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Document } from './document';
import { ActivatedRoute } from '@angular/router';

describe('Document', () => {
  let component: Document;
  let fixture: ComponentFixture<Document>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Document],
      providers: [{ provide: ActivatedRoute, useValue: { snapshot: { data: {document: {}} } } }],
    }).compileComponents();

    fixture = TestBed.createComponent(Document);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
