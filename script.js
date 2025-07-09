// Estado global do jogo
const gameState = {
    currentScreen: 'start',
    attributes: {
        people: 50,
        treasury: 50,
        army: 50,
        church: 50
    },
    decisionCount: 0,
    currentScenario: null,
    gameEnded: false,
    apiKey: null,
    demoMode: false
};

// Cenários de demonstração (fallback quando não há API)
const demoScenarios = [
    {
        character: "Conselheiro Real",
        scenario: "Meu senhor, os cofres do reino estão cheios, mas o povo reclama dos altos impostos. O que devemos fazer?",
        option1: {
            text: "Reduzir os impostos",
            effects: { people: 10, treasury: -15, army: 0, church: 5 }
        },
        option2: {
            text: "Manter os impostos",
            effects: { people: -8, treasury: 5, army: 3, church: -2 }
        }
    },
    {
        character: "General do Exército",
        scenario: "Senhor, nossos vizinhos estão se armando. Devemos fortalecer nosso exército ou buscar a diplomacia?",
        option1: {
            text: "Fortalecer o exército",
            effects: { people: -5, treasury: -10, army: 15, church: 0 }
        },
        option2: {
            text: "Buscar diplomacia",
            effects: { people: 8, treasury: -3, army: -5, church: 5 }
        }
    },
    {
        character: "Alto Sacerdote",
        scenario: "Vossa Majestade, há rumores de heresia se espalhando pelo reino. Como devemos proceder?",
        option1: {
            text: "Investigar discretamente",
            effects: { people: 3, treasury: -2, army: 0, church: 8 }
        },
        option2: {
            text: "Ignorar os rumores",
            effects: { people: 5, treasury: 0, army: 0, church: -10 }
        }
    },
    {
        character: "Mercador",
        scenario: "Majestade, uma nova rota comercial se abriu, mas requer investimento inicial. Vale a pena o risco?",
        option1: {
            text: "Investir na rota",
            effects: { people: 5, treasury: -8, army: 0, church: 0 }
        },
        option2: {
            text: "Manter comércio atual",
            effects: { people: -2, treasury: 3, army: 0, church: 0 }
        }
    },
    {
        character: "Camponês",
        scenario: "Senhor, a colheita foi ruim este ano. O povo está com fome. Podeis nos ajudar?",
        option1: {
            text: "Distribuir comida dos estoques",
            effects: { people: 15, treasury: -12, army: 0, church: 8 }
        },
        option2: {
            text: "Pedir paciência ao povo",
            effects: { people: -10, treasury: 0, army: -3, church: -5 }
        }
    }
];

// Elementos DOM
const elements = {
    screens: {
        start: document.getElementById('start-screen'),
        game: document.getElementById('game-screen'),
        end: document.getElementById('end-screen'),
        about: document.getElementById('about-screen')
    },
    buttons: {
        start: document.getElementById('start-btn'),
        about: document.getElementById('about-btn'),
        backStart: document.getElementById('back-start-btn'),
        menu: document.getElementById('menu-btn'),
        restart: document.getElementById('restart-btn'),
        backMenu: document.getElementById('back-menu-btn'),
        leftDecision: document.getElementById('left-decision'),
        rightDecision: document.getElementById('right-decision')
    },
    attributes: {
        people: {
            fill: document.getElementById('people-fill'),
            value: document.getElementById('people-value')
        },
        treasury: {
            fill: document.getElementById('treasury-fill'),
            value: document.getElementById('treasury-value')
        },
        army: {
            fill: document.getElementById('army-fill'),
            value: document.getElementById('army-value')
        },
        church: {
            fill: document.getElementById('church-fill'),
            value: document.getElementById('church-value')
        }
    },
    game: {
        characterImg: document.getElementById('character-img'),
        characterName: document.getElementById('character-name'),
        scenarioText: document.getElementById('scenario-text'),
        leftText: document.getElementById('left-text'),
        rightText: document.getElementById('right-text'),
        decisionCount: document.getElementById('decision-count'),
        imageLoading: document.getElementById('image-loading')
    },
    end: {
        title: document.getElementById('end-title'),
        icon: document.getElementById('end-icon'),
        text: document.getElementById('end-text'),
        decisions: document.getElementById('final-decisions'),
        cause: document.getElementById('end-cause')
    },
    modal: {
        apiModal: document.getElementById('api-modal'),
        modalOverlay: document.getElementById('modal-overlay'),
        apiKeyInput: document.getElementById('api-key-input'),
        saveApiKey: document.getElementById('save-api-key'),
        demoMode: document.getElementById('demo-mode'),
        closeApiModal: document.getElementById('close-api-modal')
    },
    loading: {
        overlay: document.getElementById('loading-overlay'),
        text: document.getElementById('loading-text')
    }
};

