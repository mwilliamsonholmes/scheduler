import React from "react";

import classNames from "classnames";
import "components/DayListItem.scss";


export default function DayListItem(props) {
  const formatSpots = function (spots) {
    if (props.spots === 0) {
      return "no spots remaining";
    }
    if (props.spots === 1) {
      return "1 spot remaining"
    }
    if (props.spots >= 1) {
      return `${props.spots} spots remaining`
    }
  }

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': (props.spots === 0)
  });

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
      data-testid={"day"}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
