export async function fetchAsteroids() {
    const currentDate = new Date();
    var oneWeekAgo = currentDate;
    oneWeekAgo.setDate(oneWeekAgo.getDate()-7);
    const START_DATE = oneWeekAgo.toISOString().split('T');
    const [END_DATE] = currentDate.toISOString().split('T');
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    //const API_KEY = 'DEMO_KEY';
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${START_DATE}&end_date=${END_DATE}&api_key=${API_KEY}`

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.error("Could not fetch astroid data:", error);
    }
}