const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startCameraBtn = document.getElementById('start-camera');
const captureBtn = document.getElementById('capture');
const downloadBtn = document.getElementById('download');
const closeCameraBtn = document.getElementById('close-camera');
const cameraContainer = document.querySelector('.camera-container');
const ctx = canvas.getContext('2d');
let stream = null;

startCameraBtn.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(mediaStream => {
            stream = mediaStream;
            video.srcObject = stream;
            cameraContainer.style.display = 'block';
            startCameraBtn.style.display = 'none';
        })
        .catch(err => alert('Camera access denied or not available: ' + err));
});

captureBtn.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.style.display = 'block';
    video.style.display = 'none';
    captureBtn.style.display = 'none';
    downloadBtn.style.display = 'inline';
});

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'photo_booth.png';
    link.click();
    location.reload();
});

closeCameraBtn.addEventListener('click', () => {
    if (stream) {
        let tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
    cameraContainer.style.display = 'none';
    startCameraBtn.style.display = 'inline';
});
