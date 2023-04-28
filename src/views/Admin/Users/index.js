import { useEffect, useContext, useState } from 'react';

import { UserContext } from '../../../context/UserContext';
import CustomSpinner from '../../../components/CustomSpinner';
import UsersTable from '../../../components/Admin/UsersTable';
import Nav from '../../../components/Nav';
import request from '../../../utils/request';

function Users(){
    const [loading, setLoading] = useState(false);
    const { setAllUsers, setOrders } = useContext(UserContext);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            await request
                .get('/user')
                .then(res => {
                    if (res.data.success){
                        setAllUsers(res.data.users);
                        setOrders(res.data.orders);
                        setLoading(false);
                    }
                })
        }

        fetchApi();
    }, [])

    const contentNav = [
        {
            id: 1,
            name: 'Quản lý người dùng',
            url: '#'
        }
    ]

    return (
        <>
            <Nav content={contentNav} />
            <h3 style={{margin: '10px'}} className='text-center text-primary'>DANH SÁCH NGƯỜI DÙNG</h3>
            {loading ? <CustomSpinner /> : <UsersTable />}
        </>
    )
}

export default Users
