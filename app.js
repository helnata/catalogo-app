const sheetId = "1lUdNf99DFDRqibMtdHQcigDaM5FzKP87KRTyDNd_lxY";
// Mudamos o final para exportar como JSON
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

async function carregarDados() {
  try {
    const resposta = await fetch(url);
    const texto = await resposta.text();

    // A API do Google retorna um texto com um prefixo: /*O_o*/ google.visualization.Query.setResponse({...});
    // Precisamos extrair apenas o que está dentro dos parênteses { ... }
    const inicio = texto.indexOf("{");
    const fim = texto.lastIndexOf("}") + 1;
    const jsonString = texto.substring(inicio, fim);

    const json = JSON.parse(jsonString);

    // Mapeando as colunas e linhas para um formato amigável (Array de Objetos)
    const colunas = json.table.cols.map((col) => col.label);
    const dadosFormatados = json.table.rows.map((row) => {
      let objeto = {};
      row.c.forEach((cell, i) => {
        objeto[colunas[i] || `coluna_${i}`] = cell ? cell.v : null;
      });
      return objeto;
      git;
    });
    console.log("Dados Carregados com Sucesso:", dadosFormatados);
    return dadosFormatados;
  } catch (erro) {
    console.error("Erro ao contornar o CORS:", erro);
  }
}

carregarDados();
