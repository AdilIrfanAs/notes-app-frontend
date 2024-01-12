import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/header/header";
import { useContext, useEffect, useState } from "react";
import {
  deleteBulk,
  deleteNote,
  getAllNotes,
  singleNote,
} from "../../actions/notes";
import { NoteContext } from "../../contexts/note-context";
import { AuthContext } from "../../contexts/auth-context";
import Loading from "../../components/loading-screen";
import { optionsArray } from "../../config/config";

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const { noteState, dispatch } = useContext(NoteContext);
  const [pageNum, setPageNum] = useState(1);
  const [limit, setLimit] = useState(optionsArray[0]);
  const [isChecked, setIsChecked] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [singleDelId, setSingleDelId] = useState(null);
  const [startingIndex, setStartingIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [showMulti, setShowMulti] = useState(false);
  const navigate = useNavigate();

  const handleSingleDeleteClose = () => setShow(false);

  const handleSingleDeleteShow = () => setShow(true);

  const handleMultiDeleteClose = () => setShowMulti(false);

  const handleMultiDeleteShow = () => setShowMulti(true);

  useEffect(() => {
    getAllNotes(authState.accessToken, dispatch, pageNum, limit.value);
    setAllNotes(noteState.allNotes);
    let start = (pageNum - 1) * limit.value;
    setStartingIndex(start);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setAllNotes(noteState.allNotes);
  }, [noteState.allNotes]);

  useEffect(() => {
    const anyChecked = allNotes.filter((note) => note.isChecked === true);
    if (anyChecked.length > 0) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [allNotes]);

  useEffect(() => {
    getAllNotes(authState.accessToken, dispatch, pageNum, limit.value);
    let start = (pageNum - 1) * limit.value;
    setStartingIndex(start);
    // eslint-disable-next-line
  }, [limit, pageNum]);

  const handleSingleNote = (id) => {
    singleNote(id, authState.accessToken, dispatch);
  };

  const handleDelete = async (id) => {
    await deleteNote(id, authState.accessToken, dispatch);
    await getAllNotes(authState.accessToken, dispatch, pageNum, limit.value);
  };

  const handleEdit = async (id) => {
    await singleNote(id, authState.accessToken, dispatch);
    navigate(`edit/${id}`);
  };

  const handleCheckBox = (e, id) => {
    const { name, checked } = e.target;
    if (name === "selectAll") {
      const tempNotes = allNotes.map((note) => {
        return { ...note, isChecked: checked };
      });
      setAllNotes(tempNotes);
    } else {
      const tempNotes = allNotes.map((note) =>
        note._id === id ? { ...note, isChecked: checked } : note
      );
      setAllNotes(tempNotes);
    }
  };

  const handleDeleteBulk = async () => {
    const checkedNotes = allNotes.filter((note) => note.isChecked === true);
    const ids = checkedNotes.map((note) => note._id);
    await deleteBulk(ids, authState.accessToken, dispatch);
    getAllNotes(authState.accessToken, dispatch, pageNum, limit.value);
  };

  const tmpArr = [];
  for (let i = 0; i < noteState.totalPages; i++) {
    tmpArr.push(i + 1);
  }

  return (
    <>
      {noteState.loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          {noteState.message === "" ? null : (
            <div
              className={`text-center fw-bold text-white py-2 ${
                noteState.success === true ? "bg-success" : "bg-danger"
              }`}
            >
              {noteState.message}
            </div>
          )}
          <main id="main">
            <Container>
              <div className="table-header d-flex justify-content-between mb-3 mb-md-5">
                <div className="d-flex align-items-center">
                  <span className="note-text">Show</span>
                  <Select
                    options={optionsArray}
                    defaultValue={limit}
                    onChange={setLimit}
                    className="ms-2"
                    classNamePrefix="custom-select"
                    isSearchable={false}
                  />
                  <span className="ms-2 note-text">Notes</span>
                </div>
                <div className="d-flex align-items-center">
                  {isChecked ? (
                    <button
                      className="btn btn-danger me-2"
                      onClick={handleMultiDeleteShow}
                    >
                      Delete Selected
                    </button>
                  ) : null}

                  <Link
                    className="btn btn-solid d-flex align-items-center justify-content-center"
                    to="add"
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    <span>Add</span>
                  </Link>
                </div>
              </div>
              <div className="table-responsive mb-3 mb-md-5">
                <Table className="theme-table notes-table">
                  <thead>
                    <tr>
                      <th>
                        <label className="right-label-checkbox">
                          <input
                            type="checkbox"
                            name="selectAll"
                            checked={
                              allNotes.length === 0
                                ? false
                                : !allNotes.some(
                                    (note) => note?.isChecked !== true
                                  )
                            }
                            onChange={(e) => handleCheckBox(e)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </th>
                      <th className="text-center">Sr#</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allNotes.length === 0 ? (
                      <tr>
                        <td colSpan={5}>
                          <div className="no-record-found d-flex justify-content-center">
                            No Record Found
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {allNotes.map((note, index) => {
                          return (
                            <tr key={note._id}>
                              <td>
                                <label className="right-label-checkbox">
                                  <input
                                    type="checkbox"
                                    name="note"
                                    checked={note?.isChecked || false}
                                    onChange={(e) =>
                                      handleCheckBox(e, note._id)
                                    }
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </td>
                              <td className="text-center">
                                {startingIndex + index + 1}
                              </td>
                              <td>{note.title.slice(0, 50)}</td>
                              <td>{note.description.slice(0, 100)}</td>
                              <td className="text-center">
                                <ul className="table-actions list-unstyled d-flex justify-content-center mb-0">
                                  <li
                                    className="cursor-pointer"
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="View"
                                    onClick={() => handleSingleNote(note._id)}
                                  >
                                    <Link
                                      className="d-flex justify-content-center align-items-center"
                                      to={`view/${note._id}`}
                                    >
                                      <FontAwesomeIcon icon={faEye} />
                                    </Link>
                                  </li>
                                  <li
                                    className="cursor-pointer"
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="Edit"
                                    onClick={() => handleEdit(note._id)}
                                  >
                                    <Link className="d-flex justify-content-center align-items-center">
                                      <FontAwesomeIcon icon={faPen} />
                                    </Link>
                                  </li>
                                  <li
                                    className="cursor-pointer"
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="Delete"
                                    onClick={() => {
                                      setSingleDelId(note._id);
                                      handleSingleDeleteShow();
                                    }}
                                  >
                                    <span className="d-flex justify-content-center align-items-center">
                                      <FontAwesomeIcon icon={faTrash} />
                                    </span>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    )}
                  </tbody>
                </Table>
              </div>
            </Container>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                {tmpArr.map((val, index) => {
                  return (
                    <li
                      onClick={() => {
                        setPageNum(val);
                      }}
                      key={index}
                      className={`page-item ${pageNum === val ? "active" : ""}`}
                    >
                      <div className="page-link">
                        {val}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </main>
          <Modal
            className="text-black"
            show={show}
            onHide={handleSingleDeleteClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>are you sure you want to delete this note</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleSingleDeleteClose}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleSingleDeleteClose();
                  handleDelete(singleDelId);
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            className="text-black"
            show={showMulti}
            onHide={handleMultiDeleteClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              are you sure you want to delete all selected notes
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleMultiDeleteClose}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleMultiDeleteClose();
                  handleDeleteBulk();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default Dashboard;
