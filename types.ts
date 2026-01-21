export enum View {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  TRACING = 'TRACING',
  DETAIL = 'DETAIL',
  EVOLUTION = 'EVOLUTION',
  PROFILE = 'PROFILE',
  REPORT = 'REPORT',
  LIBRARY = 'LIBRARY',
  SYLLABUS = 'SYLLABUS',
  FONT_MANAGE = 'FONT_MANAGE',
  FONT_MAP = 'FONT_MAP'
}

export interface NavProps {
  currentView: View;
  onChangeView: (view: View) => void;
}