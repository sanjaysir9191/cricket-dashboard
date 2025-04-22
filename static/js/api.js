// /**
//  * Base URL for the cricket API
//  * @type {string}
//  */
// const API_BASE_URL = 'https://api.cricinfo.com/v1';

// /**
//  * API key for authentication
//  * @type {string}
//  */
// const API_KEY = 'your_api_key_here';

// /**
//  * Fetch data from the API
//  * @param {string} endpoint - API endpoint to fetch
//  * @param {Object} params - Query parameters
//  * @returns {Promise<Object>} - API response
//  */
// async function fetchFromAPI(endpoint, params = {}) {
//     try {
//         // Build query string
//         const queryString = new URLSearchParams({
//             apikey: API_KEY,
//             ...params
//         }).toString();
        
//         // Make the API request
//         const response = await fetch(`${API_BASE_URL}/${endpoint}?${queryString}`);
        
//         if (!response.ok) {
//             throw new Error(`API error: ${response.status}`);
//         }
        
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return null;
//     }
// }

// /**
//  * Fetch live matches
//  */
// async function fetchLiveMatches() {
//     try {
//         // For now, use mock data
//         const liveMatches = getMockLiveMatches();
//         renderMatches(liveMatches, 'live');
        
//         // Uncomment to use real API
//         // const data = await fetchFromAPI('matches/live');
//         // if (data && data.matches) {
//         //     renderMatches(data.matches, 'live');
//         // }
//     } catch (error) {
//         console.error('Error fetching live matches:', error);
//         document.getElementById('live').innerHTML = '<div class="loading">Failed to load live matches</div>';
//     }
// }

// /**
//  * Fetch upcoming matches
//  */
// async function fetchUpcomingMatches() {
//     try {
//         // For now, use mock data
//         const upcomingMatches = getMockUpcomingMatches();
//         renderMatches(upcomingMatches, 'upcoming');
        
//         // Uncomment to use real API
//         // const data = await fetchFromAPI('matches/upcoming', { days: 7 });
//         // if (data && data.matches) {
//         //     renderMatches(data.matches, 'upcoming');
//         // }
//     } catch (error) {
//         console.error('Error fetching upcoming matches:', error);
//         document.getElementById('upcoming').innerHTML = '<div class="loading">Failed to load upcoming matches</div>';
//     }
// }

// /**
//  * Fetch recent match results
//  */
// async function fetchRecentMatches() {
//     try {
//         // For now, use mock data
//         const recentMatches = getMockRecentMatches();
//         renderMatches(recentMatches, 'recent');
        
//         // Uncomment to use real API
//         // const data = await fetchFromAPI('matches/recent', { days: 7 });
//         // if (data && data.matches) {
//         //     renderMatches(data.matches, 'recent');
//         // }
//     } catch (error) {
//         console.error('Error fetching recent matches:', error);
//         document.getElementById('recent').innerHTML = '<div class="loading">Failed to load recent matches</div>';
//     }
// }

// /**
//  * Get match details by ID
//  * @param {string} matchId - ID of the match
//  * @returns {Promise<Object>} - Match details
//  */
// async function getMatchDetails(matchId) {
//     try {
//         return await fetchFromAPI(`matches/${matchId}`);
//     } catch (error) {
//         console.error('Error fetching match details:', error);
//         return null;
//     }
// }

// /**
//  * Get scorecard for a match
//  * @param {string} matchId - ID of the match
//  * @returns {Promise<Object>} - Scorecard details
//  */
// async function getMatchScorecard(matchId) {
//     try {
//         return await fetchFromAPI(`matches/${matchId}/scorecard`);
//     } catch (error) {
//         console.error('Error fetching scorecard:', error);
//         return null;
//     }
// }

// /**
//  * Get mock live matches data
//  * @returns {Array} - Mock live matches
//  */
// function getMockLiveMatches() {
//     return [
//         {
//             id: 'match-32',
//             series: 'ICC Men\'s T20 World Cup 2024',
//             matchNumber: 'Match 32',
//             group: 'Group 2',
//             matchType: 'T20',
//             team1: {
//                 id: 'ind',
//                 name: 'India',
//                 shortName: 'IND',
//                 score: '168/6 (20.0)'
//             },
//             team2: {
//                 id: 'aus',
//                 name: 'Australia',
//                 shortName: 'AUS',
//                 score: '126/7 (16.4)'
//             },
//             venue: 'Nassau County Stadium, New York',
//             time: '8:00 PM Local',
//             status: 'LIVE'
//         },
//         {
//             id: 'match-33',
//             series: 'ICC Men\'s T20 World Cup 2024',
//             matchNumber: 'Match 33',
//             group: 'Group 1',
//             matchType: 'T20',
//             team1: {
//                 id: 'eng',
//                 name: 'England',
//                 shortName: 'ENG',
//                 score: '189/5 (20.0)'
//             },
//             team2: {
//                 id: 'sa',
//                 name: 'South Africa',
//                 shortName: 'SA',
//                 score: '102/4 (11.3)'
//             },
//             venue: 'Kensington Oval, Barbados',
//             time: '10:30 AM Local',
//             status: 'LIVE'
//         }
//     ];
// }

