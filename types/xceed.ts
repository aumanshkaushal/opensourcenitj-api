export type semArrDataType = Array<{
    _id: String;
    sem: String;
    code: String;
    created_at: String;
    updated_at: String;
    __v: Number;
}>;

export type semDataType = {
    _id: String;
    sem: String;
    code: String;
    created_at: String;
    updated_at: String;
    __v: Number;
};

export type sessionDeptDataType = {
    uniqueSessions: Array<{
        session: String;
        currentSession: Boolean;
    }>;
    uniqueDept: String[];
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
