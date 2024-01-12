import { Container, Row, Col, Form, FormGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/header/header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { NoteContext } from "../../contexts/note-context";
import { updateNote } from "../../actions/notes";
import Loading from "../../components/loading-screen";

const EditNote = () => {
  const { authState } = useContext(AuthContext);
  const { noteState, dispatch } = useContext(NoteContext);
  const [titleErr, setTitleErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (noteState.success === true) {
      setData({
        ...data,
        title: noteState.note.title,
        description: noteState.note.description,
      });
    }
     // eslint-disable-next-line
  }, []);

  const checkTitle = (value) => {
    if (value === "") {
      setTitleErr("* title required");
    }
    if (!/^[a-zA-Z0-9][a-zA-Z0-9\s.,!?()-]*$/g.test(value)) {
      setTitleErr("* title must be a valid value");
    } else {
      setTitleErr("");
    }
  };

  const checkDescription = (value) => {
    if (value === "") {
      setDescriptionErr("* description is required");
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9\s.,!?()-]*$/g.test(value)) {
      setDescriptionErr("* description must be a valid value");
    } else {
      setDescriptionErr("");
    }
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = data;
    if (
      title === "" ||
      description === "" ||
      descriptionErr !== "" ||
      titleErr !== ""
    ) {
      checkTitle(title);
      checkDescription(description);
    } else {
      await updateNote(
        noteState.note._id,
        data,
        authState.accessToken,
        dispatch
      );
    }
  };

  const handleReset = () => {
    dispatch({ type: "RESET_ADD" });
  };

  return (
    <>
      {noteState.loading ? (
        <Loading />
      ) : (
        <>
          {" "}
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
              <Row className="justify-content-center">
                <Col lg={6} md={8}>
                  <div className="addeditview-block">
                    <Link
                      onClick={handleReset}
                      className="theme-link mb-3 d-inline-block align-top"
                      to="/user/dashboard"
                    >
                      <FontAwesomeIcon icon={faAnglesLeft} /> Back
                    </Link>
                    <h2 className="mb-3 mb-md-4">Edit Note</h2>
                    <Form>
                      <FormGroup className="mb-3">
                        <input
                          className="form-control"
                          type="text"
                          name="title"
                          value={data.title}
                          onChange={(e) => {
                            checkTitle(e.target.value);
                            handleData(e);
                          }}
                        />
                        {titleErr ? (
                          <div className="error-text text-start my-2">
                            {titleErr}
                          </div>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <textarea
                          rows="5"
                          cols="5"
                          className="form-control"
                          name="description"
                          placeholder={data.description}
                          value={data.description}
                          onChange={(e) => {
                            checkDescription(e.target.value);
                            handleData(e);
                          }}
                        ></textarea>
                        {descriptionErr ? (
                          <div className="error-text text-start my-2">
                            {descriptionErr}
                          </div>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                      <FormGroup className="d-flex justify-content-end">
                        <button
                          onClick={(e) => handleSubmit(e)}
                          type="submit"
                          className="btn btn-solid transition"
                        >
                          Submit
                        </button>
                      </FormGroup>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Container>
          </main>
        </>
      )}
    </>
  );
};

export default EditNote;