// Inicialização do jogo
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupEventListeners();
    updateAttributeDisplay();
});

function initializeGame() {
    // Verificar se há chave API salva
    const savedApiKey = localStorage.getItem('gemini-api-key');
    if (savedApiKey) {
        gameState.apiKey = savedApiKey;
    }
    
    showScreen('start');
}

function setupEventListeners() {
    // Botões de navegação
    elements.buttons.start.addEventListener('click', startGame);
    elements.buttons.about.addEventListener('click', () => showScreen('about'));
    elements.buttons.backStart.addEventListener('click', () => showScreen('start'));
    elements.buttons.menu.addEventListener('click', () => showScreen('start'));
    elements.buttons.restart.addEventListener('click', restartGame);
    elements.buttons.backMenu.addEventListener('click', () => showScreen('start'));
    
    // Botões de decisão
    elements.buttons.leftDecision.addEventListener('click', () => makeDecision('left'));
    elements.buttons.rightDecision.addEventListener('click', () => makeDecision('right'));
    
    // Modal da API
    elements.modal.saveApiKey.addEventListener('click', saveApiKey);
    elements.modal.demoMode.addEventListener('click', startDemoMode);
    elements.modal.closeApiModal.addEventListener('click', closeApiModal);
    elements.modal.modalOverlay.addEventListener('click', closeApiModal);
    
    // Enter no input da API
    elements.modal.apiKeyInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveApiKey();
        }
    });
}

