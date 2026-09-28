document.addEventListener("DOMContentLoaded", function() {
    const btnExportar = document.getElementById("btnExportar");
    if (btnExportar) {
        btnExportar.addEventListener("click", function() {
            exportarTabelaParaCSV("tabelaDespesas", "atlas_relatorio_despesas.csv");
        });
    }
});

function exportarTabelaParaCSV(tabelaId, nomeArquivo) {
    const tabela = document.getElementById(tabelaId);
    let linhasCSV = [];

    for (let i = 0; i < tabela.rows.length; i++) {
        let colunas = tabela.rows[i].querySelectorAll("td, th");
        let linha = [];
        
        for (let j = 0; j < colunas.length; j++) {
            let dadoLimpo = colunas[j].innerText.replace(/(\r\n|\n|\r)/gm, "").trim();
            linha.push('"' + dadoLimpo + '"');
        }
        
        linhasCSV.push(linha.join(";"));
    }

    const csvContent = "\uFEFF" + linhasCSV.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", nomeArquivo);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

/* =========================================
   FUNÇÕES DE NAVEGAÇÃO E MENU CELULAR
   ========================================= */

// Abrir/Fechar menu no botão hambúrguer
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('aberto');
    document.getElementById('overlay').classList.toggle('ativo');
}

// Fechar menu (usado ao clicar fora ou ao escolher uma aba)
function fecharMenu() {
    document.getElementById('sidebar').classList.remove('aberto');
    document.getElementById('overlay').classList.remove('ativo');
}

function mudarAba(idAba, elementoClicado) {
    // 1: Esconder todas as abas
    let todasAsAbas = document.querySelectorAll('.aba-conteudo');
    todasAsAbas.forEach(function(aba) {
        aba.style.display = 'none';
    });

    // 2: Mostrar apenas a clicada
    document.getElementById(idAba).style.display = 'block';

    // 3: Atualizar visual do menu
    let todosOsLinks = document.querySelectorAll('.menu a');
    todosOsLinks.forEach(function(link) {
        link.classList.remove('active');
    });
    elementoClicado.classList.add('active');

    // 4: Se estiver no celular, fecha o menu automaticamente após clicar
    if (window.innerWidth <= 768) {
        fecharMenu();
    }
}
