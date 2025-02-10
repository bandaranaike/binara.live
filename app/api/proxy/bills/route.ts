import {NextResponse} from 'next/server';
import parsePhoneNumber from 'libphonenumber-js'
import axios from "@/lib/axios";

export async function POST(request: Request) {
    try {
        // Extract the request body
        const body = await request.json();

        // bill_amount	2000
        // bill_id	0
        // channeling_charge	500
        // channeling_fee	2000
        // doctor_id	10
        // is_booking	false
        // patient_id	2
        // payment_type	"cash"
        // service_type	"specialist"
        // system_amount	500


        const phoneNumber = parsePhoneNumber(body.telephone, 'LK');


        // Forward the request to the critical API
        const response = await axios.post('bills ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any required authorization headers here
                Authorization: `Bearer ${process.env.API_TOKEN}`, // Use environment variables for sensitive data
            },
            body: JSON.stringify(body),
        });

        // Handle errors from the critical API
        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({error: errorData}, {status: response.status});
        }

        // Return the response to the client
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in proxy route:', error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}