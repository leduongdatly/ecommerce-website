import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AccountTable from '../../components/admin/AccountTable'
import { getAllUserRequest } from '../../redux/actions/UserAction'

const Account = () => {
    
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.users.users);

    useEffect(() => {
        dispatch(getAllUserRequest());
    }, []);

    return (
        <div className="col l-12 m-12">
            <div className="account commom">
                <h3 className="commom__title">Quản lý tài khoản</h3>
                <div className="commom__btn">
                    <Link to="/account-manage/add" className="btn btn--primary">Thêm mới</Link>
                </div>
                <div className="account__table">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Email</th>
                                <th>Quyền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                accounts.length > 0 && accounts.map((result, index) => {
                                    return <AccountTable key={index} result={result} index={index} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Account