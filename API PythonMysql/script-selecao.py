import mysql.connector
from mysql.connector import errorcode

cursor = ""

def executar(metricas, componente, formato):
    global cursor

    if formato != '2': 
        sql = "SELECT tipo, AVG(medida) FROM Monitoramento WHERE fkComponente = %s AND tipo LIKE %s GROUP BY tipo LIMIT 10;"
        values = (componente, f"%{metricas}%")
    else:
        sql = "SELECT tipo, medida FROM Monitoramento WHERE fkComponente = %s AND tipo LIKE %s;"
        values = (componente, f"%{metricas}%")

    cursor.execute(sql, values)

    resultados = cursor.fetchall()

    if resultados:
        for (tipo, medida) in resultados:
            print(f"{tipo} {medida}")
    else:
        print("Nenhum dado encontrado para esta consulta.")

# Lista para armazenar o tipo de coleta.
listaMetricas = []
listaIDComponente = []
metricaTexto = []

def metricas(componente, listaComponentes):

    indice = listaComponentes.index(componente)
    id = listaIDComponente[indice]

    sql = "SELECT tipo FROM Monitoramento WHERE fkComponente = %s"
    values = (id)
    cursor.execute(sql, values)

    for (tipo) in cursor:
        
        if tipo in listaMetricas:
            b += 1
        else:
            listaMetricas.append(tipo)

    if "Porcentagem da CPU" in listaMetricas or "Porcentagem de RAM disponível" in listaMetricas or "Porcentagem de Armazenamento utilizado" in listaMetricas:
        metricaTexto.append("Porcentagem")
    elif "Número de pacotes enviados" in listaMetricas or "Número de pacotes recebidos" in listaMetricas:
        metricaTexto.append("Pacotes")
    elif "Frequência da CPU" in listaMetricas:
        metricaTexto.append("Frequência")
    elif "Total de RAM" in listaMetricas or "Total de RAM disponível" in listaMetricas or "Total de Memória Swap utilizada" in listaMetricas or "Total de Armazenamento" in listaMetricas:
        metricaTexto.append("Bytes")
    elif "Quantidade total de processos" in listaMetricas or "Quantidade de processos ativos" in listaMetricas or "Quantidade de processos inativados" in listaMetricas or "Número de interrupções do sistema desde a sua inicialização" in listaMetricas or "Número de interrupções de softwares desde a sua inicialização" in listaMetricas:
        metricaTexto.append("Processos")

    metricaAtual = 0
    mensagemMetricas = ""

    for tipo in metricaTexto:
        if metricaTexto[metricaAtual] == metricaTexto[len(metricaTexto - 1)]:
            mensagemMetricas += tipo
        else:
            mensagemMetricas += tipo + ", "
        metricaAtual += 1

    while True:

        metricas = input("Quais métricas deseja analisar? Métricas disponíveis: " + mensagemMetricas + ")  ")

        if metricas in metricaTexto:

            if metricas in ["Porcentagem", "Pacotes", "Bytes", "Frequência"]:
                formato = input("Qual formato gostaria que aparecessem os resultados? (1 - Unitário.) (2- Média dos últimos 10 registros.)")
            else:
                formato = " "
                executar(metricas, componente, formato)
                return

            if formato == '1' or formato == '2':
                executar(metricas, componente, formato)
                return
            
            print("Por favor insira apenas valores como '1' ou '2'.")
        else:
            print("Por favor insira apenas " + mensagemMetricas)

