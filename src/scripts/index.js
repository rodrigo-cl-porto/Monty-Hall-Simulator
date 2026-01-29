// Estatísticas globais (salvas no localStorage)
function loadStats() {
    return JSON.parse(localStorage.getItem("montyStats")) || {
        totalGames: 0,
        stayWins: 0,
        switchWins: 0
    };
}

function saveStats(stats) {
    localStorage.setItem("montyStats", JSON.stringify(stats));
}

function resetStats() {
    localStorage.removeItem("montyStats");
    alert("Estatísticas resetadas!");
    location.reload();
}

function updateStatsPanel() {
    const stats = loadStats();

    const panel = document.getElementById("stats");
    if (!panel) return;

    panel.innerHTML = `
        <p><strong>Total de Jogos:</strong> ${stats.totalGames}</p>
        <p><strong>Vitórias mantendo porta:</strong> ${stats.stayWins}</p>
        <p><strong>Vitórias trocando porta:</strong> ${stats.switchWins}</p>
    `;
}

// Monty Hall simples da primeira página
function chooseDoor(doorChosen) {
    const prize = Math.floor(Math.random() * 3) + 1;
    const stats = loadStats();

    const isWin = doorChosen === prize;
    stats.totalGames++;

    if (isWin) stats.stayWins++;
    else stats.switchWins++;

    saveStats(stats);
    updateStatsPanel();

    alert(isWin ? "Você GANHOU!" : "Você perdeu!");
}

// Simulação em massa
function runSimulation() {
    const rounds = parseInt(document.getElementById("rounds").value) || 10000;
    const strategy = document.getElementById("strategy").value;

    const stats = loadStats();

    for (let i = 0; i < rounds; i++) {
        const prize = Math.floor(Math.random() * 3) + 1;
        const choice = Math.floor(Math.random() * 3) + 1;

        // Monty revela porta vazia
        let reveal;
        do {
            reveal = Math.floor(Math.random() * 3) + 1;
        } while (reveal === prize || reveal === choice);

        let finalChoice = choice;
        if (strategy === "switch") {
            for (let d = 1; d <= 3; d++) {
                if (d !== choice && d !== reveal) finalChoice = d;
            }
        }

        const isWin = (finalChoice === prize);

        stats.totalGames++;
        if (strategy === "stay") {
            if (isWin) stats.stayWins++;
        } else {
            if (isWin) stats.switchWins++;
        }
    }

    saveStats(stats);
    updateStatsPanel();

    alert("Simulação concluída!");
}