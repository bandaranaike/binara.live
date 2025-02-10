import axios from "@/lib/axios";
// import axios from "axios";
import {NextApiRequest} from 'next'; // If using Next.js

export async function GET(request: NextApiRequest) { // Type the request
    try {
        const url = request.url ? new URL(request.url) : "";
        const doctorType = url ? url.searchParams.get('type') as string : null; // Use searchParams

        if (!doctorType) {
            return new Response("Type parameter is required", {status: 400});
        }

        console.log("1111")

        const response = await axios.get(`/bookings/doctors/list?doctor_type=${doctorType}`);

        console.log("33333");

        return new Response(response.data, {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });

    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({message: "Error fetching data"}), { // Return an error response
            status: 500,
            headers: {'Content-Type': 'application/json'}
        });
    }
}