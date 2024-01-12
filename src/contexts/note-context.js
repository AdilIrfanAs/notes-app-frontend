import { createContext, useReducer } from "react";
import noteReducer from "../reducers/note-reducer";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const initialState = {
    allNotes: [],
    note: [],
    message: "",
    loading: false,
    success: false,
    totalPages: null,
    currentPage: null,
  };

  const [state, dispatch] = useReducer(noteReducer, initialState);

  return (
    <NoteContext.Provider value={{ noteState: state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteProvider };
