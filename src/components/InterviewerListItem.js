import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerSelected = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected
  });

  return (
    <li className={interviewerSelected} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      {props.selected && props.name}
    </li>
  );
}