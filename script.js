const apiKey = 'xX8BVGOBBGbj3PRtzdXVAZ70vq0IoGAB'; // Replace with your Giphy API key
const gifContainer = document.getElementById('gif-container');
let gifs = [];
let currentGifIndex = 0;
let fetching = false;
let gifDisplayTimeout;

const displayNextGif = () => {
    if (currentGifIndex < gifs.length) {
        gifContainer.innerHTML = `<img src="${gifs[currentGifIndex].images.original.url}" class="gif-item" />`;
        currentGifIndex++;
        clearTimeout(gifDisplayTimeout);
        gifDisplayTimeout = setTimeout(displayNextGif, 4000); // Change GIF every 4 seconds
    } else {
        fetchGifs();
    }
};

const fetchGifs = () => {
    if (fetching) return;
    fetching = true;

    fetch(`https://api.giphy.com/v1/gifs/search?q=Frisky&api_key=${apiKey}&limit=10&offset=${gifs.length}`)
        .then(response => response.json())
        .then(data => {
            gifs = gifs.concat(data.data);
            if (currentGifIndex === 0) {
                displayNextGif();
            }
            fetching = false;
        })
        .catch(error => console.error('Error fetching Giphy API:', error));
};

fetchGifs();


//xX8BVGOBBGbj3PRtzdXVAZ70vq0IoGAB