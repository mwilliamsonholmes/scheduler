import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

// import { checkPropTypes } from "prop-types";


export default function Form(props) {
  const [error, setError] = useState("");
  const reset = function () {
    setStudent("");
    setInterviewer("");
  };

  const cancel = function () {
    reset();
    props.onCancel();
  }

  // const save = function () {
  //   props.onSave(student, interviewer);
  // }

  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  };


  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // console.log("PROPS!", props);
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          onChange={setInterviewer}
          value={interviewer}
          interviewers={props.interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}

