import { useEffect, useState } from 'react';

import { userDao } from '../api/collections';
import { NurseUser } from '../types/user';

export default function useNursesList(): [NurseUser[], boolean] {
    const [nurses, setNurses] = useState<NurseUser[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        userDao.subscribe(
            (data) => {
                setNurses(data);
                setLoading(false);
            },
            { userType: 'nurse' },
        );
    }, []);

    return [nurses, loading];
}
