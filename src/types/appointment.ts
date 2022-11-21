export interface AppointmentMessage {
    message: string;
    sender: string;
    timestamp: number;
    readBy: string[];
}

export type Appointment = {
    uid: string;
    date: string;
    location: string;
    nurse: string;
    senior: string;
    title: string;

    messages?: AppointmentMessage[];
    notes?: string;
};