# Função responsável por gerar a interação do usuário sobre os componentes que pode visualizar e como quer que sejam exibidas as métricas.
def interagir(listaServidores):
    # Lista para armazenar os ID's dos componentes.
    listaComponentes = []

    print("Seja bem-vindo à API de visualização de dados TechPix")
    
    print("""
             _______        _     _____ _      
            |__   __|      | |   |  __ (_)     
                | | ___  ___| |__ | |__) |__  __
                | |/ _ \/ __| '_ \|  ___/ \ \/ /
                | |  __/ (__| | | | |   | |>  < 
                |_|\___|\___|_| |_|_|   |_/_/\_\                      
    """)

    # Variável que irá guardar a listagem dos ID's dos servidores para o input de escolha
    mensagemServidores = ""
    indice = 0

    for idServidores in listaServidores:
        idAtual = str(idServidores)

        # Caso o ID atual da contagem seja o mesmo que o último ID da lista, deve exibir sem vírgula.
        # Caso contrário, deverá listar o ID atual com vírgula.
        if listaServidores[indice] == listaServidores[len(listaServidores) - 1]:
            if idAtual[2] == ",":
                mensagemServidores += idAtual[1]
            else:
                mensagemServidores += idAtual[1] + idAtual[2] 
        else:
            if idAtual[2] == ",":
                mensagemServidores += idAtual[1] + ", "
            else:
                mensagemServidores += idAtual[1] + idAtual[2] + ", " 
        indice += 1

    # Etapa de escolha da máquina que deseja visualizar
    while True:
        escolha = input("Insira qual máquina gostaria de visualizar os dados: (Máquinas disponíveis: " + mensagemServidores + ")  ")

        # Caso a máquina escolhida esteja dentro das máquinas disponíveis irá dar continuidade à API.
        # Caso contrário, irá alertar sobre a escolha de uma máquina válida e irá reencaminhar a pergunta de máquinas disponíveis.
        if escolha in listaServidores:
            sql = "SELECT tipo, idComponentes FROM Componentes WHERE fkServidor = %s;"
            values = (escolha)
            cursor.execute(sql, values)

            # Método para armazenar o tipo e o ID do componente que o servidor selecionado possui.
            for (tipo, idComponente) in cursor:
                listaIDComponente.append(idComponente)
                listaComponentes.append(tipo)

            # Caso a listaComponentes esteja vazia, irá emitir um alerta e reencaminhar a pergunta de máquinas disponíveis.
            # Caso contrário, irá dar continuidade à API.
            if not listaComponentes:
                print("Nenhum componente encontrado para esta máquina.")
            else:

                # Variável que irá armazenar os tipos dos componentes que irão aparecer na mensagem de componentes para o usuário.
                mensagemComponentes = ""

                # Variável que irá armazenar o index do componente atual.
                componenteAtual = 0

                # Lista responsável por armazenar os tipos que já foram listados, evitando que se repitam na mensagem para o usuário.
                listaNRepetidos = []

                # Variável utilizada para evitar bugs durante a validação de tipos repetidos.
                a = 0

                # Méetodo utilizado para ver todos os tipos inseridos na lista de componentes.
                for tipo in listaComponentes:

                    # Caso o tipo atual está na lista de repetidos, irá executar uma soma na variável de debug.
                    # Caso contrário, irá adicionar o tipo atual à lista de repetidos para ser lembrado como um item já visualizado.
                    if tipo in listaNRepetidos:
                        a += 1
                    else:
                        listaNRepetidos.append(tipo)

                        # Caso o índice da contagem seja o mesmo que o último índice da lista, deve exibir sem vírgula.
                        # Caso contrário, deverá listar o tipo atual com vírgula.
                        if listaComponentes[componenteAtual] == listaComponentes[len(listaComponentes - 1)]:
                            mensagemComponentes += tipo
                        else:
                            mensagemComponentes += tipo + ", "

                    # Somatória que registra o indíce de cada visualização de tipo
                    componenteAtual += 1

                componente = input("Qual componente deseja observar? (" + mensagemComponentes + ".)  ")

                # Caso o compontente escolhido esteja na lista de componentes, irá chamar a função métricas com o componente escolhido pelo usuário.
                # Caso contrário, irá alertar sobre a escolha do componente e reencaminha a pergunta dos componentes.
                if componente in listaComponentes:
                    metricas(componente, listaComponentes)
                    return
                else:
                    print("Por favor, insira um dos componentes listados acima.")
        else:
            print("Por favor, insira um dos números descritos acima.")

# Função responsável por realizar a checagem do acesso do usuário à API.
# Se não conseguir logar, será redirecionado para outra tentativa de login.
def login():
    email = input("\n\nInsira o seu email de acesso:  ")
    senha = input("Insira a sua senha de acesso:  ")

    listaServidores = []

    # Caso seja logado com sucesso, é realizada a busca de servidores que o usuário logado tem acesso.
    # Caso contrário, será emitido um alerta alertando o erro no login e reencaminha os campos de email e senha para tentar logar novamente.
    if email == "contato_safra@outlook.com" and senha == "Teste123%":

        # Criação da estrutura do comando SQL para a coleta dos servidores.
        sql = "SELECT idServidores FROM Servidores AS s JOIN Empresa AS e ON e.idEmpresa = s.fkEmpresa WHERE e.email = %s AND e.senha = %s;"

        # Chamada da execução do comando MySQL com os parâmetros que sejam enviados no objeto que armazena a conexão com o servidor do BD.
        cursor.execute(sql, (email, senha))

        # Inserção dos ID's dos servidores encontrados na execução do comando SQL no objeto que armazena a conexão com o servidor do BD.
        for (idServidores) in cursor:
            listaServidores.append(idServidores)
        
        # Caso não haja nenhum valor dentro do vetor que armazens os servidores disponíveis, emite um alerta e finaliza o andamento da API.
        if not listaServidores:
            print("Nenhuma máquina encontrada para este usuário.")
            return

        # Envio no terminal dos ID's dos servidores
        print(listaServidores)

        # Chamada da função de interação do usuário com a API passando a lista dos ID's encontrados a partir do login.
        interagir(listaServidores)
    else:
        print("\nEmail ou senha inválidos. Tente novamente.")
        login()
        

# Teste de conexão com o servidor MySql.
# Caso dê certo, encaminha para a função de login para o usuário se conectar (try:).
# Se não, é encaminhada a mensagem de erro respectiva da falha que ocorreu (except = erros específicos de conexão e permissão; else = outros erros).
try:
    conexaoSelect = mysql.connector.connect(host='localhost', user='techpixSelect', password='Urubu100', database='techpix')
    print("Banco de dados conectado!")
    cursor = conexaoSelect.cursor()
    login()
except mysql.connector.Error as error:
	if error.errno == errorcode.ER_BAD_DB_ERROR:
		print("Banco de dados não existe!")
	elif error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
		print("Nome de usuário ou senha inválidos")
	else:
		print(error)
else:
	conexaoSelect.close()

