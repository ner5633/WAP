const video = document.querySelector("video");

// Kamera starten
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error("Kamera konnte nicht geöffnet werden: ", error);
    });

// Standort abrufen
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            console.log(`Standort: ${latitude}, ${longitude}`);

            // Informationen vom Server basierend auf Standort abrufen
            fetch("http://10.0.40.166/getInfo", { // URL angepasst
                method: "POST",
                body: JSON.stringify({ latitude, longitude }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Daten vom Server:", data);

                    // Informationen im Overlay anzeigen
                    const informationOverlay = document.createElement("div");
                    informationOverlay.textContent = `Server-Antwort: ${data.info}`;
                    informationOverlay.style.position = "absolute";
                    informationOverlay.style.top = "10px";
                    informationOverlay.style.left = "10px";
                    informationOverlay.style.color = "white";
                    document.body.appendChild(informationOverlay);
                })
                .catch(error => {
                    console.error("Fehler bei der Server-Kommunikation:", error);
                });
        },
        error => {
            console.error("Standort konnte nicht bestimmt werden: ", error);
        }
    );
} else {
    console.error("Geolocation wird nicht unterstützt.");
}

// Datei-Upload-Funktion
function uploadFile() {
    const file = document.getElementById("fileUpload").files[0];
    const formData = new FormData();
    formData.append("file", file);

    // Datei an den Server hochladen
    fetch("http://10.0.40.166/upload", { // URL angepasst
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
