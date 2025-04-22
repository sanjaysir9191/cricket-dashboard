// /**
//  * Opens a tab when clicked
//  * @param {Event} evt - Click event
//  * @param {string} tabName - ID of the tab to open
//  */
// function openTab(evt, tabName) {
//     var i, tabcontent, tablinks;

//     // Hide all tab content
//     tabcontent = document.getElementsByClassName("tab-content");
//     for (i = 0; i < tabcontent.length; i++) {
//         tabcontent[i].className = tabcontent[i].className.replace(" active", "");
//     }

//     // Remove active class from all tabs
//     tablinks = document.getElementsByClassName("tab");
//     for (i = 0; i < tablinks.length; i++) {
//         tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }

//     // Show the current tab and add active class to the button
//     document.getElementById(tabName).className += " active";
//     evt.currentTarget.className += " active";
// }

// /**
//  * Create a match card element
//  * @param {Object} matchData - Data for the match
//  * @returns {HTMLElement} - DOM element for the match card
//  */
// function createMatchCard(matchData) {
//     const card = document.createElement('div');
//     card.className = 'match-card';
    
//     // Create match header
//     const header = document.createElement('div');
//     header.className = 'match-header';
//     header.innerHTML = `
//         <div>${matchData.matchNumber}, ${matchData.group}</div>
//         <div class="match-type">${matchData.matchType}</div>
//     `;
    
//     // Create match content
//     const content = document.createElement('div');
//     content.className = 'match-content';
    
//     // Create teams section
//     const teamsSection = document.createElement('div');
//     teamsSection.className = 'teams';
    
//     // Team 1
//     const team1 = document.createElement('div');
//     team1.className = 'team';
//     team1.innerHTML = `
//         <div class="team-logo">${matchData.team1.shortName}</div>
//         <div class="team-name">${matchData.team1.name}</div>
//         ${matchData.team1.score ? `<div class="score">${matchData.team1.score}</div>` : ''}
//     `;
    
//     // VS
//     const vs = document.createElement('div');
//     vs.className = 'vs';
//     vs.textContent = 'vs';
    
//     // Team 2
//     const team2 = document.createElement('div');
//     team2.className = 'team';
//     team2.innerHTML = `
//         <div class="team-logo">${matchData.team2.shortName}</div>
//         <div class="team-name">${matchData.team2.name}</div>
//         ${matchData.team2.score ? `<div class="score">${matchData.team2.score}</div>` : ''}
//     `;
    
//     // Append teams to teams section
//     teamsSection.appendChild(team1);
//     teamsSection.appendChild(vs);
//     teamsSection.appendChild(team2);
    
//     // Create match info
//     const matchInfo = document.createElement('div');
//     matchInfo.className = 'match-info';
//     matchInfo.innerHTML = `
//         <div>
//             <div>📍 ${matchData.venue}</div>
//             <div>⏰ ${matchData.time}</div>
//         </div>
//         <div class="match-status ${matchData.status.toLowerCase()}">${matchData.status === 'COMPLETED' ? matchData.result : matchData.status}</div>
//     `;
    
//     // Append sections to content
//     content.appendChild(teamsSection);
//     content.appendChild(matchInfo);
    
//     // If match has a scorecard, add it
//     if (matchData.scorecard) {
//         const scorecard = createScorecard(matchData.scorecard);
//         content.appendChild(scorecard);
//     }
    
//     // Append header and content to card
//     card.appendChild(header);
//     card.appendChild(content);
    
//     return card;
// }

// /**
//  * Create a scorecard element
//  * @param {Object} scorecardData - Data for the scorecard
//  * @returns {HTMLElement} - DOM element for the scorecard
//  */
// function createScorecard(scorecardData) {
//     const scorecard = document.createElement('div');
//     scorecard.className = 'scorecard';
    
//     // Create innings header
//     const inningsHeader = document.createElement('div');
//     inningsHeader.className = 'innings-header';
//     inningsHeader.textContent = `${scorecardData.team} Innings - ${scorecardData.score}`;
    
//     // Create batting section
//     const battingSection = document.createElement('div');
//     battingSection.className = 'batting-section';
//     battingSection.innerHTML = '<h4>Batting</h4>';
    
//     // Create batting table
//     const battingTable = document.createElement('table');
//     battingTable.className = 'scorecard-table';
    
//     // Create table header
//     const battingHeader = document.createElement('thead');
//     battingHeader.innerHTML = `
//         <tr>
//             <th>Batter</th>
//             <th>R</th>
//             <th>B</th>
//             <th>4s</th>
//             <th>6s</th>
//             <th>SR</th>
//         </tr>
//     `;
    
//     // Create table body
//     const battingBody = document.createElement('tbody');
    
