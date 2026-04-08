export async function fetchISSLocation() {
    const url = 'https://api.wheretheiss.at/v1/satellites/25544';
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return {
            lat: parseFloat(data.latitude),
            lon: parseFloat(data.longitude)
        };
    }
    catch(error) {
        console.error("Could not fetch ISS data:", error);
    }
}