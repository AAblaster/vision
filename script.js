document.getElementById("show-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const show1 = document.getElementById("show1").value;
  const apiKey = "cc8da86bfc4354139fcd7c62ca808e10"; // Replace with your TMDB API Key

  const recommendationsList = document.getElementById("recommendations");
  recommendationsList.innerHTML = "";

  try {
    // Step 1: Search for the first show to get its ID
    const searchResponse = await fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(show1)}&api_key=${apiKey}`);
    const searchData = await searchResponse.json();

    if (searchData.results.length === 0) {
      throw new Error(`No TV show found for "${show1}".`);
    }

    const showId = searchData.results[0].id;

    // Step 2: Get recommendations using the show ID
    const recommendationResponse = await fetch(`https://api.themoviedb.org/3/tv/${showId}/recommendations?api_key=${apiKey}`);
    const recommendationData = await recommendationResponse.json();

    if (recommendationData.results.length === 0) {
      recommendationsList.innerHTML = "<li>No recommendations found.</li>";
      return;
    }

    recommendationData.results.forEach((show) => {
      const listItem = document.createElement("li");
      listItem.textContent = show.name;
      recommendationsList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error:", error);
    recommendationsList.innerHTML = `<li>${error.message}</li>`;
  }
});
