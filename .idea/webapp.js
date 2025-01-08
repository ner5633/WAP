const video = document.querySelector("video");
navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error("Kamera konnte nicht geöffnet werden: ", error);
    });


if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        position => {
            const {latitude, longitude} = position.coords;
            console.log(`Standort: ${latitude}, ${longitude}`);
            // Prüfen: Outdoor oder Indoor basierend auf Position oder Signalstärke
        },
        error => {
            console.error("Standort konnte nicht bestimmt werden: ", error);
        }
    );
} else {
    console.error("Geolocation nicht unterstützt.");
}


const informationOverlay = document.createElement("div");
informationOverlay.textContent = "Zusätzliche Informationen hier anzeigen";
informationOverlay.style.position = "absolute";
informationOverlay.style.top = "10px";
informationOverlay.style.left = "10px";
informationOverlay.style.color = "white";
document.body.appendChild(informationOverlay);


fetch("https://example.com/getInfo", {
    method: "POST",
    body: JSON.stringify({latitude, longitude}),
    headers: {
        "Content-Type": "application/json"
    }
})
    .then(response => response.json())
    .then(data => {
        console.log("Daten vom Server:", data);
    })
    .catch(error => {
        console.error("Fehler bei der Server-Kommunikation:", error);
    });

    function uploadFile() {
    const file = document.getElementById("fileUpload").files[0];
    const formData = new FormData();
    formData.append("file", file);

    fetch("https://example.com/upload", {
    method: "POST",
    body: formData
})
    .then(response => response.json())
    .then(data => {
    console.log("Upload erfolgreich:", data);
})
    .catch(error => {
    console.error("Fehler beim Upload:", error);
});
}