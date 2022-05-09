import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/UserAuthContext";

const schema = yup.object().shape({
    email: yup.string().required("Email không hợp lệ!").email("Email không hợp lệ!"),
})

const Reset = () => {

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const { resetPassword } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onReset = async (data) => {
        if (error === "") {
            try {
                setIsDisabled(true);
                setMessage("");
                await resetPassword(data.email).then(() => {
                    setMessage("Thành công. Mời bạn check lại mail")
                }).catch(err => {
                    switch (err.code) {
                        case "auth/user-not-found":
                            setError("Email chưa được đăng ký");
                            break;
                    }
                });
            } catch {
                setError("Có lỗi trong quá trình resrt mật khẩu")
            }
            setIsDisabled(false);
        }
    }

    const onResetErr = () => {
        setError("");
    }

    return (
        <div className="reset">
            <div className="grid wide">
                <div className="row">
                    <div className="col l-4 l-o-4 m-12 c-12">
                        <div className="reset__form">
                            <form className="reset__form-form" onSubmit={handleSubmit(onReset)}>
                                <h1 className="reset__form-form-title">Đặt lại mật khẩu</h1>
                                {error && <div className="reset__form-form-error">{error}</div>}
                                {message && <div className="reset__form-form-message">{message}</div>}
                                <div className="reset__form-form-input">
                                    <label>Email</label>
                                    <input type="text" placeholder="Email" {...register("email")} onClick={handleSubmit(onResetErr)} />
                                    <span className="reset__form-form-input-error">{errors.email?.message}</span>
                                </div>
                                <div className="reset__form-form-btn">
                                    <button className={isDisabled ? "btn btn--disabled" : "btn btn--primary"}>Tiếp theo</button>
                                    <Link to="/login" className="btn btn--primary">Tiếp tục đăng nhập</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reset