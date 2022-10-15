import { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from "../types";
import { ScreenContext } from "../screen/screenContext";
import { Http } from "../../http";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async (title) => {
    clearError();
    try {
      const data = await Http.post(
        "https://rn-todolist-158bd-default-rtdb.europe-west1.firebasedatabase.app/todos.json",
        { title }
      );
      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (e) {
      showError("Something gone wrong...");
    }
  };

  const removeTodo = (id) => {
    const todo = state.todos.find((item) => item.id === id);
    Alert.alert(
      "Deleting To do",
      `Are you sure, that you want to delete "${todo.title}" from the list?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Submit",
          style: "destructive",
          onPress: async () => {
            clearError();
            try {
              changeScreen(null);
              await Http.delete(
                `https://rn-todolist-158bd-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
                "DELETE"
              );
              dispatch({ type: REMOVE_TODO, id });
            } catch (e) {
              showError("Something gone wrong...");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(
        `https://rn-todolist-158bd-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
        { title }
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (e) {
      showError("Something gone wrong...");
    } finally {
      hideLoader();
    }
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get(
        "https://rn-todolist-158bd-default-rtdb.europe-west1.firebasedatabase.app/todos.json"
      );
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError("Something gone wrong...");
    } finally {
      hideLoader();
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
