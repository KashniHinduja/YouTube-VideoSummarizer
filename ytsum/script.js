youtubeLink.addEventListener("input", function() {
    // Adjust the width based on the content
    const youtubeLink = document.getElementById("youtubeLink");
    youtubeLink.style.width = "auto";
    youtubeLink.style.width = (youtubeLink.scrollWidth > youtubeLink.clientWidth) ? "70%" : "30%";
});

document.getElementById("summarise").addEventListener("click", function() {
    const url = document.getElementById("youtubeLink").value;
    const outputElement = document.getElementById("output");

    if (url.trim() === "") {
        outputElement.style.display = "block";
        outputElement.innerHTML = "Please enter a valid YouTube link.";
        return;
    }

    document.getElementById("summarise").disabled = true;
    document.getElementById("summarise").innerHTML = "Summarising...";

    fetch(`http://127.0.0.1:5000/summary?url=${encodeURIComponent(url)}`)
        .then(response => response.text())
        .then(summary => {
            outputElement.style.display = "block";
            outputElement.innerHTML = summary;
            document.getElementById("summarise").disabled = false;
            document.getElementById("summarise").innerHTML = "Summarise";
        })
        .catch(error => {
            console.error("Error:", error);
            outputElement.innerHTML = "An error occurred while summarising.";
            document.getElementById("summarise").disabled = false;
            document.getElementById("summarise").innerHTML = "Summarise";
        });
});