function showScreen(screenName) {
    // Esconder todas as telas
    Object.values(elements.screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar tela solicitada
    elements.screens[screenName].classList.add('active');
    gameState.currentScreen = screenName;
}

function startGame() {
    if (!gameState.apiKey && !gameState.demoMode) {
        showApiModal();
        return;
    }
    
    // Resetar estado do jogo
    gameState.attributes = { people: 50, treasury: 50, army: 50, church: 50 };
    gameState.decisionCount = 0;
    gameState.gameEnded = false;
    gameState.currentScenario = null;
    
    showScreen('game');
    updateAttributeDisplay();
    loadNewScenario();
}

function restartGame() {
    startGame();
}

function showApiModal() {
    elements.modal.apiModal.classList.remove('hidden');
    elements.modal.modalOverlay.classList.remove('hidden');
    elements.modal.apiKeyInput.focus();
}

function closeApiModal() {
    elements.modal.apiModal.classList.add('hidden');
    elements.modal.modalOverlay.classList.add('hidden');
}

function saveApiKey() {
    const apiKey = elements.modal.apiKeyInput.value.trim();
    if (apiKey) {
        gameState.apiKey = apiKey;
        localStorage.setItem('gemini-api-key', apiKey);
        closeApiModal();
        startGame();
    } else {
        alert('Por favor, insira uma chave API válida.');
    }
}

function startDemoMode() {
    gameState.demoMode = true;
    closeApiModal();
    startGame();
}

function updateAttributeDisplay() {
    Object.keys(gameState.attributes).forEach(attr => {
        const value = Math.max(0, Math.min(100, gameState.attributes[attr]));
        elements.attributes[attr].fill.style.width = value + '%';
        elements.attributes[attr].value.textContent = value;
        
        // Atualizar cor da barra baseada no valor
        const fill = elements.attributes[attr].fill;
        if (value < 20 || value > 80) {
            fill.style.background = 'linear-gradient(90deg, #ff6b6b, #ff4757)';
        } else if (value < 40 || value > 60) {
            fill.style.background = 'linear-gradient(90deg, #ffa502, #ff6348)';
        } else {
            fill.style.background = 'linear-gradient(90deg, #2ed573, #1e90ff)';
        }
    });
    
    elements.game.decisionCount.textContent = gameState.decisionCount;
}

function checkGameEnd() {
    const attrs = gameState.attributes;
    
    // Verificar se algum atributo atingiu valores críticos
    for (const [attr, value] of Object.entries(attrs)) {
        if (value <= 0 || value >= 100) {
            endGame(attr, value <= 0 ? 'low' : 'high');
            return true;
        }
    }
    
    return false;
}

function endGame(attribute, level) {
    gameState.gameEnded = true;
    
    const endMessages = {
        people: {
            low: {
                title: "💀 Revolução Popular",
                text: "O povo se revoltou contra seu governo! Sua negligência com as necessidades populares levou a uma revolução sangrenta que derrubou seu reinado.",
                icon: "⚰️"
            },
            high: {
                title: "🔥 Anarquia Total",
                text: "O povo ganhou poder demais! Sem autoridade central, o reino mergulhou na anarquia e você perdeu todo o controle.",
                icon: "🔥"
            }
        },
        treasury: {
            low: {
                title: "💸 Falência do Reino",
                text: "Os cofres estão vazios! Sem recursos para manter o reino funcionando, você foi forçado a abdicar do trono.",
                icon: "💸"
            },
            high: {
                title: "💰 Corrupção Desenfreada",
                text: "O excesso de riqueza corrompeu completamente a corte! A ganância destruiu a moral do reino e causou sua queda.",
                icon: "💰"
            }
        },
        army: {
            low: {
                title: "⚔️ Invasão Inimiga",
                text: "Sem defesas adequadas, o reino foi conquistado por forças inimigas! Sua negligência militar custou a independência do reino.",
                icon: "⚔️"
            },
            high: {
                title: "🛡️ Ditadura Militar",
                text: "O exército ganhou poder demais e tomou o controle! Os generais derrubaram você em um golpe militar.",
                icon: "🛡️"
            }
        },
        church: {
            low: {
                title: "😈 Heresia e Caos",
                text: "A fé se perdeu completamente! Sem a influência estabilizadora da igreja, o reino mergulhou no caos espiritual.",
                icon: "😈"
            },
            high: {
                title: "⛪ Teocracia Opressora",
                text: "A igreja assumiu o controle total! Os sacerdotes derrubaram você e estabeleceram uma teocracia opressiva.",
                icon: "⛪"
            }
        }
    };
    
    const endData = endMessages[attribute][level];
    
    elements.end.title.textContent = endData.title;
    elements.end.icon.textContent = endData.icon;
    elements.end.text.innerHTML = `<p>${endData.text}</p>`;
    elements.end.decisions.textContent = gameState.decisionCount;
    elements.end.cause.textContent = endData.title.replace(/[^\w\s]/gi, '').trim();
    
    setTimeout(() => {
        showScreen('end');
    }, 1500);
}

async function loadNewScenario() {
    if (gameState.gameEnded) return;
    
    showLoading("Gerando novo cenário...");
    
    try {
        let scenario;
        
        if (gameState.demoMode || !gameState.apiKey) {
            // Modo demo - usar cenários pré-definidos
            scenario = demoScenarios[Math.floor(Math.random() * demoScenarios.length)];
        } else {
            // Usar API para gerar cenário
            scenario = await generateScenarioWithAI();
        }
        
        gameState.currentScenario = scenario;
        displayScenario(scenario);
        
        // Gerar imagem do personagem
        if (!gameState.demoMode && gameState.apiKey) {
            generateCharacterImage(scenario.character);
        } else {
            // Modo demo - usar placeholder
            showPlaceholderImage();
        }
        
    } catch (error) {
        console.error('Erro ao carregar cenário:', error);
        // Fallback para modo demo
        const scenario = demoScenarios[Math.floor(Math.random() * demoScenarios.length)];
        gameState.currentScenario = scenario;
        displayScenario(scenario);
        showPlaceholderImage();
    } finally {
        hideLoading();
    }
}

function displayScenario(scenario) {
    elements.game.characterName.textContent = scenario.character;
    elements.game.scenarioText.innerHTML = `<p>${scenario.scenario}</p>`;
    elements.game.leftText.textContent = scenario.option1.text;
    elements.game.rightText.textContent = scenario.option2.text;
    
    // Habilitar botões de decisão
    elements.buttons.leftDecision.disabled = false;
    elements.buttons.rightDecision.disabled = false;
}

function showPlaceholderImage() {
    elements.game.characterImg.style.display = 'none';
    elements.game.imageLoading.style.display = 'flex';
    elements.game.imageLoading.innerHTML = '<div class="character-placeholder">👤</div>';
}

async function generateScenarioWithAI() {
    const prompt = `Crie um cenário para um jogo estilo Reigns. O jogador é um regente medieval. 
    
    Contexto atual:
    - Povo: ${gameState.attributes.people}/100
    - Tesouro: ${gameState.attributes.treasury}/100  
    - Exército: ${gameState.attributes.army}/100
    - Igreja: ${gameState.attributes.church}/100
    - Decisões tomadas: ${gameState.decisionCount}
    
    Crie um cenário interessante com um personagem que apresenta um dilema. 
    Forneça duas opções de resposta e os efeitos de cada uma nos atributos (valores entre -20 e +20).
    
    Responda APENAS com um JSON válido no formato:
    {
        "character": "Nome do Personagem",
        "scenario": "Descrição do cenário e dilema",
        "option1": {
            "text": "Primeira opção",
            "effects": {"people": 0, "treasury": 0, "army": 0, "church": 0}
        },
        "option2": {
            "text": "Segunda opção", 
            "effects": {"people": 0, "treasury": 0, "army": 0, "church": 0}
        }
    }`;
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${gameState.apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        })
    });
    
    if (!response.ok) {
        throw new Error('Erro na API do Gemini');
    }
    
    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    // Extrair JSON da resposta
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Resposta da IA não contém JSON válido');
    }
    
    return JSON.parse(jsonMatch[0]);
}

