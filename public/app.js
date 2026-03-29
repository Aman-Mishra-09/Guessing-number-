let currentGameId = null;
const API_BASE_URL = window.location.origin;

// Start a new game
async function startNewGame() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/game/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to start new game');
        }
        
        const data = await response.json();
        currentGameId = data.gameId;
        
        // Reset UI
        document.getElementById('attempts').textContent = data.attemptsLeft;
        document.getElementById('guess-input').value = '';
        document.getElementById('guess-input').disabled = false;
        document.getElementById('guess-button').disabled = false;
        document.getElementById('message').textContent = '';
        document.getElementById('message').className = 'message';
        document.getElementById('history-items').innerHTML = '';
        
        // Focus on input
        document.getElementById('guess-input').focus();
        
        showMessage('Game started! Make your first guess.', 'info');
    } catch (error) {
        console.error('Error starting new game:', error);
        showMessage('Error starting game. Please try again.', 'error');
    }
}

// Make a guess
async function makeGuess() {
    if (!currentGameId) {
        showMessage('Please start a new game first!', 'error');
        return;
    }
    
    const guessInput = document.getElementById('guess-input');
    const guess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(guess) || guess < 1 || guess > 50) {
        showMessage('Please enter a valid number between 1 and 50!', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/game/${currentGameId}/guess`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ guess })
        });
        
        if (!response.ok) {
            throw new Error('Failed to make guess');
        }
        
        const data = await response.json();
        
        // Update attempts
        document.getElementById('attempts').textContent = data.attemptsLeft;
        
        // Add to history
        addToHistory(guess);
        
        // Clear input
        guessInput.value = '';
        
        // Show message based on result
        if (data.status === 'won') {
            showMessage(data.message, 'success');
            endGame();
        } else if (data.status === 'lost') {
            showMessage(data.message, 'error');
            endGame();
        } else {
            // Determine message type based on hint
            let messageType = 'info';
            if (data.hint === 'very_close') {
                messageType = 'warning';
            }
            showMessage(data.message, messageType);
        }
        
        // Focus back on input if game is still playing
        if (data.status === 'playing') {
            guessInput.focus();
        }
        
    } catch (error) {
        console.error('Error making guess:', error);
        showMessage('Error making guess. Please try again.', 'error');
    }
}

// Show message
function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
}

// Add guess to history
function addToHistory(guess) {
    const historyItems = document.getElementById('history-items');
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.textContent = guess;
    historyItems.appendChild(historyItem);
}

// End game
function endGame() {
    document.getElementById('guess-input').disabled = true;
    document.getElementById('guess-button').disabled = true;
}

// Allow Enter key to submit guess
document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guess-input');
    
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            makeGuess();
        }
    });
    
    // Show initial message
    showMessage('Click "Start New Game" to begin!', 'info');
});
