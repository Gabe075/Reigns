# 👑 O Legado do Regente

Um jogo de tomada de decisões no estilo Reigns, onde você governa um reino medieval enfrentando dilemas complexos que afetam o equilíbrio do poder.

## 🎮 Sobre o Jogo

**O Legado do Regente** é inspirado no famoso jogo Reigns, onde cada decisão que você toma como regente afeta quatro pilares fundamentais do reino:

- ❤️ **Povo** - Felicidade e lealdade dos súditos
- 💰 **Tesouro** - Riqueza e recursos do reino  
- ⚔️ **Exército** - Força militar e defesa
- ⛪ **Igreja** - Poder religioso e influência espiritual

### 🎯 Objetivo

Mantenha o equilíbrio entre os quatro pilares. Se qualquer atributo atingir 0 ou 100, seu reinado chegará ao fim! Cada decisão tem consequências que podem fortalecer alguns aspectos enquanto enfraquecem outros.

## 🤖 Tecnologia e IA

O jogo oferece duas experiências:

### 🔮 Modo IA (Recomendado)
- Utiliza a **API do Google Gemini** para gerar cenários únicos e dinâmicos
- Cada partida oferece situações completamente novas e imprevisíveis
- Personagens e dilemas criados em tempo real pela inteligência artificial
- Imagens dos personagens geradas automaticamente

### 🎭 Modo Demo
- Cenários pré-definidos para demonstração
- 5 situações diferentes com personagens clássicos
- Funciona sem necessidade de configuração de API
- Ideal para testar o jogo rapidamente

## 🚀 Como Configurar

### Opção 1: Modo IA (Experiência Completa)

1. **Obter Chave API do Google Gemini:**
   - Acesse [Google AI Studio](https://aistudio.google.com/)
   - Crie uma conta gratuita
   - Gere uma chave API gratuita
   - Copie a chave gerada

2. **Configurar no Jogo:**
   - Clique em "Começar Novo Reinado"
   - Cole sua chave API no campo indicado
   - Clique em "Salvar e Continuar"
   - A chave será salva localmente para futuras sessões

### Opção 2: Modo Demo (Sem Configuração)

1. Clique em "Começar Novo Reinado"
2. Clique em "Modo Demo (sem IA)"
3. Comece a jogar imediatamente!

## 📁 Estrutura do Projeto

```
reigns-game/
├── index.html              # Página principal do jogo
├── style.css               # Estilos e animações
├── script.js               # Lógica do jogo e integração com IA
├── character_advisor.png   # Imagem do conselheiro real
├── character_general.png   # Imagem do general
├── character_priest.png    # Imagem do alto sacerdote
└── README.md              # Este arquivo
```

## 🌐 Como Hospedar no GitHub Pages

### Passo 1: Criar Repositório
1. Acesse [GitHub.com](https://github.com) e faça login
2. Clique em "New repository" (Novo repositório)
3. Nomeie o repositório (ex: `reigns-game`)
4. Marque como **público**
5. Clique em "Create repository"

### Passo 2: Upload dos Arquivos
1. Na página do repositório, clique em "uploading an existing file"
2. Arraste todos os arquivos do jogo para a área de upload
3. Adicione uma mensagem de commit (ex: "Adicionar jogo Reigns")
4. Clique em "Commit changes"

### Passo 3: Ativar GitHub Pages
1. Vá para a aba "Settings" do repositório
2. Role para baixo até a seção "Pages"
3. Em "Source", selecione "Deploy from a branch"
4. Escolha "main" como branch
5. Clique em "Save"

### Passo 4: Acessar o Jogo
- Aguarde alguns minutos para o deploy
- Acesse: `https://seuusuario.github.io/nome-do-repositorio`
- Seu jogo estará online e acessível para todos!

## 🎨 Características Técnicas

### Interface
- Design moderno com gradientes e animações suaves
- Totalmente responsivo (funciona em desktop e mobile)
- Efeitos visuais imersivos com partículas de fundo
- Transições fluidas entre telas e decisões

### Funcionalidades
- Sistema de atributos dinâmico com barras visuais
- Múltiplas condições de fim de jogo
- Contador de decisões tomadas
- Modal de configuração da API
- Armazenamento local da chave API
- Modo offline com cenários pré-definidos

### Compatibilidade
- Funciona em todos os navegadores modernos
- Responsivo para dispositivos móveis
- Não requer instalação ou plugins
- Funciona offline (modo demo)

## 🔧 Personalização

### Adicionar Novos Cenários (Modo Demo)
Edite o array `demoScenarios` no arquivo `script.js`:

```javascript
{
    character: "Nome do Personagem",
    scenario: "Descrição do dilema...",
    option1: {
        text: "Primeira opção",
        effects: { people: 10, treasury: -5, army: 0, church: 3 }
    },
    option2: {
        text: "Segunda opção", 
        effects: { people: -5, treasury: 8, army: 2, church: -3 }
    }
}
```

### Modificar Estilos
- Edite `style.css` para alterar cores, fontes e animações
- As variáveis CSS estão organizadas no início do arquivo
- Todas as animações podem ser customizadas

### Adicionar Imagens de Personagens
- Adicione arquivos PNG na pasta do projeto
- Atualize o objeto `characterImages` no `script.js`
- Use nomes descritivos para fácil identificação

## 🐛 Solução de Problemas

### API não funciona
- Verifique se a chave API está correta
- Confirme que a API do Gemini está ativa na sua conta
- Use o modo demo como alternativa

### Jogo não carrega
- Verifique se todos os arquivos estão no mesmo diretório
- Confirme que o navegador suporta JavaScript
- Abra o console do navegador para ver erros

### GitHub Pages não funciona
- Confirme que o repositório é público
- Verifique se o arquivo se chama exatamente `index.html`
- Aguarde alguns minutos após ativar o Pages

## 📝 Licença

Este projeto é de código aberto e pode ser usado, modificado e distribuído livremente.

## 🎉 Divirta-se!

Agora você tem seu próprio jogo de decisões medieval! Compartilhe com amigos e veja quem consegue manter o reino em equilíbrio por mais tempo.

**Que seu reinado seja longo e próspero! 👑**

