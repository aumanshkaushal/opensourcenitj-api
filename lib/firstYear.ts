import { fetch } from "bun";
import { eq } from "drizzle-orm";
import config from "../config.json" assert { type: "json" };
import type { studentInfo } from "../types/db";
import type { semArrDataType, sessionDeptDataType } from "../types/xceed.js";
import { db } from "./db";
import * as dbSchema from "./db/schema";

export async function getFirstYearGroups(): Promise<{ [key: string]: semArrDataType }> {
    const sessions = await fetch(config.url.sessionAndDept);
    const sessionDeptData = (await sessions.json()) as sessionDeptDataType;

    const currentSession = sessionDeptData.uniqueSessions.find(sess => sess.currentSession)?.session;

    const dept = sessionDeptData.uniqueDept[0];

    const codeFetch = await fetch(
        `${config.url.deptCode}/${encodeURIComponent(`${currentSession}`)}/${encodeURIComponent(`${dept}`)}`
    );
    const code = JSON.parse(await codeFetch.text());

    const semFetch = await fetch(`${config.url.sem}${encodeURIComponent(code)}`);
    const semData = (await semFetch.json()) as semArrDataType;

    const usableData = semData.filter(semEntry => semEntry.code === code);
    const groups = ["A1", "A2", "A3", "A4", "A5", "A6", "B1", "B2", "B3", "B4", "B5", "B6"];
    const mappedData: { [key: string]: any } = {};
    groups.forEach(group => {
        const semEntry = usableData.find(entry => entry.sem.toUpperCase().includes(group));
        if (semEntry) {
            mappedData[group] = semEntry;
        }
    });

    return mappedData;
}

export async function getStudentDetails(rollNumber: string, batch: string): Promise<studentInfo | null> {
    const table = batch === "2025" ? dbSchema.batch2025Table : null;

    if (!table) {
        return null;
    }

    const data = await db
        .select()
        .from(table)
        .where(eq(table.rollnumber, parseInt(rollNumber)));

    if (data.length === 0) {
        return null;
    }

    const record = data.find(obj => obj.name);

    const student: studentInfo = {
        rollnumber: record?.rollnumber.toString() || "",
        name: record?.name || "",
        branchabbr: record?.branchabbr || "",
        branch: record?.branch || "",
        group: record?.group || "",
        subgroup: record?.subgroup || "",
    };
    return student;
}

export async function getGroup(rollNumber: string): Promise<{ group: string; subGroup: string } | null> {
    const groups = ["A1", "A2", "A3", "A4", "A5", "A6", "B1", "B2", "B3", "B4", "B5", "B6"];
    const subGroups = ["a", "b", "c"];

    const studentDetails = await getStudentDetails(rollNumber, "2025");
    if (studentDetails) {
        const studentGroup = studentDetails.group.toUpperCase();
        const subGroup = studentDetails.subgroup.toLowerCase().slice(-1);
        if (groups.includes(studentGroup)) {
            return {
                group: studentGroup,
                subGroup: subGroup,
            };
        }
    }

    return null;
}
