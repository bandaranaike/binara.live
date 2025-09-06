import {NextResponse} from 'next/server';
import axios from "@/lib/axios";

export const metadata = {
    title: "Contact us - " + process.env.NEXT_PUBLIC_APP_TITLE,
    description: "At Binara Medical Centre, we are dedicated to providing high-quality medical care tailored to your needs",
};

export async function POST(request: Request) {
    try {
        // Extract the request body
        const body = await request.json();

        // Forward the request to the critical API
        const response = await axios.post('/contacts', body);

        // Handle errors from the critical API
        if (response.status !== 200) {
            const errorData = await response.data;
            return NextResponse.json({error: errorData}, {status: response.status});
        }

        // Return the response to the client
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error in proxy route:', error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}