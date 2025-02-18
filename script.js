document.getElementById("show-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const show1 = document.getElementById("show1").value;
  const show2 = document.getElementById("show2").value;

  // Clear previous recommendations
  const recommendationsList = document.getElementById("recommendations");
  recommendationsList.innerHTML = "";

  try {
    // API Call to RapidAPI
    const response = await fetch("https://tmdapi.p.rapidapi.com/tv/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY", // Replace with your key
      },
      body: JSON.stringify({ show1, show2 }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recommendations");
    }

    const data = await response.json();
    const recommendations = data.recommendations;

    if (recommendations.length === 0) {
      recommendationsList.innerHTML = "<li>No recommendations found.</li>";
      return;
    }

    // Display recommendations
    recommendations.forEach((show) => {
      const listItem = document.createElement("li");
      listItem.textContent = show.name;
      recommendationsList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error:", error);
    recommendationsList.innerHTML = "<li>Error fetching recommendations. Try again later.</li>";
  }
});
