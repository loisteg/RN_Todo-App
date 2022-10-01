import {
  ADD_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  UPDATE_TODO,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS,
} from "../types";

const handlers = {
  [ADD_TODO]: (state, { title, id }) => ({
    ...state,
    todos: [...state.todos, { id, title }],
  }),
  [REMOVE_TODO]: (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  }),
  [UPDATE_TODO]: (state, { title, id }) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    }),
  }),
  [FETCH_TODOS]: (state, { todos }) => ({ ...state, todos }),
  [SHOW_LOADER]: (state) => ({ ...state, loader: true }),
  [HIDE_LOADER]: (state) => ({ ...state, loader: false }),
  [SHOW_ERROR]: (state) => ({ ...state, error: null }),
  [CLEAR_ERROR]: (state, { error }) => ({ ...state, error }),

  DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
