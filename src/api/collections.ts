import { Appointment } from '../types/appointment';
import { User } from '../types/user';

import { createFirebaseDao } from './dao';

export const userDao = createFirebaseDao<User>('user');
export const appointmentDao = createFirebaseDao<Appointment>('appointment');
