import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';

interface OTPInputProps {
    timer?: number; // Optional prop for countdown timer (default: 30 seconds)
    emailOrPhone: string; // Prop for email or phone number (e.g., "e****@**.com" or "+1******1234")
    title?: string; // Optional prop for the title (default: "Please Enter the OTP")
    otpLength?: number; // Optional prop to customize OTP length (default: 6)
    inputClassName?: string; // Optional prop to customize input class names (default: "w-12 h-12 text-center text-xl border border-gray-200 rounded-lg")
    resendLabel?: string; // Optional prop for resend button label (default: "Resend OTP")
    resendDisabledLabel?: string; // Optional prop for label when resend is disabled (default: "Resend OTP in {countdown} seconds")
    resendEnabled?: boolean; // Optional prop for resend API endpoint
    onOtpComplete?: (otp: string) => void; // Optional prop for callback when OTP is complete
    resendButtonClassName?: string; //Optional prop for resend button class names
    resendDisabledClassName?: string; //Optional prop for resend disabled text class names
    titleClassName?: string; // Optional prop for title class names
    emailOrPhoneClassName?: string; // Optional prop for email/phone class names
    containerClassName?: string; // Optional prop for container class names
    onVerify?: () => void; // Optional prop for container class names
    onResend?: () => void; // Optional prop for container class names
}

const OTPInput: React.FC<OTPInputProps> = ({
                                               timer = 30,
                                               emailOrPhone,
                                               title = 'Please Enter the OTP',
                                               otpLength = 6,
                                               inputClassName = 'w-12 h-12 text-center text-xl border border-gray-200 rounded-lg',
                                               resendLabel = 'Resend',
                                               resendDisabledLabel = 'Resend OTP in {countdown} seconds',
                                               resendEnabled = false,
                                               onOtpComplete,
                                               resendButtonClassName = "hover:text-blue-600",
                                               resendDisabledClassName = "text-gray-500",
                                               titleClassName = "text-xl mb-2 font-semibold",
                                               emailOrPhoneClassName = "italic",
                                               containerClassName = "",
                                               onVerify,
                                               onResend
                                           }) => {
    const [otp, setOtp] = useState<string[]>(new Array(otpLength).fill(''));
    const [countdown, setCountdown] = useState<number>(timer);
    const [canResend, setCanResend] = useState<boolean>(resendEnabled);
    const [error, setError] = useState("");
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [loading, setLoading] = useState<boolean | undefined>()

    useEffect(() => {
        setCountdown(timer);
        setCanResend(false)
    }, []);

    useEffect(() => {
        if (otp.every(item => item !== '')) {
            if (onOtpComplete) {
                onOtpComplete(otp.join(''));
            }
        }
    }, [otp, onOtpComplete]);

    const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/\d/.test(value) || (event.nativeEvent instanceof InputEvent && event.nativeEvent.inputType === "deleteContentBackward")) {
            const newOtp = [...otp];
            if (event.nativeEvent instanceof InputEvent && event.nativeEvent.inputType === "deleteContentBackward") {
                if (value === '') {
                    newOtp[index] = '';
                    setOtp(newOtp);
                    if (index > 0) {
                        inputRefs.current[index - 1]?.focus();
                    }
                } else {
                    newOtp[index] = '';
                    setOtp(newOtp);
                }
            } else {
                newOtp[index] = value;
                setOtp(newOtp);

                if (index < otpLength - 1 && value !== '') {
                    inputRefs.current[index + 1]?.focus();
                }
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, otpLength);
        if (new RegExp(`^\\d{${otpLength}}$`).test(pastedData)) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);
            inputRefs.current[otpLength - 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (event.key === 'ArrowRight' && index < otpLength - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleResend = () => {
        if (resendEnabled && canResend) {
            setCountdown(timer);
            setCanResend(false);
            try {
                if (onResend) onResend()
            } catch (error) {
                console.error('Error resending OTP:', error);
            }
        }
    };

    const handleSubmit = () => {
        setLoading(true)
        try {
            if (onVerify) onVerify()
        } catch (e) {
            console.error('Error resending OTP:', e);
            setError('Error resending OTP')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (countdown > 0) {
            const interval = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    return (
        <div className={`${containerClassName}`}>
            {title && <h3 className={titleClassName}>{title}</h3>}
            <p className={`text-sm text-gray-500 mb-4`}>
                We have sent an OTP to <span className={emailOrPhoneClassName}>{emailOrPhone}</span>. Please check your email or phone and enter it here.
            </p>
            <div className="flex space-x-2">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e)}
                        onPaste={handlePaste}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(el) => {
                            if (el) inputRefs.current[index] = el;
                        }}
                        className={inputClassName}
                    />
                ))}
            </div>
            <div className="flex justify-between">
                <div className="">
                    {resendEnabled && <div className="mt-2 text-sm text-gray-500">
                        {canResend ? (
                            <button onClick={handleResend} className={resendButtonClassName}>
                                {resendLabel}
                            </button>
                        ) : (
                            <span className={resendDisabledClassName}>{resendDisabledLabel.replace('{countdown}', countdown.toString())}</span>
                        )}
                    </div>}
                </div>
                <div>
                    <button
                        className={`border border-gray-200 shadow-sm hover:text-purple-600 hover:bg-purple-50 text-sm font-semibold text-gray-600 rounded-lg px-4 py-2 flex gap-2`}
                        disabled={loading}
                        onClick={handleSubmit}>
                        {loading && <div role="status" className="-ml-2">
                            <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor" />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>}

                        {loading ? 'Please wait' : 'Verify'}
                    </button>
                </div>
            </div>

            {error && <div className="text-red-500 mb-3 text-sm">{error}</div>}
        </div>
    );
};

export default OTPInput;