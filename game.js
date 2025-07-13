// Estado do jogo
let gameState = {
    currentScreen: 'start',
    attributes: {
        people: 50,
        treasury: 50,
        army: 50,
        church: 50
    },
    decisionCount: 0,
    currentScenario: null,
    isDemo: false,
    apiKey: null,
    genAI: null
};

// Cenários demo
const demoScenarios = [
    {
        character: "Conselheiro Real",
        scenario: "Vossa Majestade, os impostos estão muito altos e o povo está descontente. Como devemos proceder?",
        option1: {
            text: "Reduzir os impostos",
            effects: { people: 15, treasury: -10, army: 0, church: 0 }
        },
        option2: {
            text: "Manter os impostos",
            effects: { people: -10, treasury: 5, army: 0, church: 5 }
        }
    },
    {
        character: "General do Exército",
        scenario: "Senhor, nossos vizinhos estão se armando. Devemos fortalecer nossas defesas?",
        option1: {
            text: "Investir no exército",
            effects: { people: -5, treasury: -15, army: 20, church: 0 }
        },
        option2: {
            text: "Buscar diplomacia",
            effects: { people: 10, treasury: 0, army: -5, church: 5 }
        }
    },
    {
        character: "Alto Sacerdote",
        scenario: "Vossa Majestade, há rumores de heresia se espalhando pelo reino. Como devemos proceder?",
        option1: {
            text: "Investigar discretamente",
            effects: { people: 5, treasury: -5, army: 0, church: 10 }
        },
        option2: {
            text: "Ignorar os rumores",
            effects: { people: 0, treasury: 0, army: 0, church: -15 }
        }
    },
    {
        character: "Mercador",
        scenario: "Majestade, uma nova rota comercial se abriu. Devemos investir?",
        option1: {
            text: "Investir na rota",
            effects: { people: 5, treasury: 15, army: 0, church: -5 }
        },
        option2: {
            text: "Manter comércio atual",
            effects: { people: 0, treasury: 0, army: 0, church: 0 }
        }
    },
    {
        character: "Camponês",
        scenario: "Senhor, a colheita foi ruim este ano. O povo passa fome. O que faremos?",
        option1: {
            text: "Distribuir comida do tesouro",
            effects: { people: 20, treasury: -15, army: 0, church: 5 }
        },
        option2: {
            text: "Pedir ajuda à igreja",
            effects: { people: 10, treasury: 0, army: 0, church: 10 }
        }
    }
];

// Salvar progresso
function saveGame() {
    const saveData = {
        attributes: gameState.attributes,
        decisionCount: gameState.decisionCount,
        currentScenario: gameState.currentScenario,
        timestamp: Date.now(),
        version: '1.0'
    };
    
    try {
        localStorage.setItem('reigns-game-save', JSON.stringify(saveData));
        console.log('Jogo salvo automaticamente');
    } catch (e) {
        console.error('Erro ao salvar jogo:', e);
    }
}

// Carregar progresso
function loadGame() {
    const saved = localStorage.getItem('reigns-game-save');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            
            // Verificar se o save é válido
            if (data.version && data.attributes && data.decisionCount !== undefined) {
                gameState.attributes = data.attributes;
                gameState.decisionCount = data.decisionCount;
                
                // Se há um cenário salvo, restaurá-lo
                if (data.currentScenario) {
                    gameState.currentScenario = data.currentScenario;
                }
                
                updateAttributeDisplay();
                updateDecisionCount();
                
                // Mostrar mensagem de carregamento
                console.log(`Save carregado: ${data.decisionCount} decisões tomadas`);
                return true;
            }
        } catch (e) {
            console.error('Erro ao carregar save:', e);
            localStorage.removeItem('reigns-game-save'); // Remove save corrompido
        }
    }
    return false;
}

// Verificar se há save disponível
function hasSavedGame() {
    const saved = localStorage.getItem('reigns-game-save');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            return data.version && data.attributes && data.decisionCount !== undefined;
        } catch (e) {
            return false;
        }
    }
    return false;
}

// Atualizar display dos atributos
function updateAttributeDisplay() {
    const attrs = ['people', 'treasury', 'army', 'church'];
    attrs.forEach(attr => {
        const value = gameState.attributes[attr];
        const valueEl = document.getElementById(`${attr}-value`);
        const fillEl = document.getElementById(`${attr}-fill`);
        
        if (valueEl) valueEl.textContent = value;
        if (fillEl) {
            fillEl.style.width = `${value}%`;
            // Cores baseadas no valor
            if (value <= 20) fillEl.style.backgroundColor = '#ff4757';
            else if (value >= 80) fillEl.style.backgroundColor = '#ffa502';
            else fillEl.style.backgroundColor = '#2ed573';
        }
    });
}

// Atualizar contador de decisões
function updateDecisionCount() {
    const countEl = document.getElementById('decision-count');
    if (countEl) countEl.textContent = gameState.decisionCount;
}

// Mostrar tela
function showScreen(screenName) {
    // Remover classe active de todas as telas
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    // Adicionar classe active à tela específica
    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        gameState.currentScreen = screenName;
    }
}

// Iniciar jogo
function startGame() {
    gameState.isDemo = true;
    gameState.attributes = { people: 50, treasury: 50, army: 50, church: 50 };
    gameState.decisionCount = 0;
    
    showScreen('game');
    updateAttributeDisplay();
    updateDecisionCount();
    loadNewScenario();
}

// Carregar novo cenário
function loadNewScenario() {
    const scenario = demoScenarios[Math.floor(Math.random() * demoScenarios.length)];
    gameState.currentScenario = scenario;
    displayScenario(scenario);
}

