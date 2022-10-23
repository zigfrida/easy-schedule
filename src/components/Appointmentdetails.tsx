import { useEffect } from 'react';
import { useState } from 'react';
import { createFirebaseDao } from '../api/dao';
import useAuthData from '../hooks/useAuthData';

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
        //console.log(userD.title);

        console.log('/////////////////////////////////////////////');
    }

    useEffect(() => {
        ff();
        cq();
    }, []);

    return (
        <div style={{ height: 300, width: '100%' }}>
            <p>Appointment Details</p>
        </div>
    );
}
export default Appointmentdetails;
