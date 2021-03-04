const path = {
  api: {
    todos: 'https://dyatloff-todo-app-server.herokuapp.com/api/todos',
    todo: (id: number) => `https://dyatloff-todo-app-server.herokuapp.com/api/todos/${id}`,
  },
};

export default path;
