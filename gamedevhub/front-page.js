let games = [];

async function loadGames() {
    try {
        const response = await fetch('games.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        games = await response.json();
        console.log('Games loaded:', games);
        renderFeaturedGames();
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

function renderGame(game, container) {
    const html = gameCardTemplate(game);
    container.innerHTML += html;
}

function renderFeaturedGames() {
    const container = document.querySelector('#featured-games-container');
    container.innerHTML = '';

    const featuredGames = games.filter(game => game.featured === true);
    featuredGames.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    const topFeatured = featuredGames.slice(0, 3);

    topFeatured.forEach(game => renderGame(game, container));

    if (topFeatured.length < 3) {
        console.warn(`Only ${topFeatured.length} featured games found. Mark more games as featured.`);
    }
}

function displayError() {
    const container = document.querySelector('#featured-games-container');
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #666;">
            <p>Unable to load games. Please try again later.</p>
        </div>
    `;
}

function init() {
    loadGames();
}

init();
