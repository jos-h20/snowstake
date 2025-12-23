export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // If the browser asks for /api/weather, we fetch it directly from Mt. Bachelor
    if (url.pathname === "/api/weather") {
      const response = await fetch("https://api.mtbachelor.com/api/v1/dor/24-hour-weather");
      
      // We pass the data back with headers that keep the browser happy
      return new Response(response.body, {
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*" 
        }
      });
    }

    // For everything else, serve the static index.html or images
    return env.ASSETS.fetch(request);
  },
};