//     // Add batsmen rows
//     scorecardData.batting.forEach(batter => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${batter.name}</td>
//             <td>${batter.runs}</td>
//             <td>${batter.balls}</td>
//             <td>${batter.fours}</td>
//             <td>${batter.sixes}</td>
//             <td>${batter.strikeRate}</td>
//         `;
//         battingBody.appendChild(row);
//     });
    
//     // Append header and body to batting table
//     battingTable.appendChild(battingHeader);
//     battingTable.appendChild(battingBody);
    
//     // Append batting table to batting section
//     battingSection.appendChild(battingTable);
    
//     // Create bowling section
//     const bowlingSection = document.createElement('div');
//     bowlingSection.className = 'bowling-section';
//     bowlingSection.innerHTML = '<h4>Bowling</h4>';
    
//     // Create bowling table
//     const bowlingTable = document.createElement('table');
//     bowlingTable.className = 'scorecard-table';
    
//     // Create table header
//     const bowlingHeader = document.createElement('thead');
//     bowlingHeader.innerHTML = `
//         <tr>
//             <th>Bowler</th>
//             <th>O</th>
//             <th>M</th>
//             <th>R</th>
//             <th>W</th>
//             <th>Econ</th>
//         </tr>
//     `;
    
//     // Create table body
//     const bowlingBody = document.createElement('tbody');
    
//     // Add bowlers rows
//     scorecardData.bowling.forEach(bowler => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${bowler.name}</td>
//             <td>${bowler.overs}</td>
//             <td>${bowler.maidens}</td>
//             <td>${bowler.runs}</td>
//             <td>${bowler.wickets}</td>
//             <td>${bowler.economy}</td>
//         `;
//         bowlingBody.appendChild(row);
//     });
    
//     // Append header and body to bowling table
//     bowlingTable.appendChild(bowlingHeader);
//     bowlingTable.appendChild(bowlingBody);
    
//     // Append bowling table to bowling section
//     bowlingSection.appendChild(bowlingTable);
    
//     // Create extras and fall of wickets sections
//     const extras = document.createElement('div');
//     extras.className = 'extras';
//     extras.textContent = `Extras: ${scorecardData.extras}`;
    
//     const fow = document.createElement('div');
//     fow.className = 'fow';
//     fow.textContent = `Fall of Wickets: ${scorecardData.fallOfWickets}`;
    
//     // Append all sections to scorecard
//     scorecard.appendChild(inningsHeader);
//     scorecard.appendChild(battingSection);
//     scorecard.appendChild(bowlingSection);
//     scorecard.appendChild(extras);
//     scorecard.appendChild(fow);
    
//     return scorecard;
// }

// /**
//  * Render matches to the specified container
//  * @param {Array} matches - Array of match data
//  * @param {string} containerId - ID of container to render matches in
//  */
// function renderMatches(matches, containerId) {
//     const container = document.getElementById(containerId);
    
//     // Clear existing content except for series titles
//     const seriesToKeep = [];
//     container.querySelectorAll('.series-title').forEach(title => {
//         seriesToKeep.push({
//             title: title.textContent,
//             element: title
//         });
//     });
    
//     container.innerHTML = '';
    
//     // Group matches by series
//     const matchesBySeriesMap = {};
    
//     matches.forEach(match => {
//         if (!matchesBySeriesMap[match.series]) {
//             matchesBySeriesMap[match.series] = [];
//         }
//         matchesBySeriesMap[match.series].push(match);
//     });
    
//     // Render matches by series
//     for (const series in matchesBySeriesMap) {
//         // Add series title
//         const title = document.createElement('h2');
//         title.className = 'series-title';
//         title.textContent = series;
//         container.appendChild(title);
        
//         // Add matches for this series
//         matchesBySeriesMap[series].forEach(match => {
//             const matchCard = createMatchCard(match);
//             container.appendChild(matchCard);
//         });
//     }
// }

// // Initialize the dashboard
// document.addEventListener('DOMContentLoaded', function() {
//     // Fetch initial data
//     fetchLiveMatches();
//     fetchUpcomingMatches();
//     fetchRecentMatches();
    
//     // Set up auto-refresh for live matches (every 30 seconds)
//     setInterval(fetchLiveMatches, 30000);
// });















/**
 * Opens a tab when clicked
 * @param {Event} evt - Click event
 * @param {string} tabName - ID of the tab to open
 */
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].className = tabcontent[i].className.replace(" active", "");
    }

    // Remove active class from all tabs
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add active class to the button
    document.getElementById(tabName).className += " active";
    evt.currentTarget.className += " active";
}

/**
 * Create a match card element
 * @param {Object} matchData - Data for the match
 * @returns {HTMLElement} - DOM element for the match card
 */