// /**
//  * Get mock upcoming matches data
//  * @returns {Array} - Mock upcoming matches
//  */
// function getMockUpcomingMatches() {
//     return [
//         {
//             id: 'match-35',
//             series: 'ICC Men\'s T20 World Cup 2024',
//             matchNumber: 'Match 35',
//             group: 'Group 1',
//             matchType: 'T20',
//             team1: {
//                 id: 'nz',
//                 name: 'New Zealand',
//                 shortName: 'NZ'
//             },
//             team2: {
//                 id: 'wi',
//                 name: 'West Indies',
//                 shortName: 'WI'
//             },
//             venue: 'Brian Lara Stadium, Trinidad',
//             time: 'Tomorrow, 8:00 PM Local',
//             status: 'UPCOMING'
//         },
//         {
//             id: 'match-36',
//             series: 'ICC Men\'s T20 World Cup 2024',
//             matchNumber: 'Match 36',
//             group: 'Group 2',
//             matchType: 'T20',
//             team1: {
//                 id: 'pak',
//                 name: 'Pakistan',
//                 shortName: 'PAK'
//             },
//             team2: {
//                 id: 'sco',
//                 name: 'Scotland',
//                 shortName: 'SCO'
//             },
//             venue: 'Sir Vivian Richards Stadium, Antigua',
//             time: 'Apr 23, 10:30 AM Local',
//             status: 'UPCOMING'
//         },
//         {
//             id: 'test-1',
//             series: 'England Tour of Pakistan 2024',
//             matchNumber: '1st Test',
//             matchType: 'TEST',
//             team1: {
//                 id: 'pak',
//                 name: 'Pakistan',
//                 shortName: 'PAK'
//             },
//             team2: {
//                 id: 'eng',
//                 name: 'England',
//                 shortName: 'ENG'
//             },
//             venue: 'National Stadium, Karachi',
//             time: 'May 7, 10:00 AM Local',
//             status: 'UPCOMING'
//         }
//     ];
// }

