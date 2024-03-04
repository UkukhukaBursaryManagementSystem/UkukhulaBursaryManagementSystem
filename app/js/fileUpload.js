// Function to upload file
 async function uploadFile(file, fieldName) {
    let formData = new FormData();
    formData.append(fieldName, file);

    let url;

    const result = await fetch('https://ukukhulaapi.azurewebsites.net/api/blob/upload', {
        method: 'POST',
        body: formData
    });
    return result.json();
}


document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.documents-upload').addEventListener('submit',async function(event) {
        event.preventDefault(); // Prevent default form submission
        const loadImage = document.querySelector('.load');
        loadImage.classList.toggle('show');
        try {
            // Get file inputs
            let resumeFile = document.getElementById('resume').files[0];
            let transcriptFile = document.getElementById('transcript').files[0];
            let idCopyFile = document.getElementById('id_coopy').files[0];

            // Upload each file individually and get the file URL
            const resumeUrl = await uploadFile(resumeFile, 'file');
            const transcriptUrl = await uploadFile(transcriptFile, 'file');
            const idUrl = await uploadFile(idCopyFile, 'file');

            // Use the file URLs in another request or perform other actions
            console.log('Resume URL:', resumeUrl.url);
            console.log('Transcript URL:', transcriptUrl.url);
            console.log('ID Copy URL:', idUrl.url);

            // Proceed with further actions using the file URLs
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });

            let docBody = {
                "applicationID": parseInt(params.applicationID),
                "resumeURL": encodeURI(resumeUrl.url),
                "transcriptURL" : encodeURI(transcriptUrl.url),
                "idURL" : encodeURI(idUrl.url)
            }

            let finalResponse = await post('https://ukukhulaapi.azurewebsites.net/student-documents', docBody);
            
            alert("Documents Uploaded Successully");
            window.location.reload();
        } catch (error) {
            console.error('Error uploading files:', error);
            // Handle erro
            alert('Error uploading files', error);
        }
    });

});