export const content = [
  './src/**/*.{html,js,jsx,ts,tsx}', 
];

export const theme = {
  extend: {
    colors: {
      primary: 'var(--primary-color)',       
      secondary: 'var(--secondary-color)',   
      bg: 'var(--bg-color)',                
      text: 'var(--text-color)',             
      border: 'var(--border-color)',         
      highlight: 'var(--highlight-color)',   
      taskCardBg: 'var(--task-card-bg)',     
      statusTodo: 'var(--status-todo)',     
      statusInProgress: 'var(--status-in-progress)', 
      statusCompleted: 'var(--status-completed)', 
    },
  },
};

export const plugins = [];