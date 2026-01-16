import { healthRoute } from "./health";
import { studentsRoute } from "./students";
import { timeTableRoute } from "./timetable";

export const routes = {
    "/health": healthRoute,
    "/students": studentsRoute,
    "/timetable": timeTableRoute,
};
