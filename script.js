document.getElementById("show-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const show1 = document.getElementById("show1").value;
  const show2 = document.getElementById("show2").value;

  // Clear previous recommendations
  const recommendationsList = document.getElementById("recommendations");
  recommendationsList.innerHTML = "";

  try {
    // API Call
    const response = await fetch("https://tmdb-movies-and-tv-shows-api-by-apirobots.p.rapidapi.com/v1/tmdb/random", {
      method: "GET", // Using GET because the image shows a GET request
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "3cc136d9a1msh29285498c6184d0p1b096fjsn793eaa8b38ba", // Your RapidAPI key
        "X-RapidAPI-Host": "tmdb-movies-and-tv-shows-api-by-apirobots.p.rapidapi.com"
      },
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
