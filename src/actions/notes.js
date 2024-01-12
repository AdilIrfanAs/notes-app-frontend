import baseUrl from "../services/base-url";

export const getAllNotes = async (token, dispatch, pageNum, limit) => {
  try {
    dispatch({ type: "LOADING" });
    await baseUrl
      .get(`/note/list?limit=${limit}&page=${pageNum}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { notes, totalPages } = res.data;
        dispatch({
          type: "ALL_NOTES",
          payload: {
            notes,
            totalPages,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "ALL_NOTES_FALIURE",
          payload: err.response.data.message,
        });
      });
  } catch (error) {
    alert("Opps! Something went wrong");
  }
};

export const addNote = async ({ title, description }, token, dispatch) => {
  try {
    await baseUrl
      .post(
        "/note/create",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: "ADD_NOTE",
          payload: res.data.message,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ADD_NOTE_FAIL",
          payload: err.response.data.message,
        });
      });
  } catch (error) {
    alert("Opps! Something went wrong");
  }
};

export const singleNote = async (id, token, dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    await baseUrl
      .get(`/note/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: "SINGLE_NOTE", payload: res.data.note });
      })
      .catch((err) => {
        dispatch({
          type: "SINGLE_NOTE_FAIL",
          payload: err.response.data.message,
        });
      });
  } catch (error) {
    alert("Opps! Something went wrong");
  }
};

export const deleteNote = async (id, token, dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    await baseUrl
      .delete(`/note/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: "DELETE_NOTE", payload: res.data.message });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_NOTE_FAIL",
          payload: err.response.data.message,
        });
      });
  } catch (error) {
    alert("Opps! Something went wrong");
  }
};

export const updateNote = async (
  noteId,
  { title, description },
  token,
  dispatch
) => {
  try {
    dispatch({ type: "LOADING" });
    await baseUrl
      .put(
        "/note/edit",
        {
          noteId,
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const { message, note } = res.data;
        dispatch({
          type: "EDIT_NOTE",
          payload: { message, note },
        });
      })
      .catch((err) => {
        dispatch({
          type: "EDIT_NOTE_FAIL",
          payload: err.response.data.message,
        });
      });
  } catch (error) {
    alert("Opps! Something went wrong");
  }
};

export const deleteBulk = async (noteIds, token, dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    await baseUrl
      .delete("/note/delete-selected", {
        data: {
          noteIds,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: "DELETE_BULK", payload: res.data.message });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_BULK_FAIL",
          payload: err.response.data.message,
        });
      });
  } catch (error) {
    alert("Opps! Something went wrong");
  }
};
