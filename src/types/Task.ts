export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
    projectId: string;
  }