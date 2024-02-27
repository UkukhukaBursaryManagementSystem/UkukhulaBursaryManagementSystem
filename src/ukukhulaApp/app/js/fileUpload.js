import {post} from '../js/post_data.js'



 // Function to upload file
 async function uploadFile(file, fieldName) {
    let formData = new FormData();
    formData.append(fieldName, file);

    let url;

    const result = await fetch('http://localhost:8080/api/blob/upload', {
        method: 'POST',
        body: formData
    });
    return result.json();
}

document.getElementById('fileUploadForm').addEventListener('submit',async function(event) {
    event.preventDefault(); // Prevent default form submission

    try {
        // Get file inputs
        let resumeFile = document.getElementById('resume').files[0];
        let transcriptFile = document.getElementById('transcript').files[0];
        let idCopyFile = document.getElementById('id_coopy').files[0];

        // Upload each file individually and get the file URL
        const resumeUrl = await uploadFile(resumeFile, 'file');
        const transcriptUrl = await uploadFile(transcriptFile, 'file');
        const idCopyUrl = await uploadFile(idCopyFile, 'file');

        // Use the file URLs in another request or perform other actions
        console.log('Resume URL:', resumeUrl.url);
        console.log('Transcript URL:', transcriptUrl.url);
        console.log('ID Copy URL:', idCopyUrl.url);

        // Proceed with further actions using the file URLs
    } catch (error) {
        console.error('Error uploading files:', error);
        // Handle error
    }
});