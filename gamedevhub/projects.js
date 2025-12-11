let games = [];
let gamesContainer;
let searchInput;
let searchButton;

async function loadGames() {
    try {
        const response = await fetch('games.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        games = await response.json();
        console.log('Games loaded:', games);
        renderAllGames(games);
    } catch (error) {
        console.error('Error loading games:', error);
        displayError();
    }
}

function tagsTemplate(tags) {
    return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

function statusBadgeTemplate(status) {
    const statusClass = status.toLowerCase().replace(/\s+/g, '-');
    return `<span class="status-badge status-${statusClass}">${status}</span>`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
}

function gameCardTemplate(game) {
    return `
        <article class="game-card">
            <img src="${game.image}" alt="${game.name} game screenshot">
            <div class="game-card-content">
                <h3>${game.name}</h3>
                ${statusBadgeTemplate(game.status)}
                <div class="tags">
                    ${tagsTemplate(game.tags)}
                </div>
                <p class="description">${game.description}</p>
                <p class="date">Started: ${formatDate(game.dateCreated)}</p>
            </div>
        </article>
    `;
}

function searchGames() {
    const query = searchInput.value.toLowerCase().trim();
    console.log('Searching for:', query);

    if (query === '') {
        renderAllGames(games);
        return;
    }

    const filteredGames = games.filter(game => {
        const nameMatch = game.name.toLowerCase().includes(query);
        const descriptionMatch = game.description.toLowerCase().includes(query);
        const statusMatch = game.status.toLowerCase().includes(query);
        const tagsMatch = game.tags.some(tag => tag.toLowerCase().includes(query));

        return nameMatch || descriptionMatch || statusMatch || tagsMatch;
    });

    function compareGames(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    }

    const sortedGames = filteredGames.sort(compareGames);
    renderAllGames(sortedGames);
    console.log(`Found ${sortedGames.length} games matching "${query}"`);
}

function renderGame(game, container) {
    const html = gameCardTemplate(game);
    container.innerHTML += html;
}

function renderAllGames(gamesToRender) {
    gamesContainer.innerHTML = '';

    if (gamesToRender.length === 0) {
        gamesContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #666;">
                <p>No games found matching your search.</p>
            </div>
        `;
        return;
    }

    gamesToRender.forEach(game => renderGame(game, gamesContainer));
}

function displayError() {
    gamesContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #666;">
            <p>Unable to load games. Please try again later.</p>
        </div>
    `;
}

function setupEventListeners() {
    searchButton.addEventListener('click', searchGames);
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchGames();
        }
    });
}

function init() {
    gamesContainer = document.querySelector('#games-container');
    searchInput = document.querySelector('#search');
    searchButton = document.querySelector('#search-button');
    setupEventListeners();
    loadGames();
}

init();
