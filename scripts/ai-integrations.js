// AI and API Integrations

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== AI Text Generation using Hugging Face API =====
    const generateBtn = document.getElementById('generate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const promptInput = document.getElementById('prompt-input');
    const aiResponse = document.getElementById('ai-response');

    if (generateBtn) {
        generateBtn.addEventListener('click', async () => {
            const prompt = promptInput.value.trim();
            
            if (!prompt) {
                showResponse(aiResponse, 'Please enter a prompt first!', 'error');
                return;
            }

            // Show loading
            generateBtn.disabled = true;
            generateBtn.innerHTML = '<span class="loading"></span> Generating...';
            aiResponse.classList.add('show');
            aiResponse.innerHTML = '<div class="loading"></div> AI is thinking...';

            try {
                // Using Hugging Face Inference API (Free tier)
                const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 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'
                    },
                    body: JSON.stringify({
                        inputs: prompt,
                        parameters: {
                            max_new_tokens: 150,
                            temperature: 0.9,
                            top_p: 0.95,
                            do_sample: true
                        },
                        options: {
                            wait_for_model: true,
                            use_cache: false
                        }
                    })
                });

                const data = await response.json();
                
                // Check if model is loading
                if (data.error && data.error.includes('loading')) {
                    showResponse(aiResponse, '⏳ Model is loading... Please wait 20 seconds and try again.', 'warning');
                    return;
                }

                if (!response.ok || data.error) {
                    const errorMsg = data.error || `API Error: ${response.status}`;
                    console.error('API Error Details:', data);
                    throw new Error(errorMsg);
                }

                const generatedText = data[0]?.generated_text || data.generated_text || 'No response generated';
                
                showResponse(aiResponse, formatAIResponse(generatedText), 'success');
                
            } catch (error) {
                console.error('AI Generation Error:', error);
                
                // Show actual error for debugging
                if (error.message && !error.message.includes('demo')) {
                    showResponse(aiResponse, 
                        `<div style="color: var(--secondary-color); margin-bottom: 1rem;">
                            <i class="fas fa-exclamation-triangle"></i> <strong>API Error:</strong> ${error.message}
                        </div>
                        <div style="color: var(--gray-text); font-size: 0.9rem;">
                            Please check:
                            <ul style="margin-top: 0.5rem;">
                                <li>Your Hugging Face API token is valid</li>
                                <li>The model is not loading (wait 20s and retry)</li>
                                <li>You have internet connection</li>
                            </ul>
                            <strong>Note:</strong> Check browser console (F12) for detailed error logs.
                        </div>`, 
                        'error'
                    );
                    return;
                }
                
                // Fallback demo response only if we want demo mode
                const demoResponses = {
                    'smart home': 'A smart home device that revolutionizes your living space with AI-powered automation. It features voice control, energy monitoring, and seamless integration with IoT ecosystems. The device learns your preferences over time and creates personalized automation routines.',
                    'iot': 'The Internet of Things (IoT) connects physical devices through embedded sensors and software, enabling them to collect and exchange data. IoT systems like smart pet feeders use ESP32 microcontrollers, MQTT protocols for real-time communication, and mobile apps for remote control.',
                    'default': `Based on your prompt: "${prompt}"\n\nThis is a creative AI-powered response demonstrating prompt engineering capabilities. In a production environment, this would connect to advanced language models like GPT-4, Claude, or custom-trained models to generate contextual, accurate responses.\n\nKey aspects of effective prompt engineering:\n1. Clear and specific instructions\n2. Contextual information\n3. Desired output format\n4. Constraints and guidelines`
                };

                let responseText = demoResponses.default;
                for (const key in demoResponses) {
                    if (prompt.toLowerCase().includes(key)) {
                        responseText = demoResponses[key];
                        break;
                    }
                }
                
                showResponse(aiResponse, formatAIResponse(responseText), 'success');
            } finally {
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate';
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            promptInput.value = '';
            aiResponse.classList.remove('show');
            aiResponse.innerHTML = '';
        });
    }

    // ===== Weather API Integration =====
    const weatherBtn = document.getElementById('weather-btn');
    const cityInput = document.getElementById('city-input');
    const weatherResult = document.getElementById('weather-result');

    if (weatherBtn) {
        weatherBtn.addEventListener('click', async () => {
            const city = cityInput.value.trim();
            
            if (!city) {
                showResponse(weatherResult, 'Please enter a city name!', 'error');
                return;
            }

            weatherBtn.disabled = true;
            weatherBtn.innerHTML = '<span class="loading"></span> Loading...';
            weatherResult.classList.add('show');
            weatherResult.innerHTML = '<div class="loading"></div> Fetching weather data...';

            try {
                // Using OpenWeatherMap API (Free tier)
                // Sign up at openweathermap.org for your API key
                const API_KEY = '1a7d1e12beeeeaaa4dab5ffddaebe7a2'; // Replace with your key
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
                );

                if (!response.ok) {
                    throw new Error('City not found');
                }

                const data = await response.json();
                
                const weatherHTML = `
                    <div style="text-align: center;">
                        <h3 style="color: var(--primary-color); margin-bottom: 1rem;">
                            ${data.name}, ${data.sys.country}
                        </h3>
                        <div style="font-size: 3rem; margin: 1rem 0;">
                            ${getWeatherEmoji(data.weather[0].main)}
                        </div>
                        <p style="font-size: 2rem; font-weight: bold; color: var(--primary-color);">
                            ${Math.round(data.main.temp)}°C
                        </p>
                        <p style="text-transform: capitalize; color: var(--gray-text);">
                            ${data.weather[0].description}
                        </p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                            <div>
                                <p style="color: var(--gray-text);">Feels Like</p>
                                <p style="font-weight: bold;">${Math.round(data.main.feels_like)}°C</p>
                            </div>
                            <div>
                                <p style="color: var(--gray-text);">Humidity</p>
                                <p style="font-weight: bold;">${data.main.humidity}%</p>
                            </div>
                            <div>
                                <p style="color: var(--gray-text);">Wind Speed</p>
                                <p style="font-weight: bold;">${data.wind.speed} m/s</p>
                            </div>
                            <div>
                                <p style="color: var(--gray-text);">Pressure</p>
                                <p style="font-weight: bold;">${data.main.pressure} hPa</p>
                            </div>
                        </div>
                    </div>
                `;
                
                weatherResult.innerHTML = weatherHTML;
                
            } catch (error) {
                console.error('Weather API Error:', error);
                // Demo fallback data
                const demoWeather = `
                    <div style="text-align: center;">
                        <h3 style="color: var(--primary-color); margin-bottom: 1rem;">
                            ${city}
                        </h3>
                        <div style="font-size: 3rem; margin: 1rem 0;">
                            ☀️
                        </div>
                        <p style="font-size: 2rem; font-weight: bold; color: var(--primary-color);">
                            28°C
                        </p>
                        <p style="color: var(--gray-text);">
                            Partly cloudy
                        </p>
                        <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--secondary-color);">
                            <i class="fas fa-info-circle"></i> Demo data - In production, this connects to OpenWeatherMap API
                        </p>
                    </div>
                `;
                weatherResult.innerHTML = demoWeather;
            } finally {
                weatherBtn.disabled = false;
                weatherBtn.innerHTML = '<i class="fas fa-search"></i> Get Weather';
            }
        });
    }

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

    console.log('%c🤖 AI Integrations loaded!', 'color: #00d4ff; font-size: 14px;');
    console.log('%c💡 Tip: Get your free API keys from:', 'color: #ff006e; font-size: 12px;');
    console.log('   - Hugging Face: huggingface.co');
    console.log('   - OpenWeather: openweathermap.org');
    console.log('   - NASA: api.nasa.gov');
});
