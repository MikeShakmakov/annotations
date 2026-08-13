import { Routes } from '@angular/router';
import { DocumentsWrapper } from '../documents/documents-wrapper/documents-wrapper';
import { Document } from '../documents/document/document';
import { documentResolver } from '../documents/document-resolver';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'documents',
    pathMatch: 'full'
  },
  {
    path: 'documents',
    component: DocumentsWrapper,
    children: [
      {
        path: ':id',
        component: Document,
        resolve: { document: documentResolver },
      },
    ],
  },
  {
    path: 'not-found',
    component: NotFound,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
