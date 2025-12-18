
export interface Course {
  id: string;
  name: string;
  duration: string;
  fee: string;
  offer?: string;
  modules: string[];
}

export type ViewState = 'home' | 'courses' | 'about' | 'contact' | 'course-detail';
