import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../context/UserAuthContext";
import { addUserRequest, getUserByIdRequest } from "../redux/actions/UserAction";

const schema = yup.object().shape({
    email: yup.string().required("Vui lòng điền email!").email("Email không hợp lệ!"),
    password: yup.string().required("Vui lòng điền mật khẩu!").min(6, "Mật khẩu tối thiểu 6 ký tự!").max(16, "Mật khẩu tối đa 16 ký tự!")
})

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const { signup } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onRegister = async (data) => {
        if (error === "") {
            try {
                setIsDisabled(true)
                await signup(data.email, data.password).then((result) => {
                    const data = {
                        email: result.user.email,
                        role: "customer"
                    }
                    dispatch(addUserRequest(result.user.uid, data));
                    dispatch(getUserByIdRequest(result.user.uid));
                    navigate("/");
                }).catch(err => {
                    switch (err.code) {
                        case "auth/email-already-in-use":
                            setError("Email này đã được sử dụng");
                            break;
                    }
                });
            } catch {
                setError("Có lỗi trong quá trình đăng ký");
            }
            setIsDisabled(false);
        }
    }

    const onShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const onResetErr = () => {
        setError("");
    }

    return (
        <div className="register">
            <div className="grid wide">
                <div className="row">
                    <div className="col l-4 l-o-4 m-12 c-12">
                        <div className="register__form">
                            <form className="register__form-form" onSubmit={handleSubmit(onRegister)}>
                                <h1 className="register__form-form-title">Đăng ký</h1>
                                {error && <div className="register__form-form-error">{error}</div>}
                                <div className="register__form-form-input">
                                    <label>Email</label>
                                    <input type="text" placeholder="Email" {...register("email")} onClick={onResetErr} />
                                    <span className="register__form-form-input-error">{errors.email?.message}</span>
                                </div>
                                <div className="register__form-form-input">
                                    <label>Mật khẩu</label>
                                    <div className="register__form-form-input-input">
                                        <input type={showPassword ? "text" : "password"} placeholder="Mật khẩu" {...register("password")} onClick={onResetErr} />
                                        <div className="register__form-form-input-input-show" onClick={onShowPassword}>
                                            <i className="far fa-eye"></i>
                                        </div>
                                    </div>
                                    <span className="register__form-form-input-error">{errors.password?.message}</span>
                                </div>
                                <div className="register__form-form-btn">
                                    <button className={isDisabled ? "btn btn--disabled" : "btn btn--primary"}>Đăng ký</button>
                                </div>
                                <div className="register__form-form-option">
                                    Đã có tài khoản?
                                    <Link to="/login">Đăng nhập</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register