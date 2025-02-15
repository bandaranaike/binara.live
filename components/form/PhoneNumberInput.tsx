import React, {useState, ChangeEvent} from "react";

import {Input} from "@headlessui/react";
import debounce from "debounce";
import parsePhoneNumber, {E164Number} from "libphonenumber-js";

interface PhoneNUmberInputProps {
    onValidPhoneNumber: (phoneNumber: E164Number) => void;
    isPhoneRequired?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNUmberInputProps> = ({onValidPhoneNumber, isPhoneRequired = false}) => {

    const [phoneError, setPhoneError] = useState<string | undefined>()
    const handlePhoneChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
        const phone = e.target.value;
        if (isPhoneRequired && !phone) {
            setPhoneError("Phone number is required");
        } else {
            const formatedPhone = parsePhoneNumber(phone, 'LK');
            if (!formatedPhone || (formatedPhone && !formatedPhone.isValid())) {
                setPhoneError("Phone number is invalid");
            } else {
                setPhoneError("");
                onValidPhoneNumber(formatedPhone?.number);
            }
        }
    }, 300)

    return (
        <div>
            <Input
                className="mb-3 w-full border border-gray-300 py-2 px-4 rounded-lg"
                name="phone"
                placeholder="Your phone number"
                required={isPhoneRequired}
                onChange={handlePhoneChange}/>

            {phoneError && <div className="text-red-500 text-sm mb-3 -mt-2 pl-1">{phoneError}</div>}

        </div>
    );
}
export default PhoneNumberInput;