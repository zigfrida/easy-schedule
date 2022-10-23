import { createFirebaseDao } from '../api/dao';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import useAuthData from '../hooks/useAuthData';

const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'date', headerName: 'date', width: 150 },
];

function Appointmentdetails() {
    const { user } = useAuthData();

    const [tableData, setTableData] = useState([]);
    console.log(tableData);

    async function ff() {
        const diamond = createFirebaseDao('appointment');
        const daya = await diamond.getAll();

        daya.forEach((doc) => {
            console.log(doc);
        });
        const data1 = daya.map(function (v) {
            return Object.values(v);
        });

        console.log(data1);
        data1.forEach((doc) => {
            console.log(doc);
        });
    }

    async function cq() {
        const markers = [];
        const diamond = createFirebaseDao('appointment');

        console.log(user?.uid);
        //  const userD = await diamond.get(user.uid);

       const userD = await diamond.get('6b376fa8-3b42-4e7e-a49f-6260e9d97f1e');

        console.log(userD);
        console.log(userD.title);

        setTableData([
            {
                id: '1',
                title: userD.title,
                id: '2',
                location: userD.location,
                id: '3',
                Date: userD.date,
            },
            //{ id: '2', location: userD.location },
        ]);
        console.log('/////////////////////////////////////////////');
    }

    useEffect(() => {
        ff();
        cq();
    }, []);

    return (
        <div style={{ height: 300, width: '100%' }}>
          
        </div>
    );
}
export default Appointmentdetails;


