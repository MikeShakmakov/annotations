import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';

export interface Page {
  number: number;
  imageUrl: string;
}

export interface DocumentData {
  name: string;
  pages: Page[];
}

export const documentResolver: ResolveFn<DocumentData> = (route) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  return http.get<DocumentData>(`/documents/${id}.json`).pipe(
    catchError(() => {
      router.navigate(['/not-found']);
      return EMPTY;
    })
  );
};