// Exibir cenário
function displayScenario(scenario) {
    const characterNameEl = document.getElementById('character-name');
    const scenarioTextEl = document.getElementById('scenario-text');
    const leftTextEl = document.getElementById('left-text');
    const rightTextEl = document.getElementById('right-text');
    
    if (characterNameEl) characterNameEl.textContent = scenario.character;
    if (scenarioTextEl) scenarioTextEl.textContent = scenario.scenario;
    if (leftTextEl) leftTextEl.textContent = scenario.option1.text;
    if (rightTextEl) rightTextEl.textContent = scenario.option2.text;
    
    // Mostrar imagem placeholder
    const imageEl = document.getElementById('character-img');
    const loadingEl = document.getElementById('image-loading');
    if (imageEl) imageEl.style.display = 'none';
    if (loadingEl) {
        loadingEl.style.display = 'flex';
        loadingEl.innerHTML = '<div style="font-size: 48px;">👤</div>';
    }
}

// Fazer decisão
function makeDecision(choice) {
    if (!gameState.currentScenario) return;
    
    const effects = choice === 'left' ? 
        gameState.currentScenario.option1.effects : 
        gameState.currentScenario.option2.effects;
    
    // Aplicar efeitos
    Object.keys(effects).forEach(attr => {
        gameState.attributes[attr] = Math.max(0, Math.min(100, 
            gameState.attributes[attr] + effects[attr]));
    });
    
    gameState.decisionCount++;
    
    // Salvar progresso
    saveGame();
    
    // Atualizar display
    updateAttributeDisplay();
    updateDecisionCount();
    
    // Verificar fim de jogo
    if (checkGameOver()) {
        showGameOver();
        return;
    }
    
    // Carregar próximo cenário
    setTimeout(() => {
        loadNewScenario();
    }, 1000);
}

// Verificar fim de jogo
function checkGameOver() {
    return Object.values(gameState.attributes).some(value => value <= 0 || value >= 100);
}

// Mostrar fim de jogo
function showGameOver() {
    const cause = Object.entries(gameState.attributes)
        .find(([attr, value]) => value <= 0 || value >= 100);
    
    let message = "Seu reinado chegou ao fim...";
    if (cause) {
        const [attr, value] = cause;
        const attrNames = {
            people: 'Povo',
            treasury: 'Tesouro', 
            army: 'Exército',
            church: 'Igreja'
        };
        
        if (value <= 0) {
            message = `${attrNames[attr]} chegou ao mínimo! O reino entrou em colapso.`;
        } else {
            message = `${attrNames[attr]} ficou muito poderoso! Você perdeu o controle.`;
        }
    }
    
    const endTextEl = document.getElementById('end-text');
    const finalDecisionsEl = document.getElementById('final-decisions');
    const endCauseEl = document.getElementById('end-cause');
    
    if (endTextEl) endTextEl.innerHTML = `<p>${message}</p>`;
    if (finalDecisionsEl) finalDecisionsEl.textContent = gameState.decisionCount;
    if (endCauseEl) endCauseEl.textContent = cause ? 
        `${cause[1] <= 0 ? 'Colapso' : 'Excesso'} de ${cause[0]}` : 'Desconhecida';
    
    showScreen('end');
}

// Reiniciar jogo
function restartGame() {
    localStorage.removeItem('reigns-game-save');
    startGame();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se há save e mostrar botão de continuar
    if (hasSavedGame()) {
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.textContent = '▶️ Continuar Reinado';
            startBtn.title = 'Continuar jogo salvo';
        }
        
        // Adicionar botão de novo jogo
        const aboutBtn = document.getElementById('about-btn');
        if (aboutBtn && aboutBtn.parentNode) {
            const newGameBtn = document.createElement('button');
            newGameBtn.className = 'btn btn-secondary';
            newGameBtn.textContent = '🆕 Novo Reinado';
            newGameBtn.addEventListener('click', function() {
                if (confirm('Isso apagará seu progresso atual. Deseja continuar?')) {
                    localStorage.removeItem('reigns-game-save');
                    startGame();
                }
            });
            aboutBtn.parentNode.insertBefore(newGameBtn, aboutBtn);
        }
    }
    
    // Botões principais
    const startBtn = document.getElementById('start-btn');
    const aboutBtn = document.getElementById('about-btn');
    const backStartBtn = document.getElementById('back-start-btn');
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            if (hasSavedGame()) {
                // Carregar jogo salvo
                if (loadGame()) {
                    showScreen('game');
                    if (gameState.currentScenario) {
                        displayScenario(gameState.currentScenario);
                    } else {
                        loadNewScenario();
                    }
                } else {
                    startGame();
                }
            } else {
                startGame();
            }
        });
    }
    
    if (aboutBtn) aboutBtn.addEventListener('click', () => showScreen('about'));
    if (backStartBtn) backStartBtn.addEventListener('click', () => showScreen('start'));
    
    // Botões de decisão
    const leftBtn = document.getElementById('left-decision');
    const rightBtn = document.getElementById('right-decision');
    
    if (leftBtn) leftBtn.addEventListener('click', () => makeDecision('left'));
    if (rightBtn) rightBtn.addEventListener('click', () => makeDecision('right'));
    
    // Botões de fim de jogo
    const restartBtn = document.getElementById('restart-btn');
    const backMenuBtn = document.getElementById('back-menu-btn');
    
    if (restartBtn) restartBtn.addEventListener('click', restartGame);
    if (backMenuBtn) backMenuBtn.addEventListener('click', () => showScreen('start'));
    
    // Botão de menu no jogo
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) menuBtn.addEventListener('click', () => showScreen('start'));
    
    // Tentar carregar save
    if (loadGame()) {
        console.log('Save carregado com sucesso');
    }
    
    console.log('Jogo inicializado com sucesso!');
});

