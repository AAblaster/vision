document.getElementById("show-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const showName = document.getElementById("show1").value;
  const reason = document.getElementById("reason").value;
  const apiKey = "702d33aaedaabc0615108d23f74fb353"; // Replace with your TMDB API Key
  const recommendationsContainer = document.getElementById("recommendations-container");
  const svgContainer = document.getElementById("svg-container");

  recommendationsContainer.innerHTML = "";
  svgContainer.innerHTML = "";

  try {
    // Step 1: Search for main show
    const searchResponse = await fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(showName)}&api_key=${apiKey}`);
    const searchData = await searchResponse.json();

    if (searchData.results.length === 0) {
      throw new Error(`No TV show found for "${showName}".`);
    }

    const mainShow = searchData.results[0];
    const mainShowDiv = document.createElement("div");
    mainShowDiv.id = "main-show";
    mainShowDiv.textContent = `${mainShow.name} (${reason})`;
    recommendationsContainer.appendChild(mainShowDiv);

    // Step 2: Fetch recommendations
    const recommendationsResponse = await fetch(`https://api.themoviedb.org/3/tv/${mainShow.id}/recommendations?api_key=${apiKey}`);
    const recommendationsData = await recommendationsResponse.json();

    if (recommendationsData.results.length === 0) {
      throw new Error(`No recommendations found for "${mainShow.name}".`);
    }

    // Step 3: Add recommendations with SVG branches
    recommendationsData.results.slice(0, 5).forEach((rec, index) => {
      // Recommendation card
      const recDiv = document.createElement("div");
      recDiv.className = "recommendation-show";
      recDiv.style.top = `${50 + index * 70}px`;
      recDiv.style.left = `${300}px`;
      recDiv.textContent = `${rec.name} (Reason: Based on ${mainShow.name})`;

      // Create SVG line
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("class", "recommendation-branch");
      line.setAttribute("x1", 200);
      line.setAttribute("y1", 250);
      line.setAttribute("x2", 300);
      line.setAttribute("y2", 50 + index * 70 + 20);

      // Append elements
      svgContainer.appendChild(line);
      recommendationsContainer.appendChild(recDiv);
    });
  } catch (error) {
    console.error(error.message);
    recommendationsContainer.innerHTML = `<p>${error.message}</p>`;
  }
});
