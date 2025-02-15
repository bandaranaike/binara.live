import axios from "@/lib/axios";

export async function GET(request: Request) {
    try {
        // Parse the URL
        if (!request.url) {
            return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
        }

        const url = new URL(request.url, "http://localhost"); // Ensure base URL is provided
        const doctorType = url.searchParams.get("type");

        if (!doctorType) {
            return new Response(JSON.stringify({ error: "Type parameter is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Ensure the request is absolute if using a backend API
        const apiUrl = `/bookings/doctors/list?doctor_type=${doctorType}`;

        const response = await axios.get(apiUrl);

        return new Response(JSON.stringify(response.data), { // Convert data to JSON string
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ error: "Error fetching data" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
