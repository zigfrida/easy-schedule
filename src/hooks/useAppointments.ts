import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { appointmentDao } from '../api/collections';
import { Appointment } from '../types/appointment';

export default function useAppointments(options: {
    active: boolean;
    filter: Partial<Appointment>;
}): [Appointment[], boolean] {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);
    const { active, filter } = options;

    useEffect(() => {
        if (!active) {
            return () => {};
        }

        setLoading(true);

        const unsubscribe = appointmentDao.subscribe((data) => {
            const result = data.filter((obj) => {
                const appointmentDate = dayjs(obj.date);
                const today = dayjs();
                return appointmentDate.isAfter(today);
            });
            setAppointments(result);
            setLoading(false);
        }, filter);

        return unsubscribe;
    }, [active, filter]);

    return [appointments, loading];
}