// /**
//  * Get mock recent matches data
//  * @returns {Array} - Mock recent matches
//  */
// function getMockRecentMatches() {
//     return [
//         {
//             id: 'match-30',
//             series: 'ICC Men\'s T20 World Cup 2024',
//             matchNumber: 'Match 30',
//             group: 'Group 2',
//             matchType: 'T20',
//             team1: {
//                 id: 'pak',
//                 name: 'Pakistan',
//                 shortName: 'PAK',
//                 score: '179/8 (20.0)'
//             },
//             team2: {
//                 id: 'ind',
//                 name: 'India',
//                 shortName: 'IND',
//                 score: '182/4 (19.0)'
//             },
//             venue: 'Nassau County Stadium, New York',
//             time: 'Yesterday, 8:00 PM Local',
//             status: 'COMPLETED',
//             result: 'India won by 6 wickets',
//             scorecard: {
//                 team: 'Pakistan',
//                 score: '179/8 (20.0)',
//                 batting: [
//                     {
//                         name: 'Babar Azam (c) - c Pant b Bumrah',
//                         runs: 37,
//                         balls: 43,
//                         fours: 3,
//                         sixes: 0,
//                         strikeRate: 86.05
//                     },
//                     {
//                         name: 'Mohammad Rizwan - b Jadeja',
//                         runs: 31,
//                         balls: 26,
//                         fours: 2,
//                         sixes: 1,
//                         strikeRate: 119.23
//                     },
//                     {
//                         name: 'Fakhar Zaman - c Kohli b Siraj',
//                         runs: 19,
//                         balls: 15,
//                         fours: 1,
//                         sixes: 1,
//                         strikeRate: 126.67
//                     },
//                     {
//                         name: 'Shadab Khan - b Hardik',
//                         runs: 36,
//                         balls: 25,
//                         fours: 2,
//                         sixes: 2,
//                         strikeRate: 144.00
//                     },
//                     {
//                         name: 'Iftikhar Ahmed - c Arshdeep b Bumrah',
//                         runs: 27,
//                         balls: 18,
//                         fours: 2,
//                         sixes: 1,
//                         strikeRate: 150.00
//                     }
//                 ],
//                 bowling: [
//                     {
//                         name: 'Jasprit Bumrah',
//                         overs: '4.0',
//                         maidens: 0,
//                         runs: 28,
//                         wickets: 2,
//                         economy: 7.00
//                     },
//                     {
//                         name: 'Arshdeep Singh',
//                         overs: '4.0',
//                         maidens: 0,
//                         runs: 42,
//                         wickets: 1,
//                         economy: 10.50
//                     },
//                     {
//                         name: 'Ravindra Jadeja',
//                         overs: '4.0',
//                         maidens: 0,
//                         runs: 35,
//                         wickets: 1,
//                         economy: 8.75
//                     },
//                     {
//                         name: 'Mohammed Siraj',
//                         overs: '4.0',
//                         maidens: 0,
//                         runs: 39,
//                         wickets: 1,
//                         economy: 9.75
//                     },
//                     {
//                         name: 'Hardik Pandya',
//                         overs: '4.0',
//                         maidens: 0,
//                         runs: 34,
//                         wickets: 3,
//                         economy: 8.50
//                     }
//                 ],
//                 extras: '11 (b 2, lb 3, w 6, nb 0, p 0)',
//                 fallOfWickets: '1-59 (Rizwan, 8.3 ov), 2-82 (Fakhar, 11.2 ov), 3-113 (Babar, 14.4 ov)'
//             }
//         },
//         {
//             id: 'match-29',
//             series: 'ICC Men\'s T20 World Cup 2024',
//             matchNumber: 'Match 29',
//             group: 'Group 1',
//             matchType: 'T20',
//             team1: {
//                 id: 'nz',
//                 name: 'New Zealand',
//                 shortName: 'NZ',
//                 score: '146/7 (20.0)'
//             },
//             team2: {
//                 id: 'wi',
//                 name: 'West Indies',
//                 shortName: 'WI',
//                 score: '148/4 (19.1)'
//             },
//             venue: 'Brian Lara Stadium, Trinidad',
//             time: 'Apr 18, 8:00 PM Local',
//             status: 'COMPLETED',
//             result: 'West Indies won by 6 wickets'
//         },
//         {
//             id: 'ipl-44',
//             series: 'Indian Premier League 2024',
//             matchNumber: 'Match 44',
//             matchType: 'T20',
//             team1: {
//                 id: 'csk',
//                 name: 'Chennai Super Kings',
//                 shortName: 'CSK',
//                 score: '210/4 (20.0)'
//             },
//             team2: {
//                 id: 'mi',
//                 name: 'Mumbai Indians',
//                 shortName: 'MI',
//                 score: '186/9 (20.0)'
//             },
//             venue: 'Wankhede Stadium, Mumbai',
//             time: 'Apr 20, 7:30 PM IST',
//             status: 'COMPLETED',
//             result: 'CSK won by 24 runs'
//         }
//     ];
// }














/**
 * Fetch live matches
 */
async function fetchLiveMatches() {
    try {
        // Show loading indicator
        document.getElementById('live').innerHTML = '<div class="loading">Loading live matches...</div>';
        
        const response = await fetch('/api/matches/live');
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        renderMatches(data, 'live');
    } catch (error) {
        console.error('Error fetching live matches:', error);
        document.getElementById('live').innerHTML = '<div class="error">Failed to load live matches</div>';
    }
}

/**
 * Fetch upcoming matches
 */
async function fetchUpcomingMatches() {
    try {
        // Show loading indicator
        document.getElementById('upcoming').innerHTML = '<div class="loading">Loading upcoming matches...</div>';
        
        const response = await fetch('/api/matches/upcoming');
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        renderMatches(data, 'upcoming');
    } catch (error) {
        console.error('Error fetching upcoming matches:', error);
        document.getElementById('upcoming').innerHTML = '<div class="error">Failed to load upcoming matches</div>';
    }
}

/**
 * Fetch recent match results
 */
async function fetchRecentMatches() {
    try {
        // Show loading indicator
        document.getElementById('recent').innerHTML = '<div class="loading">Loading recent matches...</div>';
        
        const response = await fetch('/api/matches/recent');
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        renderMatches(data, 'recent');
    } catch (error) {
        console.error('Error fetching recent matches:', error);
        document.getElementById('recent').innerHTML = '<div class="error">Failed to load recent matches</div>';
    }
}