function createMatchCard(matchData) {
    const card = document.createElement('div');
    card.className = 'match-card';
    
    // Create match header
    const header = document.createElement('div');
    header.className = 'match-header';
    header.innerHTML = `
        <div>${matchData.matchNumber}${matchData.group ? ', ' + matchData.group : ''}</div>
        <div class="match-type">${matchData.matchType}</div>
    `;
    
    // Create match content
    const content = document.createElement('div');
    content.className = 'match-content';
    
    // Create teams section
    const teamsSection = document.createElement('div');
    teamsSection.className = 'teams';
    
    // Team 1
    const team1 = document.createElement('div');
    team1.className = 'team';
    team1.innerHTML = `
        <div class="team-logo">${matchData.team1.shortName}</div>
        <div class="team-name">${matchData.team1.name}</div>
        ${matchData.team1.score ? `<div class="score">${matchData.team1.score}</div>` : ''}
    `;
    
    // VS
    const vs = document.createElement('div');
    vs.className = 'vs';
    vs.textContent = 'vs';
    
    // Team 2
    const team2 = document.createElement('div');
    team2.className = 'team';
    team2.innerHTML = `
        <div class="team-logo">${matchData.team2.shortName}</div>
        <div class="team-name">${matchData.team2.name}</div>
        ${matchData.team2.score ? `<div class="score">${matchData.team2.score}</div>` : ''}
    `;
    
    // Append teams to teams section
    teamsSection.appendChild(team1);
    teamsSection.appendChild(vs);
    teamsSection.appendChild(team2);
    
    // Create match info
    const matchInfo = document.createElement('div');
    matchInfo.className = 'match-info';
    matchInfo.innerHTML = `
        <div>
            <div>📍 ${matchData.venue}</div>
            <div>⏰ ${matchData.time}</div>
        </div>
        <div class="match-status ${matchData.status.toLowerCase()}">${matchData.status === 'COMPLETED' ? matchData.result : matchData.status}</div>
    `;
    
    // Append sections to content
    content.appendChild(teamsSection);
    content.appendChild(matchInfo);
    
    // If it's a completed match and not showing scorecard yet, add view scorecard button
    if (matchData.status === 'COMPLETED' && !matchData.scorecard) {
        const scorecardBtn = document.createElement('button');
        scorecardBtn.className = 'scorecard-btn';
        scorecardBtn.textContent = 'View Scorecard';
        scorecardBtn.onclick = function() {
            fetchScorecard(matchData.id, card);
        };
        content.appendChild(scorecardBtn);
    }
    
    // If match has a scorecard, add it
    if (matchData.scorecard) {
        const scorecard = createScorecard(matchData.scorecard);
        content.appendChild(scorecard);
    }
    
    // Append header and content to card
    card.appendChild(header);
    card.appendChild(content);
    
    return card;
}

/**
 * Create a scorecard element
 * @param {Object} scorecardData - Data for the scorecard
 * @returns {HTMLElement} - DOM element for the scorecard
 */
