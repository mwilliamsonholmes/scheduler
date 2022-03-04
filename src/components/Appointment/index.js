import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function deleteApt() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => { transition(EMPTY) })
      .catch(error => transition(ERROR_DELETE, true));
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(error => transition(ERROR_SAVE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />)}
      {mode === DELETING && (
        <Status message="Deleting..." />
      )}
      {mode === CONFIRM && (
        <Confirm onCancel={() => transition(SHOW)}
          onConfirm={deleteApt}
        />
      )}

      {mode === EDIT && (
        < Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          onCancel={back}
          onSave={save}
        />)}
      {mode === SAVING && (
        <Status message="Saving!!" />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Sorry, there was an error saving :(" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="There was an error deleting this appointment" onClose={back} />
      )}
    </article>
  )
}
