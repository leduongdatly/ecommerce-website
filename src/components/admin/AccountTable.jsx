import React from 'react'
import { useDispatch } from 'react-redux'
import { updateRoleRequest } from '../../redux/actions/UserAction';

const AccountTable = ({ result, index }) => {

    const dispatch = useDispatch();

    const onHandleRole = (id, result) => {
        const newField = {
            ...result,
            role: result.role === "customer" ? "admin" : "customer"
        }
        dispatch(updateRoleRequest(id, newField))
    }

    return (
        < tr >
            <td>{index + 1}</td>
            <td>{result.email}</td>
            <td onClick={() => onHandleRole(result.id, result)} style={{cursor: "pointer", color: result.role === "admin" ? "red" : "green"}}>{result.role}</td>
        </tr >
    )
}

export default AccountTable