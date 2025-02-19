// Version 1: TMDB Recommendations with Modern Aesthetic
document.getElementById("show-form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent form submission from refreshing the page

  const show1 = document.getElementById("show1").value; // Input TV show
  const apiKey = "702d33aaedaabc0615108d23f74fb353"; // Replace with your TMDB API key

  // Clear previous results
  const recommendationsContainer = document.getElementById("recommendations-container");
  recommendationsContainer.innerHTML = "";
  
  // Show a loading animation (if you have one in your UI)
  const loadingMessage = document.createElement("p");
  loadingMessage.textContent = "Loading recommendations...";
  recommendationsContainer.appendChild(loadingMessage);

  try {
    // Step 1: Search for the TV show by name to get its ID
    const searchResponse = await fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(show1)}&api_key=${apiKey}`);
    if (!searchResponse.ok) throw new Error(`Failed to search show: ${searchResponse.statusText}`);

    const searchData = await searchResponse.json();
    if (!searchData.results || searchData.results.length === 0) {
      throw new Error(`No TV show found for "${show1}".`);
    }

    const showId = searchData.results[0].id; // Get the first show’s ID

    // Step 2: Fetch recommendations for the show
    const recommendationResponse = await fetch(`https://api.themoviedb.org/3/tv/${showId}/recommendations?api_key=${apiKey}`);
    if (!recommendationResponse.ok) throw new Error(`Failed to fetch recommendations: ${recommendationResponse.statusText}`);

    const recommendationData = await recommendationResponse.json();
    if (!recommendationData.results || recommendationData.results.length === 0) {
      recommendationsContainer.innerHTML = "<p>No recommendations found.</p>";
      return;
    }

    // Step 3: Remove loading message before populating recommendations
    recommendationsContainer.innerHTML = "";

    // Step 4: Create cards for each recommendation
    recommendationData.results.forEach((show) => {
      const showCard = document.createElement("div");
      showCard.className = "recommendation-card"; // Ensure your CSS handles this class

      // Show Name
      const showName = document.createElement("h3");
      showName.textContent = show.name;

      // Description (if available)
      const showDescription = document.createElement("p");
      showDescription.textContent = show.overview ? show.overview : "No description available.";

      // Append elements to the card
      showCard.appendChild(showName);
      showCard.appendChild(showDescription);
      recommendationsContainer.appendChild(showCard);
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    recommendationsContainer.innerHTML = `<p>${error.message}</p>`;
  }
});
