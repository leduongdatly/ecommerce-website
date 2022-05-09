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
    password: yup.string().required("Vui lòng điền mật khẩu!").min(4, "Mật khẩu tối thiểu 4 ký tự!").max(16, "Mật khẩu tối đa 16 ký tự!")
})

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const { signin, googleSignin } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onLogin = async (data) => {
        if (error === "") {
            try {
                setIsDisabled(true)
                await signin(data.email, data.password)
                    .then((result) => {
                        dispatch(getUserByIdRequest(result.user.uid))
                    })
                    .catch(err => {
                        switch (err.code) {
                            case "auth/user-not-found":
                                setError("Email này chưa được đăng ký");
                                break;
                            case "auth/wrong-password":
                                setError("Mật khẩu không chính xác");
                                break;
                        }
                    });
            } catch {
                setError("Có lỗi trong quá trình đăng nhập")
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

    const onGoogleSignIn = async () => {
        try {
            await googleSignin()
                .then((result) => {
                    const data = {
                        email: result.user.email,
                        role: "customer"
                    }
                    dispatch(addUserRequest(result.user.uid, data));
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch {
            setError("Có lỗi trong quá trình đăng nhập")
        }
    }

    return (
        <div className="login">
            <div className="grid wide">
                <div className="row">
                    <div className="col l-4 l-o-4 m-12 c-12">
                        <div className="login__form">
                            <form className="login__form-form" onSubmit={handleSubmit(onLogin)}>
                                <h1 className="login__form-form-title">Đăng nhập</h1>
                                {error && <div className="register__form-form-error">{error}</div>}
                                <div className="login__form-form-input">
                                    <label>Email</label>
                                    <input type="email" placeholder="Email" {...register("email")} onClick={onResetErr} />
                                    <span className="login__form-form-input-error">{errors.email?.message}</span>
                                </div>
                                <div className="login__form-form-input">
                                    <label>Mật khẩu</label>
                                    <div className="register__form-form-input-input">
                                        <input type={showPassword ? "text" : "password"} placeholder="Mật khẩu" {...register("password")} onClick={onResetErr} />
                                        <div className="register__form-form-input-input-show" onClick={onShowPassword}>
                                            <i className="far fa-eye"></i>
                                        </div>
                                    </div>
                                    <span className="login__form-form-input-error">{errors.password?.message}</span>
                                </div>
                                <div className="login__form-form-btn">
                                    <button className={isDisabled ? "btn btn--disabled" : "btn btn--primary"}>Đăng nhập</button>
                                </div>
                                <div className="login__form-form-option">
                                    HOẶC
                                </div>
                            </form>
                            <div className="login__form-social">
                                <div className="row">
                                    <div className="col l-12 m-12 c-12">
                                        <div className="login__form-social-btn">
                                            <button className="btn login__form-social-btn-google" onClick={onGoogleSignIn}>
                                                <i className="fa-brands fa-google"></i>
                                                <span>Google</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="login__form-forgot">
                                <Link to="/reset">Quên mật khẩu</Link>
                            </div>
                            <div className="login__form-new">
                                Bạn mới đến lần đầu? <Link to="/register">Đăng ký</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login