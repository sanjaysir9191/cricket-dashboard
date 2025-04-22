from flask import Flask, render_template, jsonify
import http.client
import json
from datetime import datetime
from datetime import datetime, timedelta


app = Flask(__name__)

# API Headers
HEADERS = {
    'x-rapidapi-key': "54ffbbc380msh5079f9b3c9eed97p1d05bfjsn5c29ae64ce2f",
    'x-rapidapi-host': "cricbuzz-cricket2.p.rapidapi.com"
}

# Routes
@app.route('/')
def index():
    """Render the main dashboard page"""
    return render_template('index.html')

@app.route('/api/matches/live')
def live_matches():
    """API endpoint for live matches"""
    try:
        data = get_live_matches()
        matches = parse_matches(data)
        return jsonify(matches)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/matches/upcoming')
def upcoming_matches():
    """API endpoint for upcoming matches"""
    try:
        data = fetch_cricket_matches()
        matches = parse_upcoming_matches(data)
        return jsonify(matches)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/matches/recent')
def recent_matches():
    """API endpoint for recent matches"""
    try:
        data = get_recent_matches()
        matches = parse_recent_matches(data)
        return jsonify(matches)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/matches/<match_id>/scorecard')
def match_scorecard(match_id):
    """API endpoint for match scorecard"""
    try:
        data = get_match_scorecard(match_id)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# API Functions
def get_live_matches():
    """Fetch live cricket matches from API"""
    conn = http.client.HTTPSConnection("cricbuzz-cricket2.p.rapidapi.com")
    conn.request("GET", "/matches/v1/live", headers=HEADERS)
    res = conn.getresponse()
    data = json.loads(res.read().decode("utf-8"))
    return data

def fetch_cricket_matches():
    """Fetch upcoming cricket matches from API"""
    conn = http.client.HTTPSConnection("cricbuzz-cricket2.p.rapidapi.com")
    conn.request("GET", "/matches/v1/upcoming", headers=HEADERS)
    res = conn.getresponse()
    data = res.read()
    return json.loads(data.decode("utf-8"))

def get_recent_matches():
    """Fetch recent cricket matches from API"""
    conn = http.client.HTTPSConnection("cricbuzz-cricket2.p.rapidapi.com")
    conn.request("GET", "/matches/v1/recent", headers=HEADERS)
    res = conn.getresponse()
    data = res.read()
    return json.loads(data.decode("utf-8"))

def get_match_scorecard(match_id):
    """Fetch scorecard for a specific match"""
    conn = http.client.HTTPSConnection("cricbuzz-cricket2.p.rapidapi.com")
    conn.request("GET", f"/matches/v1/{match_id}/scorecard", headers=HEADERS)
    res = conn.getresponse()
    data = res.read()
    return json.loads(data.decode("utf-8"))

# Data parsing functions
def parse_matches(data):
    """Parse live matches data"""
    live_matches = []
    
    for match_type in data.get('typeMatches', []):
        for series in match_type.get('seriesMatches', []):
            if 'adDetail' in series:  # Skip ads
                continue
                
            series_data = series['seriesAdWrapper']
            for match in series_data.get('matches', []):
                match_info = match['matchInfo']
                if match_info['state'] == "In Progress":
                    match_details = {
                        'id': match_info['matchId'],
                        'series': series_data['seriesName'],
                        'matchNumber': match_info.get('matchDesc', ''),
                        'group': match_info.get('groupName', ''),
                        'matchType': match_info['matchFormat'],
                        'team1': {
                            'id': match_info['team1']['teamId'],
                            'name': match_info['team1']['teamName'],
                            'shortName': match_info['team1']['teamSName']
                        },
                        'team2': {
                            'id': match_info['team2']['teamId'],
                            'name': match_info['team2']['teamName'],
                            'shortName': match_info['team2']['teamSName']
                        },
                        'venue': f"{match_info['venueInfo']['ground']}, {match_info['venueInfo']['city']}",
                        'time': datetime.fromtimestamp(int(match_info['startDate'])/1000).strftime('%H:%M %p Local'),
                        'status': 'LIVE'
                    }
                    
                    # Get scores if available
                    if 'matchScore' in match:
                        if 'team1Score' in match['matchScore']:
                            innings = match['matchScore']['team1Score'].get('inngs1', {})
                            match_details['team1']['score'] = f"{innings.get('runs', 0)}/{innings.get('wickets', 0)} ({innings.get('overs', 0)})"
                        
                        if 'team2Score' in match['matchScore']:
                            innings = match['matchScore']['team2Score'].get('inngs1', {})
                            match_details['team2']['score'] = f"{innings.get('runs', 0)}/{innings.get('wickets', 0)} ({innings.get('overs', 0)})"
                    
                    live_matches.append(match_details)
    
    return live_matches

