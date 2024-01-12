const noteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, success: false };
    case "ALL_NOTES":
      return {
        ...state,
        allNotes: action.payload.notes,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        message: "",
        loading: false,
      };
    case "ALL_NOTES_FALIURE":
      return { ...state, message: action.payload, loading: false };
    case "ADD_NOTE":
      return { ...state, message: action.payload, success: true };
    case "ADD_NOTE_FAIL":
      return { ...state, message: action.payload, success: false };
    case "RESET":
      return { ...state, message: "", success: false };
    case "SINGLE_NOTE":
      return {
        ...state,
        message: "",
        note: action.payload,
        success: true,
        loading: false,
      };
    case "SINGLE_NOTE_FAIL":
      return {
        ...state,
        message: action.payload,
        success: false,
        loading: false,
      };
    case "DELETE_NOTE":
      return { ...state, loading: false, success: true };
    case "DELETE_NOTE_FAIL":
      return { ...state, loading: false, success: false };
    case "EDIT_NOTE":
      return {
        ...state,
        loading: false,
        note: action.payload.note,
        message: action.payload.message,
        success: true,
      };
    case "EDIT_NOTE_FAIL":
      return {
        ...state,
        loading: false,
        message: action.paylaod.message,
        success: false,
      };
    case "DELETE_BULK":
      return {
        ...state,
        loading: false,
        message: action.paylaod,
        success: true,
      };
    case "DELETE_BULK_FAIL":
      return {
        ...state,
        loading: false,
        message: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export default noteReducer;
