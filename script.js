document.getElementById("show-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const show1 = document.getElementById("show1").value;
  const reason = document.getElementById("reason").value;
  const recommendationsList = document.getElementById("recommendations");
  recommendationsList.innerHTML = "";

  const apiUrl = "https://tmdb-movies-and-tv-shows-api-by-apirobots.p.rapidapi.com/v1/tmdb/search"; // Correct API endpoint
  const apiKey = "cc8da86bfc4354139fcd7c62ca808e10"; // Replace with your actual RapidAPI key

  // Display a loading message
  const loadingMessage = document.createElement("li");
  loadingMessage.textContent = "Loading recommendations...";
  recommendationsList.appendChild(loadingMessage);

  try {
    // Fetch recommendations using the API
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "tmdb-movies-and-tv-shows-api-by-apirobots.p.rapidapi.com"
      },
      body: JSON.stringify({
        query: show1
      })
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recommendations. Please try again.");
    }

    const data = await response.json();
    const recommendations = data.results;

    // Clear loading message
    recommendationsList.innerHTML = "";

    if (recommendations.length === 0) {
      const noResultsMessage = document.createElement("li");
      noResultsMessage.textContent = "No recommendations found.";
      recommendationsList.appendChild(noResultsMessage);
    } else {
      // Display each recommendation with a reason
      recommendations.forEach((show) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${show.title} - You might like this because: ${reason}`;
        recommendationsList.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    recommendationsList.innerHTML = `<li>Error fetching recommendations. Try again later.</li>`;
  }
});
