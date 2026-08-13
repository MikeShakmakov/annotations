export type AnnotationType = 'text';

interface AnnotationBase {
  id: string;
  type: AnnotationType;
  documentId: string;
  pageNumber: number;
  x: number;
  y: number;
}

export interface TextAnnotation extends AnnotationBase {
  type: 'text';
  text: string;
}

export type Annotation = TextAnnotation;
