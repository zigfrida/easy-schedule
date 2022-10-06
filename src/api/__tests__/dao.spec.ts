import { DocumentReference, DocumentData, Firestore } from 'firebase/firestore';

import { ArrayElement } from '../../types';
import { createFirebaseDao } from '../dao';

const collection = [
    {
        id: 'id1',
        name: 'Joe',
    },
    {
        id: 'id2',
        name: 'Dina',
    },
    {
        id: 'id3',
        name: 'Apple',
    },
];

jest.mock('firebase/firestore', () => {
    let mockCollection = collection;

    return {
        doc: (_db: Firestore, _collectionName: string, id: string) => id,
        getDocs: () =>
            Promise.resolve({
                docs: mockCollection.map((datum) => ({
                    data() {
                        return datum;
                    },
                })),
            }),
        deleteDoc: (id: string) => {
            mockCollection = mockCollection.filter((data) => data.id !== id);
        },
        updateDoc: (id: string, value: ArrayElement<typeof mockCollection>) => {
            mockCollection = mockCollection.map((data) => {
                if (data.id === id) {
                    return { ...data, ...value };
                }
                return data;
            });
        },
        getDoc: (id: string) => {
            const found = mockCollection.find((data) => data.id === id);
            return Promise.resolve({
                exists(): boolean {
                    return Boolean(found);
                },
                data(): ArrayElement<typeof mockCollection> | undefined {
                    return found;
                },
            });
        },
        setDoc: (
            _db: DocumentReference<DocumentData>,
            value: ArrayElement<typeof mockCollection>,
        ) => mockCollection.push(value),
        getFirestore: jest.fn(),
        collection: jest.fn(),
    };
});

describe('createFirebaseDao', () => {
    const testDao = createFirebaseDao('path');

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    test('should successfully get value from the dao', async () => {
        expect(await testDao.get('id3')).toEqual({ id: 'id3', name: 'Apple' });
    });

    test('should successfully get all value from the dao', async () => {
        expect(await testDao.getAll()).toEqual(collection);
    });

    test('should successfully add value to dao', async () => {
        const testValue = { id: 'test id', name: 'test name' };

        await testDao.add(testValue);
        expect(await testDao.get(testValue.id)).toEqual(testValue);
    });

    test('should successfully remove value to dao', async () => {
        await testDao.remove('id1');
        expect(await testDao.get('id1')).toEqual(null);
    });

    test('should successfully update value to the dao', async () => {
        await testDao.update('id2', { name: 'niko' });
        expect(await testDao.get('id2')).toEqual({ id: 'id2', name: 'niko' });
    });
});
