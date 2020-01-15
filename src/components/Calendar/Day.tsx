import React from "react";
import * as moment from "moment";

type TodoItemProps = {
  day: moment.Moment;
};

const Day: React.FC<TodoItemProps> = React.memo(({ day }) => {
  return <td>{day.format("D")}</td>;
});

export default Day;
