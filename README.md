# 👑 O Legado do Regente

Um jogo de tomada de decisões no estilo Reigns, onde você governa um reino medieval enfrentando dilemas complexos que afetam o equilíbrio do poder.

## 🎮 Funcionalidades

### ✅ **Jogo Totalmente Funcional**
- ⚔️ Sistema de combate por turnos com decisões estratégicas
- 📊 4 atributos dinâmicos (Povo, Tesouro, Exército, Igreja)
- 🎭 5 cenários únicos pré-definidos no modo demo
- 🤖 Integração com API do Google Gemini para cenários gerados por IA
- 💾 **Salvamento automático de progresso no navegador**
- 🔄 Sistema de continuar jogo salvo
- 📱 Interface totalmente responsiva

### 🎯 **Como Jogar**
1. **Objetivo**: Mantenha o equilíbrio entre os 4 pilares do reino
2. **Mecânica**: Cada decisão afeta os atributos de forma diferente
3. **Cuidado**: Extremos (0 ou 100) em qualquer atributo = fim do reinado
4. **Progresso**: Seu jogo é salvo automaticamente a cada decisão

### 🔧 **Duas Experiências de Jogo**

#### 🎯 **Modo Demo (Funciona Imediatamente)**
- 5 cenários pré-definidos e balanceados
- Personagens: Alto Sacerdote, General, Conselheiro Real, Mercador, Camponês
- Não requer configuração adicional

#### 🤖 **Modo IA (Cenários Únicos)**
- Cenários gerados dinamicamente pela API do Google Gemini
- Histórias sempre diferentes e surpreendentes
- Requer chave API gratuita do Google

## 🚀 **Configuração da API (Opcional)**

### **Obter Chave API Gratuita:**
1. Acesse: [Google AI Studio](https://aistudio.google.com/)
2. Faça login com sua conta Google
3. Clique em "Get API Key" → "Create API Key"
4. Copie a chave gerada

### **Usar no Jogo:**
1. Clique em "Começar Novo Reinado"
2. Cole sua chave API no campo
3. Clique em "Salvar e Continuar"
4. Aproveite cenários únicos gerados por IA!

## 📁 **Estrutura do Projeto**

```
reigns-game/
├── index.html          # Página principal
├── style.css           # Estilos e animações
├── game.js             # Lógica do jogo + integração IA
├── character_*.png     # Imagens dos personagens (3 arquivos)
└── README.md           # Este arquivo
```

## 🌐 **Hospedagem no GitHub Pages**

### **Passo a Passo:**
1. **Criar Repositório:**
   - Acesse [GitHub.com](https://github.com)
   - Clique em "New repository"
   - Nome: `meu-jogo-reigns` (ou qualquer nome)
   - Marque "Public"
   - Clique em "Create repository"

2. **Upload dos Arquivos:**
   - Clique em "uploading an existing file"
   - Arraste todos os arquivos do projeto
   - Commit: "Adicionar jogo Reigns"

3. **Ativar GitHub Pages:**
   - Vá em "Settings" → "Pages"
   - Source: "Deploy from a branch"
   - Branch: "main" → "/ (root)"
   - Clique em "Save"

4. **Acessar o Jogo:**
   - URL: `https://seuusuario.github.io/meu-jogo-reigns`
   - Aguarde 2-5 minutos para ativação

## 🔧 **Recursos Técnicos**

### **Salvamento de Progresso:**
- ✅ Salva automaticamente a cada decisão
- ✅ Preserva atributos e contador de decisões
- ✅ Botão "Continuar Reinado" quando há save
- ✅ Opção de "Novo Reinado" para recomeçar

### **Integração de IA:**
- ✅ SDK oficial do Google Gemini
- ✅ Tratamento de erros com fallback para demo
- ✅ Armazenamento seguro da chave API
- ✅ Geração de cenários contextualizados

### **Interface Responsiva:**
- ✅ Funciona em desktop e mobile
- ✅ Animações suaves e feedback visual
- ✅ Barras de atributos coloridas e dinâmicas
- ✅ Design moderno com gradientes

## 🎨 **Personagens Inclusos**
- 🏛️ **Alto Sacerdote** - Questões religiosas e morais
- ⚔️ **General do Exército** - Defesa e conflitos militares
- 👑 **Conselheiro Real** - Política e administração
- 💰 **Mercador** - Economia e comércio
- 🌾 **Camponês** - Questões do povo e agricultura

## 🐛 **Solução de Problemas**

### **Jogo não inicia:**
- Verifique se todos os arquivos estão no mesmo diretório
- Abra o console do navegador (F12) para ver erros

### **API não funciona:**
- Verifique se a chave está correta
- O jogo automaticamente volta para o modo demo em caso de erro

### **Save não funciona:**
- Verifique se o navegador permite localStorage
- Modo privado/incógnito pode bloquear o salvamento

## 📝 **Créditos**
- Desenvolvido com HTML5, CSS3 e JavaScript vanilla
- Integração com Google Gemini AI
- Inspirado no jogo Reigns
- Imagens de personagens geradas por IA

---

**🎉 Divirta-se governando seu reino! Cada decisão importa!**