def parse_upcoming_matches(data):
    """Parse upcoming matches data"""
    upcoming_matches = []
    
    for match_type in data.get('typeMatches', []):
        for series in match_type.get('seriesMatches', []):
            if 'seriesAdWrapper' not in series:
                continue
            
            series_data = series['seriesAdWrapper']
            for match in series_data.get('matches', []):
                match_info = match['matchInfo']
                
                # Skip matches that are not upcoming
                if match_info.get('state') != "Upcoming":
                    continue
                
                match_details = {
                    'id': match_info['matchId'],
                    'series': series_data['seriesName'],
                    'matchNumber': match_info.get('matchDesc', ''),
                    'group': match_info.get('groupName', ''),
                    'matchType': match_info['matchFormat'],
                    'team1': {
                        'id': match_info['team1']['teamId'],
                        'name': match_info['team1']['teamName'],
                        'shortName': match_info['team1']['teamSName']
                    },
                    'team2': {
                        'id': match_info['team2']['teamId'],
                        'name': match_info['team2']['teamName'],
                        'shortName': match_info['team2']['teamSName']
                    },
                    'venue': f"{match_info['venueInfo']['ground']}, {match_info['venueInfo']['city']}",
                    'time': format_match_time(match_info['startDate']),
                    'status': 'UPCOMING'
                }
                
                upcoming_matches.append(match_details)
    
    return upcoming_matches

def parse_recent_matches(data):
    """Parse recent matches data"""
    recent_matches = []
    
    for match_type in data.get('typeMatches', []):
        for series in match_type.get('seriesMatches', []):
            if 'seriesAdWrapper' not in series:
                continue
            
            series_data = series['seriesAdWrapper']
            for match in series_data.get('matches', []):
                match_info = match['matchInfo']
                
                # Skip matches that are not completed
                if match_info.get('state') != "Complete":
                    continue
                
                match_details = {
                    'id': match_info['matchId'],
                    'series': series_data['seriesName'],
                    'matchNumber': match_info.get('matchDesc', ''),
                    'group': match_info.get('groupName', ''),
                    'matchType': match_info['matchFormat'],
                    'team1': {
                        'id': match_info['team1']['teamId'],
                        'name': match_info['team1']['teamName'],
                        'shortName': match_info['team1']['teamSName']
                    },
                    'team2': {
                        'id': match_info['team2']['teamId'],
                        'name': match_info['team2']['teamName'],
                        'shortName': match_info['team2']['teamSName']
                    },
                    'venue': f"{match_info['venueInfo']['ground']}, {match_info['venueInfo']['city']}",
                    'time': format_match_time(match_info['startDate'], True),
                    'status': 'COMPLETED',
                    'result': match_info.get('status', '')
                }
                
                # Get scores if available
                if 'matchScore' in match:
                    if 'team1Score' in match['matchScore']:
                        innings = match['matchScore']['team1Score'].get('inngs1', {})
                        match_details['team1']['score'] = f"{innings.get('runs', 0)}/{innings.get('wickets', 0)} ({innings.get('overs', 0)})"
                    
                    if 'team2Score' in match['matchScore']:
                        innings = match['matchScore']['team2Score'].get('inngs1', {})
                        match_details['team2']['score'] = f"{innings.get('runs', 0)}/{innings.get('wickets', 0)} ({innings.get('overs', 0)})"
                
                recent_matches.append(match_details)
    
    return recent_matches

def format_match_time(timestamp, is_past=False):
    """Format timestamp for display"""
    dt = datetime.fromtimestamp(int(timestamp)/1000)
    today = datetime.now()
    
    if dt.date() == today.date():
        return f"Today, {dt.strftime('%H:%M %p')} Local"
    elif dt.date() == today.date() + timedelta(days=1):  #datetime.
        return f"Tomorrow, {dt.strftime('%H:%M %p')} Local"
    elif dt.date() == today.date() - timedelta(days=1) and is_past: #datetime.
        return f"Yesterday, {dt.strftime('%H:%M %p')} Local"
    else:
        return f"{dt.strftime('%b %d')}, {dt.strftime('%H:%M %p')} Local"
    









if __name__ == '__main__':
    app.run(debug=True)