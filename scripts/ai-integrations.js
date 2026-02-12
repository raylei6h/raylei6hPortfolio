// AI and API Integrations

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== NASA APOD (Astronomy Picture of the Day) =====
    const nasaBtn = document.getElementById('nasa-btn');
    const nasaResult = document.getElementById('nasa-result');

    if (nasaBtn) {
        nasaBtn.addEventListener('click', async () => {
            nasaBtn.disabled = true;
            nasaBtn.innerHTML = '<span class="loading"></span> Loading...';
            nasaResult.classList.add('show');
            nasaResult.innerHTML = '<div class="loading"></div> Fetching space data...';

            try {
                // NASA APOD API (Free, no key required for demo)
                // Get your key at api.nasa.gov
                const API_KEY = 'Xycdxd8BiT86IDpJhXPK69fpYrr6RfGijfGEQsoB'; // Replace with your NASA API key
                const response = await fetch(
                    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
                );

                if (!response.ok) {
                    throw new Error('NASA API request failed');
                }

                const data = await response.json();
                
                const nasaHTML = `
                    <div>
                        <h3 style="color: var(--primary-color); margin-bottom: 1rem;">
                            ${data.title}
                        </h3>
                        <img src="${data.url}" alt="${data.title}" class="nasa-image" 
                             style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
                        <p style="color: var(--gray-text); margin-bottom: 0.5rem;">
                            <strong>Date:</strong> ${data.date}
                        </p>
                        <p style="color: var(--light-text); line-height: 1.6;">
                            ${data.explanation}
                        </p>
                        ${data.copyright ? `<p style="color: var(--gray-text); margin-top: 1rem; font-size: 0.9rem;">
                            © ${data.copyright}
                        </p>` : ''}
                    </div>
                `;
                
                nasaResult.innerHTML = nasaHTML;
                
            } catch (error) {
                console.error('NASA API Error:', error);
                // Demo fallback
                const demoNASA = `
                    <div>
                        <h3 style="color: var(--primary-color); margin-bottom: 1rem;">
                            The Eagle Nebula's Pillars of Creation
                        </h3>
                        <div style="width: 100%; height: 300px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); 
                                  border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                            <i class="fas fa-space-shuttle" style="font-size: 4rem; color: var(--primary-color);"></i>
                        </div>
                        <p style="color: var(--light-text); line-height: 1.6;">
                            The iconic Pillars of Creation, captured by the Hubble Space Telescope. These towering tendrils 
                            of cosmic dust and gas are part of the Eagle Nebula, located 6,500 light-years away in the 
                            constellation Serpens.
                        </p>
                        <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--secondary-color);">
                            <i class="fas fa-info-circle"></i> Demo content - In production, this fetches live data from NASA's APOD API
                        </p>
                    </div>
                `;
                nasaResult.innerHTML = demoNASA;
            } finally {
                nasaBtn.disabled = false;
                nasaBtn.innerHTML = '<i class="fas fa-rocket"></i> Fetch Today\'s Space Image';
            }
        });
    }

    // ===== Random Quote API =====
    const quoteBtn = document.getElementById('quote-btn');
    const quoteResult = document.getElementById('quote-result');

    if (quoteBtn) {
        quoteBtn.addEventListener('click', async () => {
            quoteBtn.disabled = true;
            quoteBtn.innerHTML = '<span class="loading"></span> Loading...';
            quoteResult.classList.add('show');
            quoteResult.innerHTML = '<div class="loading"></div> Fetching inspiration...';

            try {
                const response = await fetch('https://api.quotable.io/random?tags=technology,inspirational');
                
                if (!response.ok) {
                    throw new Error('Quote API request failed');
                }

                const data = await response.json();
                
                const quoteHTML = `
                    <div>
                        <p class="quote-text">"${data.content}"</p>
                        <p class="quote-author">— ${data.author}</p>
                        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(0, 212, 255, 0.3);">
                            <p style="color: var(--gray-text); font-size: 0.9rem;">
                                <i class="fas fa-tags"></i> 
                                ${data.tags.map(tag => `<span style="color: var(--primary-color);">#${tag}</span>`).join(' ')}
                            </p>
                        </div>
                    </div>
                `;
                
                quoteResult.innerHTML = quoteHTML;
                
            } catch (error) {
                console.error('Quote API Error:', error);
                // Fallback quotes
                const demoQuotes = [
                    {
                        content: "The best way to predict the future is to invent it.",
                        author: "Alan Kay",
                        tags: ["technology", "innovation"]
                    },
                    {
                        content: "Innovation distinguishes between a leader and a follower.",
                        author: "Steve Jobs",
                        tags: ["leadership", "innovation"]
                    },
                    {
                        content: "Technology is best when it brings people together.",
                        author: "Matt Mullenweg",
                        tags: ["technology", "community"]
                    }
                ];
                
                const randomQuote = demoQuotes[Math.floor(Math.random() * demoQuotes.length)];
                
                const quoteHTML = `
                    <div>
                        <p class="quote-text">"${randomQuote.content}"</p>
                        <p class="quote-author">— ${randomQuote.author}</p>
                        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(0, 212, 255, 0.3);">
                            <p style="color: var(--gray-text); font-size: 0.9rem;">
                                <i class="fas fa-tags"></i> 
                                ${randomQuote.tags.map(tag => `<span style="color: var(--primary-color);">#${tag}</span>`).join(' ')}
                            </p>
                        </div>
                    </div>
                `;
                
                quoteResult.innerHTML = quoteHTML;
            } finally {
                quoteBtn.disabled = false;
                quoteBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Get Random Quote';
            }
        });
    }

    // Helper Functions
    function showResponse(element, content, type) {
        element.classList.add('show');
        element.innerHTML = content;
        if (type === 'error') {
            element.style.borderColor = 'var(--secondary-color)';
            element.style.background = 'rgba(255, 0, 110, 0.1)';
        } else if (type === 'warning') {
            element.style.borderColor = '#ffa500';
            element.style.background = 'rgba(255, 165, 0, 0.1)';
        } else {
            element.style.borderColor = 'rgba(0, 212, 255, 0.3)';
            element.style.background = 'rgba(0, 212, 255, 0.1)';
        }
    }

    function formatAIResponse(text) {
        // Format the AI response with better styling
        return `
            <div style="line-height: 1.8;">
                <div style="margin-bottom: 1rem;">
                    <i class="fas fa-robot" style="color: var(--primary-color); margin-right: 0.5rem;"></i>
                    <strong style="color: var(--primary-color);">AI Response:</strong>
                </div>
                <p style="color: var(--light-text);">${text}</p>
            </div>
        `;
    }

    function getWeatherEmoji(condition) {
        const emojiMap = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
            'Fog': '🌫️'
        };
        return emojiMap[condition] || '🌤️';
    }

    // Advanced Prompt Engineering Examples with Live Demo
    const exampleCards = document.querySelectorAll('.example-card');
    exampleCards.forEach(card => {
        card.addEventListener('click', () => {
            const promptText = card.querySelector('.example-prompt').textContent;
            promptInput.value = promptText;
            promptInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            promptInput.focus();
            
            // Add highlight effect
            promptInput.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                promptInput.style.animation = '';
            }, 500);
        });

        // Add style for pulse animation
        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
            }
        `;
        if (!document.querySelector('style[data-pulse]')) {
            pulseStyle.setAttribute('data-pulse', 'true');
            document.head.appendChild(pulseStyle);
        }
    });
});
