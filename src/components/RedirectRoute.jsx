import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Admin from "../pages/admin/Admin";
import User from "../pages/user/User";

const RedirectRoute = () => {

    const role = useSelector((state) => state.users.role);

    return (
        role && role === "admin" ? <Admin /> : <User />
    )
}

export default RedirectRoute