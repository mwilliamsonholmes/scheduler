import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerSelected = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected
  });
  // console.log("props:", props);
  // console.log("avatar", props.avatar);
  return (

    <li className={interviewerSelected} onClick={props.setInterviewer}>
      {/* <h1>I'm working!</h1> */}
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>

  );
}