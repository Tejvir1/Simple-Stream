document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const videoList = document.createElement('div');
    const videoPlayer = document.createElement('div');
    const loginForm = document.createElement('form');
    const searchInput = document.createElement('input');
    const searchButton = document.createElement('button');
    const searchResults = document.createElement('div');

    // Sample video data
    const videoData = [
        { title: "Sample Video 1", src: "video1.mp4", thumbnail: "thumbnail1.jpg" },
        { title: "Sample Video 2", src: "video2.mp4", thumbnail: "thumbnail2.jpg" },
        { title: "Sample Video 3", src: "video3.mp4", thumbnail: "thumbnail3.jpg" }
    ];

    // Render video list
    function renderVideoList(videos) {
        videoList.innerHTML = '';
        videos.forEach(video => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'video-thumbnail';
            
            const img = document.createElement('img');
            img.src = video.thumbnail;
            img.alt = video.title;

            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => {
                const player = document.getElementById('player');
                player.src = video.src;
                videoPlayer.classList.remove('hidden');
            });

            videoList.appendChild(thumbnail);
        });
    }

    // Render video player
    function renderVideoPlayer() {
        videoPlayer.id = 'video-player';
        videoPlayer.className = 'hidden';
        const player = document.createElement('video');
        player.id = 'player';
        player.controls = true;
        player.width = 800;
        videoPlayer.appendChild(player);
    }

    // Render login form
    function renderLoginForm() {
        loginForm.id = 'login-form';
        loginForm.innerHTML = `
            <label for="username">Username:</label>
            <input type="text" id="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" required>
            <button type="submit">Login</button>
        `;
        loginForm.addEventListener('submit', event => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === 'user' && password === 'password') {
                alert('Login successful!');
                showHomePage();
            } else {
                alert('Invalid username or password');
            }
        });
    }

    // Render search page
    function renderSearchPage() {
        searchInput.id = 'search-input';
        searchInput.placeholder = 'Search videos';
        searchButton.id = 'search-button';
        searchButton.textContent = 'Search';

        searchButton.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase();
            searchResults.innerHTML = '';
            const filteredVideos = videoData.filter(video => video.title.toLowerCase().includes(query));
            
            filteredVideos.forEach(video => {
                const thumbnail = document.createElement('div');
                thumbnail.className = 'video-thumbnail';
                
                const img = document.createElement('img');
                img.src = video.thumbnail;
                img.alt = video.title;

                thumbnail.appendChild(img);
                thumbnail.addEventListener('click', () => {
                    const player = document.getElementById('player');
                    player.src = video.src;
                    document.getElementById('video-player').classList.remove('hidden');
                });

                searchResults.appendChild(thumbnail);
            });
        });

        mainContent.innerHTML = '';
        mainContent.appendChild(searchInput);
        mainContent.appendChild(searchButton);
        mainContent.appendChild(searchResults);
    }

    // Show home page
    function showHomePage() {
        mainContent.innerHTML = '';
        renderVideoList(videoData);
        renderVideoPlayer();
    }

    // Handle navigation
    document.getElementById('home-link').addEventListener('click', showHomePage);
    document.getElementById('search-link').addEventListener('click', renderSearchPage);
    document.getElementById('login-link').addEventListener('click', () => {
        mainContent.innerHTML = '';
        renderLoginForm();
    });

    // Initial load
    showHomePage();
});
