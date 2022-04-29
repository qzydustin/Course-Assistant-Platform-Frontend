import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import * as React from "react";

const localizer = momentLocalizer(moment) // or globalizeLocalizer

export default function MyCalendar(props) {
    return(
    <div className="myCustomHeight">
        <Calendar
            localizer={localizer}
            // events={myEventsList}
            startAccessor="start"
            endAccessor="end"
        />
    </div>
)}