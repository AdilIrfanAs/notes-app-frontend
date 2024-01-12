import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/header/header";
import { useContext } from "react";
import { NoteContext } from "../../contexts/note-context";
import Loading from "../../components/loading-screen";

const ViewNote = () => {
  const { noteState } = useContext(NoteContext);
  return (
    <>
      {noteState.loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          {!noteState.success ? (
            <div className="bg-danger p-2">{noteState.message}</div>
          ) : null}
          <main id="main">
            <Container>
              <Row className="justify-content-center">
                <Col lg={6} md={8}>
                  <div className="addeditview-block">
                    <Link
                      className="theme-link mb-3 d-inline-block align-top"
                      to="/user/dashboard"
                    >
                      <FontAwesomeIcon icon={faAnglesLeft} /> Back
                    </Link>
                    <h2 className="mb-3 mb-md-4">Note</h2>
                    <h6 className="fw-bold">Title</h6>
                    <div className=" mb-3 bg-white rounded p-3">
                      {noteState.success ? noteState.note.title : ""}
                    </div>
                    <h6 className="fw-bold">Description</h6>
                    <div className=" h-auto bg-white rounded p-3">
                      {noteState.success ? noteState.note.description : ""}
                    </div>
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

export default ViewNote;
