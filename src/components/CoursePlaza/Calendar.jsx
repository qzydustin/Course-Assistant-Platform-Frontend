import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import * as React from "react";
import {useSelector} from "react-redux";

const localizer = momentLocalizer(moment) // or globalizeLocalizer
// moment.locale('en-GB');
export default function MyCalendar(props) {
    let events = props.events
    const enrolledCourse = useSelector(state => state.contentsController.enrolledCourse);

    if( !events ){
        events = []
        for(let courseIndex = 0; courseIndex<enrolledCourse.length; courseIndex++){
            let activeCourse = enrolledCourse[courseIndex]

            let startHour = parseInt(activeCourse.startTime.substring(16,18))
            let endHour = parseInt(activeCourse.endTime.substring(16,18))
            let startMinute = parseInt(activeCourse.startTime.substring(19,21))
            let endMinute = parseInt(activeCourse.endTime.substring(19,21))

            let startTime = new Date(2022, 0, 23, startHour, startMinute, 0, 0)  // Always Sunday
            let endTime = new Date(2022, 0, 23, endHour, endMinute, 0, 0)  // Always Sunday
            let weeksInSemester = 16
            let weekDay = activeCourse.weekday.split(",")
            for(let day=0; day<weekDay.length; day++){
                switch(weekDay[day]) {
                    case "Monday": weekDay[day] = 1;break;
                    case "Tuesday": weekDay[day] = 2;break;
                    case "Wednesday": weekDay[day] = 3;break;
                    case "Thursday": weekDay[day] = 4;break;
                    case "Friday": weekDay[day] = 5;break;
                    case "Saturday": weekDay[day] = 6;break;
                    case "Sunday": weekDay[day] = 0;break;
                }
            }

            for(let week=0; week<weeksInSemester; week++){

                for(let day=0;day<weekDay.length;day++){
                    let addEvent = {
                        'title': activeCourse.title,
                        'allDay': false,
                        'start': new Date(startTime.getTime() + weekDay[day] * 24 * 60 * 60 * 1000),
                        'end': new Date(endTime.getTime() + weekDay[day] * 24 * 60 * 60 * 1000),
                    }
                    events.push(addEvent)
                }
                startTime = new Date(startTime.getTime() + 7 * 24 * 60 * 60 * 1000);
                endTime = new Date(endTime.getTime() + 7 * 24 * 60 * 60 * 1000);
            }
        }
    }

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