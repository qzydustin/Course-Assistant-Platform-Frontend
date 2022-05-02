import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import * as React from "react";

const localizer = momentLocalizer(moment) // or globalizeLocalizer

export default function MyCalendar(props) {
    let events = props.events
    return(
    <div className="myCustomHeight" style={{height: 700}}>
        <Calendar
            localizer={localizer}
            events={events}
            views={{
                month: true,
                week: true,
                day: true,
            }}
            startAccessor="start"
            endAccessor="end"
            defaultDate={new Date()}
        />
    </div>
)}