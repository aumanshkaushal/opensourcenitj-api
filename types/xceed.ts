export type semArrDataType = Array<{
    _id: string;
    sem: string;
    code: string;
    created_at: string;
    updated_at: string;
    __v: number;
}>;

export type semDataType = {
    _id: string;
    sem: string;
    code: string;
    created_at: string;
    updated_at: string;
    __v: number;
};

export type sessionDeptDataType = {
    uniqueSessions: Array<{
        session: string;
        currentSession: boolean;
    }>;
    uniqueDept: string[];
};

export type timetableDataType = {
    timetableData: Record<
        string,
        Record<
            string,
            Array<
                Array<{
                    subject: string;
                    faculty: string;
                    room: string;
                }>
            >
        >
    >;
    notes: string[];
};
