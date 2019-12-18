import React from "react";
import DatePicker from "react-date-picker";
import Select from "react-dropdown-select";

export const DocumentFilter = props => {
  let {
    disciplines,
    statuses,
    setStatusFilter,
    setDisciplineFilter,
    dueBefore,
    dueAfter,
    setDueAfter,
    setDueBefore
  } = props;

  if (!disciplines || !statuses) return null;
  let disciplineOptions = disciplines
    .map(d => ({ label: d.get("name"), value: d.get("name") }))
    .toList()
    .toJS();

  return (
    <div className="row align-items-center">
      <div className="col">
        <Select
          options={disciplineOptions}
          labelField={"label"}
          valueField={"label"}
          multi={true}
          clearable={true}
          placeholder="Filter by Discipline"
          onChange={values => setDisciplineFilter(values)}
        />
      </div>
      <div className="col">
        <Select
          options={statuses}
          labelField={"label"}
          valueField={"label"}
          multi={true}
          clearable={true}
          placeholder="Filter by Status"
          onChange={values => setStatusFilter(values)}
        />
      </div>
      <div className="col">
        <div className="row align-items-center ">
          <div className="col-5 pl-0 pr-2 text-right">
            <b>Due Before</b>
          </div>
          <div className="col-7 p-0">
            <DatePicker
              className="form-control btn-sm datepicker-fullwidth"
              value={dueBefore}
              onChange={value => setDueBefore(value)}
            />
          </div>
        </div>
      </div>
      <div className="col">
        <div className="row align-items-center">
          <div className="col-5 pr-2 text-right">
            <b>Due After</b>
          </div>
          <div className="col-7 p-0">
            <DatePicker
              className="form-control btn-sm datepicker-fullwidth"
              value={dueAfter}
              onChange={value => setDueAfter(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
