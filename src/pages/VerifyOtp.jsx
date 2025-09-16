import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
function VerifyOtp() {
    const length = 6;
    const [values, setValues] = useState(Array(length).fill(""));
    const [errors, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef([]);
    const navigate = useNavigate();
    const { mobile } = useParams();
    const location = useLocation();
    const otp = location.state?.otp;
    //focus first input on mount

    useEffect(() => {
        inputRef.current[0]?.focus();
        alert(otp);
    }, [])


    const handleChange = (index, e) => {
        const raw = e.target.value;

        // accept only digits, take last char if user types multiple
        const digit = raw.replace(/\D/g, "").slice(-1) || "";
        if (!/^\d?$/.test(digit) && digit !== "") return;

        setValues((prev) => {
            const next = [...prev];
            next[index] = digit;
            return next;
        });

        //focusing next input element
        if (digit && index < length - 1) {
            inputRef.current[index + 1]?.focus();
        }

        setError([]);
    }

    const handleKeyDown = (index, e) => {
        const key = e.key;

        if (key === 'Backspace') {
            e.preventDefault();

            setValues((prev) => {
                const next = [...prev];
                if (next[index]) {
                    next[index] = "";
                    return next;
                }
                // move back if current is empty means next[index] is empty

                if (index > 0) {
                    inputRef.current[index - 1]?.focus();
                    next[index - 1] = "";
                    return next;
                } else {
                    //means first element pr aakr backspace dba rhe he
                    inputRef.current[index]?.focus();
                    return next;
                }

            });

        } else if (key === "ArrowLeft" && index > 0) {
            e.preventDefault();
            inputRef.current[index - 1]?.focus();
        } else if (key === "ArrowRight" && index < length - 1) {
            e.preventDefault();
            inputRef.current[index + 1]?.focus();
        } else if (key === "Enter") {
            e.preventDefault();
            submitOtp();
        }
    };


    const handlePaste = (e) => {
        e.preventDefault();

        const pasted = (e.clipboardData || window.clipboardData).getData("text");
        const digits = pasted.replace(/\D/g, "").slice(0, length).split("");

        if (digits.length === 0) return;

        setValues((prev) => {
            const next = [...prev];

            for (let i = 0; i < length; i++) {
                next[i] = digits[i] || "";
            }
            return next;
        });
        // focus next empty or last
        const firstEmpty = digits.length >= length ? length - 1 : digits.length;
        inputRef.current[firstEmpty]?.focus();
        setError([]);

    }

    const otpString = values?.join("") || "";

    const submitOtp = async () => {
        if (otpString.length !== length) {
            setError([`please enter all ${length} digits.`])
            return;
        }
        setError([]);
        try {
            setLoading(true);
            const data = {
                mobile: mobile.toString(),
                otp: otpString
            }
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/verify-otp`, data)

            if (response.status === 201) {
                console.log(response.data)
                if (response.data.captainExist) {
                    localStorage.setItem("token", response.data.token)
                    navigate('/captain-home');
                } else {
                    navigate(`/captain-register/${mobile}/${otpString}`)
                }
            }


        } catch (err) {
            console.log(err.response.data.errors || ["Verification failed. Try again."])
            setError(err.response.data.errors || ["Verification failed. Try again."])
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen flex flex-col bg-[#0b1020] text-white">
            {/* Top area */}
            <div className="px-5 pt-8 pb-6  max-w-3xl w-full mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">

                        <div>
                            <img className='w-[150px] mb-1' src="/logo.png" alt="" />

                            <p className="text-sm text-gray-300">Driver / User verification</p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <h2 className="text-2xl font-semibold">Enter the 6-digit code</h2>
                    <p className="mt-2 text-sm text-gray-300 ">We sent a one-time code to your mobile number</p>
                </div>
            </div>

            {/* OTP inputs */}
            <main className=" flex items-center justify-center px-5">
                <div className="w-full max-w-xl">
                    <div
                        className=" bg-whit p-6 rounded-2xl shadow-md"
                        onPaste={handlePaste}
                    >
                        <div className="flex  justify-center gap-3">
                            {Array.from({ length }).map((_, i) => (
                                <input
                                    key={i}
                                    ref={(el) => (inputRef.current[i] = el)}
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={1}
                                    value={values[i]}
                                    onChange={(e) => handleChange(i, e)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    aria-label={`Digit ${i + 1}`}
                                    className="w-12 h-14 md:w-14 md:h-16 text-center font-semibold text-lg md:text-xl rounded-lg bg-[#c19f19] border border-[#1f2937] focus:border-yellow-400 focus:outline-none"
                                />
                            ))}
                        </div>

                        {/* Show backend validation errors */}
                        {(errors.length > 0) && (
                            <ul className="text-red-600 mb-2 text-center mt-3">
                                {errors.map((err, index) => (
                                    <li key={index}>{typeof err === "string" ? err : err.msg}</li>
                                ))}
                            </ul>
                        )}

                        <p className="mt-10   text-sm text-gray-400 text-center">
                            Didn’t receive a code ?{" "}
                            <button
                                type="button"
                                className="underline text-gray-100"
                                onClick={() => alert("Trigger resend code flow")}
                            >
                                Resend
                            </button>
                        </p>
                    </div>
                </div>
            </main>

            {/* Submit fixed at bottom */}
            <div className="fixed left-0 right-0 bottom-3 p-4 bg-gradient-to-t from-[#071025] to-transparent">
                <div className="max-w-3xl mx-auto px-2">
                    <button
                        onClick={submitOtp}
                        disabled={loading || otpString.length !== length}
                        className={`w-full py-3 rounded-xl text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed ${otpString.length === length
                            ? "bg-[#d5b607]  hover:bg-[#b89d08] text-black font-semibold0"
                            : "bg-gray-700"
                            }`}
                        aria-disabled={loading || otpString.length !== length}
                    >
                        {loading ? "Verifying…" : "Submit"}
                    </button>
                </div>
            </div>
        </div>

    )
}

export default VerifyOtp
