# TechPix - Sistema de Monitoramento de Servidores PIX

![Logo TechPix](https://i.ibb.co/JjpGcpHg/paleta-1-removebg-preview.png)


## Sobre o Projeto
O TechPix é uma solução de monitoramento automatizado de hardware para servidores de dados envolvidos no processo de transações PIX. Com o crescente aumento do uso do PIX e os riscos causados pela falta de manutenção adequada nos servidores bancários, torna-se essencial um serviço eficiente de monitoramento dos componentes de hardware.

Nossa solução oferece monitoramento em tempo real de componentes críticos como CPU, memória RAM, disco e rede, gerando alertas quando estes componentes ultrapassam limiares predefinidos. O sistema também mantém um histórico de performance que permite análises de longo prazo e previsão de falhas.

## Objetivo
Entregar uma solução de monitoramento automatizado de hardware para servidores de dados envolvidos no processo de transações PIX, a fim de reduzir falhas operacionais, além de possibilitar uma análise de histórico de falhas.

## Funcionalidades
- **Monitoramento em Tempo Real**: Coleta contínua de dados sobre o desempenho dos componentes do servidor
- **Dashboard Personalizada**: Visualização gráfica clara dos dados coletados
- **Sistema de Alertas**: Notificações automáticas quando os componentes atingem níveis críticos
- **Integração com Jira e Slack**: Abertura automática de chamados e notificações para equipes técnicas
- **Análise Histórica**: Armazenamento de dados para análises de longo prazo e identificação de padrões

## Benefícios
- **Redução do Risco de Falhas**: Prevenção de problemas antes que afetem as transações PIX
- **Aumento da Segurança**: Identificação de anormalidades que possam indicar ataques ou falhas críticas
- **Redução do Tempo de Resposta**: Detecção rápida de anomalias para uma resposta mais eficiente
- **Prevenção de Perdas Financeiras**: Evita interrupções no serviço PIX que podem gerar prejuízos bilionários

## Como Usar
1. Clone este repositório em sua máquina.

2. Crie, no Banco de Dados, as tabelas necessárias para o funcionamento deste projeto.

   Siga as instruções no arquivo `/src/database/script-tabelas.sql`

3. Acesse o arquivo `app.js` e parametrize o ambiente.

   - Se você estiver utilizando o Ambiente de Produção (remoto), comente a linha 2 e deixe habilitada a linha 1 onde está o valor `var ambiente_processo = 'producao';`
   - Se você estiver utilizando o Ambiente de Desenvolvimento (local), comente a linha 1 e deixe habilitada a linha 2 onde está o valor `var ambiente_processo = 'desenvolvimento';`

4. Adicione as credenciais de Banco de Dados no arquivo `.env` ou em `.env.dev`, seguindo as instruções neste.
5. Acesse este repositório no seu terminal (GitBash ou VSCode) e execute os comandos abaixo:

   ```
   npm i
   ```
   
   O comando acima irá instalar as bibliotecas necessárias para o funcionamento do projeto. As bibliotecas a serem instaladas estão listadas no arquivo `package.json` então é muito importante que este não seja alterado. Será criada uma nova pasta/diretório chamado `node_modules` quando o comando for finalizado, que é onde as bibliotecas estão localizadas. Não altere a pasta/diretório.
   
   ```
   npm start
   ```
   
   O comando acima irá iniciar seu projeto e efetuar os comandos de acordo com a sua parametrização feita nos passos anteriores.

6. Para "ver" seu projeto funcionando, acesse em seu navegador o caminho informado no terminal.
7. Caso queira parar a execução, tecle CTRL+C no terminal em que o projeto está rodando.

## Tecnologias Utilizadas
- **Backend**: Java, Python, Node.js
- **Frontend**: HTML, CSS, JavaScript
- **Banco de Dados**: MySQL
- **Infraestrutura**: AWS
- **Integrações**: Jira, Slack
- **Ferramentas de Desenvolvimento**: IntelliJ, VS Code, GitHub, Figma, Trello
- **Bibliotecas**: API Web Data Viz, Bibliotecas Python para análise de dados

## Equipe
- Felipe Miguel
- Gustavo Vieira 
- Matheus Nocelli
- Lara Soares
- Vinicius Dias

## Status do Projeto
Desenvolvimento ativo 

## Licença
© 2025 TechPix. Todos os direitos reservados.
