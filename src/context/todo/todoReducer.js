import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";

export const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
            title: action.payload.title,
          },
        ],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
          }
          return todo;
        }),
      };
    default:
      return state;
  }
};
