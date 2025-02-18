// Debugging snippet: Test API connectivity on page load
fetch("https://tmdb-movies-and-tv-shows-api-by-apirobots.p.rapidapi.com/v1/tmdb/random", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY", // Replace with your actual key
  },
  body: JSON.stringify({ show1: "Breaking Bad", show2: "Stranger Things" }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Debugging Error: Failed to fetch data. Status: " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Debugging Data:", data); // Log the data for testing
  })
  .catch((error) => {
    console.error("Debugging Error:", error);
  });

// Main form submission handler
document.getElementById("show-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const show1 = document.getElementById("show1").value;
  const show2 = document.getElementById("show2").value;

  // Clear previous recommendations
  const recommendationsList = document.getElementById("recommendations");
  recommendationsList.innerHTML = "";

  try {
    // API Call
    const response = await fetch("https://tmdapi.p.rapidapi.com/tv/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "3cc136d9a1msh29285498c6184d0p1b096fjsn793eaa8b38ba", // Replace with your actual key
      },
      body: JSON.stringify({ show1, show2 }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${errorText}`);
    }

    const data = await response.json();
    console.log("Form Submission Data:", data); // Log data for debugging

    const recommendations = data.recommendations || [];

    if (recommendations.length === 0) {
      recommendationsList.innerHTML = "<li>No recommendations found.</li>";
      return;
    }

    // Display each recommended show
    recommendations.forEach((show) => {
      const listItem = document.createElement("li");
      listItem.textContent = show.name;
      recommendationsList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error:", error);
    recommendationsList.innerHTML = `<li>${error.message}</li>`;
  }
});
