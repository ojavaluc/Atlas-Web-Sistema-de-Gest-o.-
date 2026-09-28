document.addEventListener("DOMContentLoaded", function() {
    // Escuta o clique no botão de exportar na aba do Dashboard
    const btnExportar = document.getElementById("btnExportar");
    if (btnExportar) {
        btnExportar.addEventListener("click", function() {
            exportarTabelaParaCSV("tabelaDespesas", "atlas_relatorio_despesas.csv");
        });
    }
});

// Função para exportar os dados da tabela para CSV
function exportarTabelaParaCSV(tabelaId, nomeArquivo) {
    const tabela = document.getElementById(tabelaId);
    let linhasCSV = [];

    // Percorre todas as linhas da tabela (cabeçalho e corpo)
    for (let i = 0; i < tabela.rows.length; i++) {
        let colunas = tabela.rows[i].querySelectorAll("td, th");
        let linha = [];
        
        for (let j = 0; j < colunas.length; j++) {
            // Remove quebras de linha e adiciona aspas para não quebrar o formato
            let dadoLimpo = colunas[j].innerText.replace(/(\r\n|\n|\r)/gm, "").trim();
            linha.push('"' + dadoLimpo + '"');
        }
        
        // Junta as colunas com ponto e vírgula (Padrão do Excel BR)
        linhasCSV.push(linha.join(";"));
    }

    // Adiciona o BOM (Byte Order Mark) para o Excel reconhecer acentos (UTF-8)
    const csvContent = "\uFEFF" + linhasCSV.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Cria um link temporário para forçar o download no navegador
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

// Função para alternar entre as abas do menu
function mudarAba(idAba, elementoClicado) {
    // Passo 1: Esconder todas as abas
    let todasAsAbas = document.querySelectorAll('.aba-conteudo');
    todasAsAbas.forEach(function(aba) {
        aba.style.display = 'none';
    });

    // Passo 2: Mostrar apenas a aba que foi clicada
    document.getElementById(idAba).style.display = 'block';

    // Passo 3: Remover a marcação azul (active) de todos os links do menu
    let todosOsLinks = document.querySelectorAll('.menu a');
    todosOsLinks.forEach(function(link) {
        link.classList.remove('active');
    });

    // Passo 4: Adicionar a marcação azul apenas no link clicado
    elementoClicado.classList.add('active');
}