// Imagens de personagens pré-geradas
const characterImages = {
    'Conselheiro Real': 'character_advisor.png',
    'General do Exército': 'character_general.png', 
    'Alto Sacerdote': 'character_priest.png',
    'Mercador': 'character_advisor.png', // Fallback
    'Camponês': 'character_advisor.png' // Fallback
};

async function generateCharacterImage(characterName) {
    try {
        elements.game.imageLoading.style.display = 'flex';
        elements.game.characterImg.style.display = 'none';
        
        // Verificar se temos uma imagem pré-gerada para este personagem
        const imageName = characterImages[characterName] || 'character_advisor.png';
        const imagePath = imageName;
        
        // Simular um pequeno delay para dar sensação de carregamento
        setTimeout(() => {
            elements.game.characterImg.src = imagePath;
            elements.game.characterImg.style.display = 'block';
            elements.game.imageLoading.style.display = 'none';
            
            // Se a imagem não carregar, mostrar placeholder
            elements.game.characterImg.onerror = function() {
                showPlaceholderImage();
            };
        }, 1000);
        
    } catch (error) {
        console.error('Erro ao carregar imagem:', error);
        showPlaceholderImage();
    }
}

function makeDecision(choice) {
    if (!gameState.currentScenario || gameState.gameEnded) return;
    
    const option = choice === 'left' ? gameState.currentScenario.option1 : gameState.currentScenario.option2;
    
    // Aplicar efeitos da decisão
    Object.keys(option.effects).forEach(attr => {
        gameState.attributes[attr] += option.effects[attr];
        gameState.attributes[attr] = Math.max(0, Math.min(100, gameState.attributes[attr]));
    });
    
    gameState.decisionCount++;
    
    // Desabilitar botões temporariamente
    elements.buttons.leftDecision.disabled = true;
    elements.buttons.rightDecision.disabled = true;
    
    // Atualizar display
    updateAttributeDisplay();
    
    // Verificar fim de jogo
    if (checkGameEnd()) {
        return;
    }
    
    // Carregar próximo cenário após um delay
    setTimeout(() => {
        loadNewScenario();
    }, 2000);
}

function showLoading(message = "Carregando...") {
    elements.loading.text.textContent = message;
    elements.loading.overlay.classList.remove('hidden');
}

function hideLoading() {
    elements.loading.overlay.classList.add('hidden');
}

// Função para limpar dados salvos (útil para desenvolvimento)
function clearSavedData() {
    localStorage.removeItem('gemini-api-key');
    gameState.apiKey = null;
    gameState.demoMode = false;
    alert('Dados salvos limpos!');
}

// Expor função para console (desenvolvimento)
window.clearSavedData = clearSavedData;

