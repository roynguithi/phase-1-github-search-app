document.addEventListener('DOMContentLoaded', () =>{
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const userResults = document.getElementById('user-results');
    const repoResults = document.getElementById('repo-results');

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value;
        searchGithubUsers(query);
    });
    function searchGithubUsers(query) {
        fetch(`https://api.github.com/search/users?q=${query}`)
        .then(response = response.json())
        .then(data => {
            displayusers(dataitems);
        })
        .catch(error =>{
            console.error('error fetching users:',error);
        })
    }   
    function displayUsers(users) {
        userResults.innerHTML = '';
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.login}" width="50">
                <p>${user.login}</p>
                <a href="${user.html_url}" target="_blank">Profile</a>
            `;
            userCard.addEventListener('click', () => {
                fetchUserRepos(user.login);
            });
            userResults.appendChild(userCard);
        });
    }

    function fetchUserRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => response.json())
            .then(data => {
                displayRepos(data);
            })
            .catch(error => {
                console.error('Error fetching repositories:', error);
            });
    }

    function displayRepos(repos) {
        repoResults.innerHTML = '';
        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'repo-card';
            repoCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
                <a href="${repo.html_url}" target="_blank">Repository</a>
            `;
            repoResults.appendChild(repoCard);
        });
    }
})

