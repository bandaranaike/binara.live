import {NextResponse} from 'next/server';
import axios from "@/lib/axios";

export async function POST(request: Request) {
    try {
        // Extract the request body
        const body = await request.json();

        // Forward the request to the critical API
        axios.post('/bookings/make-appointment', body).then(response => {
            return NextResponse.json(response.data);
        }).catch(error => {
            return NextResponse.json({error: error.response.data.message}, {status: error.response.status});
        });

    } catch (error) {
        console.error('Error in proxy route:', error);
        return NextResponse.json({error: 'Internal Server Error', e: error}, {status: 500});
    }
}