function createScorecard(scorecardData) {
    const scorecard = document.createElement('div');
    scorecard.className = 'scorecard';
    
    // Loop through innings
    scorecardData.scoreCard.forEach(innings => {
        // Create innings header
        const inningsHeader = document.createElement('div');
        inningsHeader.className = 'innings-header';
        inningsHeader.textContent = `${innings.batTeamName} Innings - ${innings.runs}/${innings.wickets} (${innings.overs} overs)`;
        scorecard.appendChild(inningsHeader);
        
        // Create batting section
        const battingSection = document.createElement('div');
        battingSection.className = 'batting-section';
        battingSection.innerHTML = '<h4>Batting</h4>';
        
        // Create batting table
        const battingTable = document.createElement('table');
        battingTable.className = 'scorecard-table';
        
        // Create table header
        const battingHeader = document.createElement('thead');
        battingHeader.innerHTML = `
            <tr>
                <th>Batter</th>
                <th>R</th>
                <th>B</th>
                <th>4s</th>
                <th>6s</th>
                <th>SR</th>
            </tr>
        `;
        
        // Create table body
        const battingBody = document.createElement('tbody');
        
        // Add batsmen rows
        innings.batTeamDetails.batsmenData.forEach(batter => {
            const row = document.createElement('tr');
            const dismissalText = batter.dismissalText ? ` - ${batter.dismissalText}` : '';
            row.innerHTML = `
                <td>${batter.batName}${dismissalText}</td>
                <td>${batter.runs}</td>
                <td>${batter.balls}</td>
                <td>${batter.fours || 0}</td>
                <td>${batter.sixes || 0}</td>
                <td>${calculateStrikeRate(batter.runs, batter.balls)}</td>
            `;
            battingBody.appendChild(row);
        });
        
        // Append header and body to batting table
        battingTable.appendChild(battingHeader);
        battingTable.appendChild(battingBody);
        
        // Append batting table to batting section
        battingSection.appendChild(battingTable);
        scorecard.appendChild(battingSection);
        
        // Create bowling section
        const bowlingSection = document.createElement('div');
        bowlingSection.className = 'bowling-section';
        bowlingSection.innerHTML = '<h4>Bowling</h4>';
        
        // Create bowling table
        const bowlingTable = document.createElement('table');
        bowlingTable.className = 'scorecard-table';
        
        // Create table header
        const bowlingHeader = document.createElement('thead');
        bowlingHeader.innerHTML = `
            <tr>
                <th>Bowler</th>
                <th>O</th>
                <th>M</th>
                <th>R</th>
                <th>W</th>
                <th>Econ</th>
            </tr>
        `;
        
        // Create table body
        const bowlingBody = document.createElement('tbody');
        
        // Add bowlers rows
        innings.bowlTeamDetails.bowlersData.forEach(bowler => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bowler.bowlName}</td>
                <td>${bowler.overs}</td>
                <td>${bowler.maidens}</td>
                <td>${bowler.runs}</td>
                <td>${bowler.wickets}</td>
                <td>${calculateEconomy(bowler.runs, bowler.overs)}</td>
            `;
            bowlingBody.appendChild(row);
        });
        
        // Append header and body to bowling table
        bowlingTable.appendChild(bowlingHeader);
        bowlingTable.appendChild(bowlingBody);
        
        // Append bowling table to bowling section
        bowlingSection.appendChild(bowlingTable);
        scorecard.appendChild(bowlingSection);
        
        // Create extras and fall of wickets sections
        const extras = document.createElement('div');
        extras.className = 'extras';
        extras.textContent = `Extras: ${innings.extras}`;
        scorecard.appendChild(extras);
        
        const fow = document.createElement('div');
        fow.className = 'fow';
        fow.textContent = `Fall of Wickets: ${innings.fallOfWickets}`;
        scorecard.appendChild(fow);
    });
    
    return scorecard;
}

/**
 * Calculate strike rate from runs and balls
 */
function calculateStrikeRate(runs, balls) {
    if (!balls) return 0;
    return ((runs / balls) * 100).toFixed(2);
}

/**
 * Calculate economy rate from runs and overs
 */
function calculateEconomy(runs, overs) {
    if (!overs) return 0;
    // Handle overs in format "4.2" (4 complete overs and 2 balls)
    const [fullOvers, balls] = overs.split('.').map(Number);
    const totalBalls = fullOvers * 6 + (balls || 0);
    return ((runs / totalBalls) * 6).toFixed(2);
}

/**
 * Fetch scorecard for a match and update the match card
 */
async function fetchScorecard(matchId, cardElement) {
    try {
        const response = await fetch(`/api/matches/${matchId}/scorecard`);
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Find the content part of the card
        const content = cardElement.querySelector('.match-content');
        
        // Remove the view scorecard button if it exists
        const scorecardBtn = content.querySelector('.scorecard-btn');
        if (scorecardBtn) {
            content.removeChild(scorecardBtn);
        }
        
        // Add the scorecard
        const scorecard = createScorecard(data);
        content.appendChild(scorecard);
        
    } catch (error) {
        console.error('Error fetching scorecard:', error);
        alert('Failed to load scorecard. Please try again later.');
    }
}

/**
 * Render matches to the specified container
 * @param {Array} matches - Array of match data
 * @param {string} containerId - ID of container to render matches in
 */
function renderMatches(matches, containerId) {
    const container = document.getElementById(containerId);
    
    // Group matches by series
    const matchesBySeriesMap = {};
    
    matches.forEach(match => {
        if (!matchesBySeriesMap[match.series]) {
            matchesBySeriesMap[match.series] = [];
        }
        matchesBySeriesMap[match.series].push(match);
    });
    
    // Clear existing content
    container.innerHTML = '';
    
    // If no matches found
    if (Object.keys(matchesBySeriesMap).length === 0) {
        const noMatches = document.createElement('div');
        noMatches.className = 'no-matches';
        noMatches.textContent = 'No matches currently available';
        container.appendChild(noMatches);
        return;
    }
    
    // Render matches by series
    for (const series in matchesBySeriesMap) {
        // Add series title
        const title = document.createElement('h2');
        title.className = 'series-title';
        title.textContent = series;
        container.appendChild(title);
        
        // Add matches for this series
        matchesBySeriesMap[series].forEach(match => {
            const matchCard = createMatchCard(match);
            container.appendChild(matchCard);
        });
    }
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Fetch initial data
    fetchLiveMatches();
    fetchUpcomingMatches();
    fetchRecentMatches();
    
    // Set up auto-refresh for live matches (every 30 seconds)
    setInterval(fetchLiveMatches, 30000);
});





