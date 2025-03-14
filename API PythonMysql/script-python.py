# Importação da biblioteca de conexão com um servidor de banco de dados.
import mysql.connector

# Importação da biblioteca responsável pela coleta de dados de máquina.
import psutil

# Importação da biblioteca de emissão de erros de algum problema que aconteça na conexão com o BD.
from mysql.connector import errorcode

# Importação da biblioteca que realiza a captura de dados de data e hora.
from datetime import datetime

# Função responsável por realizar a execução da coleta das métricas escolhidas pelo usuário.
def executar(dados):
	
    # Variável responsável por armazenar a conexão com o BD em um objeto.
    cursor = conexaoInsert.cursor()
	
    # Comando MySql utilizado para inserir os dados da maneira adequada ao banco de dados.
    sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "
    
    # Variável responsável por armazenar a chamada da biblioteca de captura de dados da máquina.
    bibliotecaCaptura = psutil

    # Variável responsável por armazenar a data e hora atual da coleta dos dados.
    dataHoraAtual = datetime.now()

    # Caso o usuário tenha escolhido o total de processos no sistema irá realizar essa validação, onde fará a coleta e inserção dos dados no banco de dados.
    if "ProcessosTotal" in dados:
        # Variável que irá armazenar a quantidade de processos que serão contabilizados.
        total = 0

        # Método utilizado para o cálculo do total de processos do sistema, onde serão passados todos os processos e irá somar na variável "total" a cada processo passado.
        for processo in psutil.process_iter():
            total += 1

        # Criação do restante do comando sql com as informações que deverão ser enviadas e seu tipo.
        sql += "(%s, %s, 13);"

        # Variável que irá armazenar os dados que serão inseridos no lugar dos "%s" do comando sql.
        values = (total, dataHoraAtual)

        # Chamada da execução do comando sql com os dados que serão inseridos no objeto que está armazenando a conexão com o BD.
        cursor.execute(sql, values)

        # Exibição do valor obtido para o usuário.
        print(total)

        # Reestruturação do comando sql para o formato original.
        sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "

    # Caso o usuário tenha escolhido o total de processos ativos no sistema irá realizar essa validação, onde fará a coleta e inserção dos dados no banco de dados.
    if "ProcessosAtivo" in dados:
        ativos = 0

        # Método utilizado para o cálculo do total de processos ativos do sistema, onde serão passados todos os processos ativos (caracterizados pelo status "running") e irá somar na variável "ativos" a cada processo passado.
        for processo in psutil.process_iter():
            
            if processo.status() == "running":
                ativos += 1

        sql += "(%s, %s, 14)"
        values = (ativos, dataHoraAtual)
        cursor.execute(sql, values)
        print(ativos)
        sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "

    #  Caso o usuário tenha escolhido o total de processos inativos no sistema irá realizar essa validação, onde fará a coleta e inserção dos dados no banco de dados.
    if "ProcessosDesativados" in dados:
        desativados = 0

        # Método utilizado para o cálculo do total de processos inativos do sistema, onde serão passados todos os processos ativos (caracterizados pelo status "stopped") e irá somar na variável "ativos" a cada processo passado.
        for processo in psutil.process_iter():
                
            if processo.status() == "stopped":
                desativados += 1

        sql += "(%s, %s, 15);"
        values = (desativados, dataHoraAtual)
        cursor.execute(sql, values)
        print(desativados)
        sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "
    
    # Caso o usuário tenha realizado a coleta de alguma métrica de processos, irá realizar a inserção dos dados no banco de dados.
    if "ProcessosTotal" in dados or "ProcessosAtivo" in dados or "ProcessosDesativados" in dados:

        # Chamada da conexão com o banco de dados e envio dos comandos para serem executados no servidor.
        conexaoInsert.commit()
	
    # Etapa de coleta contínua dos dados de máquina passando por todas as métricas escolhidas pelo usuário e as inserindo no banco de dados.
    while True:
        
        dataHoraAtual = datetime.now()

        # Caso o usuário tenha escolhido a coleta de porcentagem da CPU, irá realizar a inserção dos dados no banco de dados.
        if "CPUPercent" in dados:

            # Variável responsável por armazenar a métrica pedida pelo usuário
            porcentagem_atual = bibliotecaCaptura.cpu_percent(interval=1)
            print("Porcentagem da CPU: ", porcentagem_atual, "%")
            sql += "(%s, %s, 1);"
            values = (porcentagem_atual, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "

        # Caso o usuário tenha escolhido a coleta do número de interrupções do sistema desde a sua inicialização, irá realizar a inserção dos dados no banco de dados.
        if "CPUInterrupt" in dados:

            interrupcoes = bibliotecaCaptura.cpu_stats().interrupts
            print("Número de interrupções do sistema desde a sua inicialização: ", interrupcoes)
            sql += "(%s, %s, 2);"
            values = (interrupcoes, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "

        # Caso o usuário tenha escolhido a coleta do número de interrupções de softwares desde a sua inicialização, irá realizar a inserção dos dados no banco de dados.
        if "CPUInterruptSoft" in dados:
            interrupcoesSoft = bibliotecaCaptura.cpu_stats().soft_interrupts
            print("Número de interrupções de softwares desde a sua inicialização: ", interrupcoesSoft)
            sql += "(%s, %s, 3);"
            values = (interrupcoesSoft, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "

        # Caso o usuário tenha escolhido a coleta da frequência da CPU, irá realizar a inserção dos dados no banco de dados.
        if "CPUFreq" in dados:
            frequencia_atual = (bibliotecaCaptura.cpu_freq()).current
            print("Frequência da CPU: ", frequencia_atual, 'Hz')
            sql += "(%s, %s, 4);"
            values = (frequencia_atual, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "

        # Caso o usuário tenha escolhido a coleta do total de RAM, irá realizar a inserção dos dados no banco de dados.
        if "RAMTotal" in dados:
            ramTotal = bibliotecaCaptura.virtual_memory().total
            print("Total de RAM: ", ramTotal)
            sql += "(%s, %s, 5);"
            values = (ramTotal, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "

        # Caso o usuário tenha escolhido a coleta do total de RAM utilizada, irá realizar a inserção dos dados no banco de dados.
        if "RAMUsed" in dados:
            ramUtilizada = bibliotecaCaptura.virtual_memory().used
            print("Total de RAM disponível: ", ramUtilizada)
            sql += "(%s, %s, 6);"
            values = (ramUtilizada, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "

        # Caso o usuário tenha escolhido a coleta do percentual de RAM utilizada, irá realizar a inserção dos dados no banco de dados.
        if "RAMPercent" in dados:
            ramPercentual = bibliotecaCaptura.virtual_memory().percent
            print("Porcentagem de RAM disponível: ", ramPercentual, "%")
            sql += "(%s, %s, 7);"
            values = (ramPercentual, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "

        # Caso o usuário tenha escolhido a coleta do total de memória Swap, irá realizar a inserção dos dados no banco de dados.
        if "DISKSwap" in dados:
            memoriaSwap = bibliotecaCaptura.swap_memory().used
            (f"Total de Memória Swap utilizada: {memoriaSwap}")
            sql += "(%s, %s, 8);"
            values = (memoriaSwap, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "

        # Caso o usuário tenha escolhido a coleta da porcentagem de Armazenamento utilizado, irá realizar a inserção dos dados no banco de dados.
        if "DISKPercent" in dados:
            discoPercentual = bibliotecaCaptura.disk_usage('C:\\').percent
            print("Porcentagem de Armazenamento utilizado: ", discoPercentual, "%")
            sql += "(%s, %s, 9);"
            values = (discoPercentual, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "

        # Caso o usuário tenha escolhido a coleta do total de armazenamento do disco, irá realizar a inserção dos dados no banco de dados.
        if "DISKTotal" in dados:
            discoTotal = bibliotecaCaptura.disk_usage('C:\\').total
            print("Total de Armazenamento: ", discoTotal)
            sql += "(%s, %s, 10);"
            values = (discoTotal, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "

        # Caso o usuário tenha escolhido a coleta do número de pacotes enviados pelo servidor, irá realizar a inserção dos dados no banco de dados.
        if "REDESent" in dados:
            redeEnviado = bibliotecaCaptura.net_io_counters().packets_sent
            print("Número de pacotes enviados: ", redeEnviado)
            sql += "(%s, %s, 11);"
            values = (redeEnviado, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "

        # Caso o usuário tenha escolhido a coleta do número de pacotes recebidos pelo servidor, irá realizar a inserção dos dados no banco de dados.
        if "REDERecv" in dados:
            redeRecebido = bibliotecaCaptura.net_io_counters().packets_recv
            print("Número de pacotes recebidos: ", redeRecebido)
            sql += "(%s, %s, 12);"
            values = (redeRecebido, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "

        conexaoInsert.commit()

# Função responsável por ofertar para o usuário opções de inicialização ou não da API, componentes e métricas que deseja que sejam obtidos.
def interagir():
    print("Seja bem-vindo à API de inserção de dados Techpix")
    
    print("""
             _______        _     _____ _      
            |__   __|      | |   |  __ (_)     
                | | ___  ___| |__ | |__) |__  __
                | |/ _ \/ __| '_ \|  ___/ \ \/ /
                | |  __/ (__| | | | |   | |>  < 
                |_|\___|\___|_| |_|_|   |_/_/\_\                      
    """)
    
    print("Nessa API iremos fazer a captura dos dados que você escolher do seu dispositivo! Vamos começar!!")

    # Etapa de validação se o usuário gostaria que seus dados fosse captados (Desejável).
    while True:

        # Variável responsável por permitir a continuidade da API.
        # Caso seja falsa, irá finalizar a API. Caso seja verdadeira, irá dar continuidade da API.
        verificacao = True

        validacao = input("Gostaria que capturemos dados do seu dispositivo? (Sim/Não)  ")

        # Se preencher "Sim", irá finalizar o looping e permitir que a aplicação rode normalmente.
        # Se preencher "Não", irá finalizar o looping e a API.
        # Se não preencher "Sim" ou "Não", será redirecionado para a pergunta novamente com um alerta sobre a resposta.
        if validacao == "Sim": 
            print("Ótimo, vamos começar!")
            break
        elif validacao == "Não":
            print("Tudo bem, tenha um ótimo dia!")
            verificacao = False
            break
        else:
            print("Por favor, responda apenas com 'Sim' ou 'Não'.")
    
    # Caso o usuário queira que seus dados sejam coletados, irá realizar a escolha dos componentes e métricas que sejam coletadas.
    # Caso contrário, irá finalizar a API.
    if verificacao:
        # Variável que irá armazenar os componentes e métricas que o usuário quer monitorar.
        dados = ""
        
        # Etapa de escolha do usuário sobre os componentes que deseja monitorar, permitindo a escolha de um ou mais componentes.
        # Caso seja escolhida uma opção que esteja fora das permitidas, irá enviar um alerta pedindo para que preencha uum número válido e reencaminha a escolha dos componentes.
        while True:
            opcao = input("\nQuais componentes ou funcionalidades deseja monitorar? (1 - CPU) (2 - Memória RAM) (3- Disco) (4- Rede) (5 - Processos) ")
            
            # Variável responsável por realizar o fechamento do looping de validação se o usuário quer ou não monitorar outro componente.
            continuacao = False

            # Variável responsável por realizar o fechamento do looping de escolha de componentes e permitir a ida para a função de executar a coleta.
            finalizar = False
            
            # Caso o usuário escolha o número 1, poderá escolher as métricas de CPU que poderá monitorar.
            if opcao == '1':
                # Looping responsável por realizar a escolha das métricas.
                # Caso seja escolhida uma opção que esteja fora das permitidas, irá enviar um alerta pedindo para que preencha números válidos e reencaminha a escolha das métricas.
                while True:
                    
                    resposta = input("\nQuais dados gostaria que fossem capturados? (Digite os números em sequência se gostaria de mais que uma opção) \n(1 - Porcentagem utilizada)\n (2 - Número de interrupções desde o início do sistema) \n(3- Número de interrupções em softwares desde o início do sistema) \n(4- Frequência)  ")

                    # Caso a resposta venha vazia ou não possua os números permitidos, envia um alerta pedindo que seja preenchido um valor válido e reencaminha a escolha das métricas.
                    # Caso contrário será atrelado à variável "dados" as métricas que deverão ser obtidas a depender do número que o usuário preencha anteriormente.
                    if resposta == "" or (("1" in resposta) or ("2" in resposta) or ("3" in resposta) or ("4" in resposta)) == False:
                        print('\nPor favor insira números como "1", "2" e "3".')
                    else:
                        if "1" in resposta:
                            dados += "CPUPercentual"
                        if "2" in resposta:
                            dados += "CPUInterrupt"
                        if "3" in resposta:
                            dados += "CPUInterruptSoft"
                        if "4" in resposta:
                            dados += "CPUFreq"

                        # Etapa de validação se o usuário deseja realizar a coleta de algum outro componente ou funcionalidade.
                        while True:

                            confirmacao = input("\nGostaria de monitorar algum outro componente ou funcionalidade? (Sim/Não)  ")

                            # Caso o usuário queira coletar dados de outro componente ou funcionalidade, irá finalizar a validação e permitir que seja escolhido outro componente ou funcionalidade.
                            # Caso o usuário não queira coletar dados de outro componente ou funcionalidade, irá finalizar a validação e escolha dos componentes permitindo a execução da coleta.
                            # Caso contrário irá emitir um alerta sobre as respostas permitidas e reencaminha a pergunta.
                            if confirmacao == "Sim":
                                continuacao = True
                                break
                            elif confirmacao == "Não":
                                continuacao = True
                                finalizar = True
                                break
                            else:
                                print('\nPor favor insira apenas "Sim" ou "Não".')

                        # Caso tenha respondido "Sim" ou "Não", irá finalizar o looping de escolha de componentes.
                        if continuacao:
                            break

            # Caso o usuário escolha o número 2, poderá escolher as métricas de RAM que poderá monitorar.
            if opcao == '2':
                while True:
                    resposta = input("\nQuais dados gostaria que fossem capturados? (Digite os números em sequência se gostaria de mais que uma opção) \n(1- Memória RAM total) \n(2- Memória RAM utilizada)\n (3- Porcentagem da memória RAM utilizada)  ")

                    if resposta == "" or (("1" in resposta) or ("2" in resposta) or ("3" in resposta)) == False:
                       print('Por favor insira números como "1", "2" e "3".')
                    else:
                        if "1" in resposta:
                            dados += "RAMTotal"
                        if "2" in resposta:
                            dados += "RAMUsed"
                        if "3" in resposta:
                            dados += "RAMPercent"

                        while True:
                            confirmacao = input("\nGostaria de monitorar algum outro componente ou funcionalidade? (Sim/Não)  ")
                            if confirmacao == "Sim":
                                continuacao = True
                                break
                            elif confirmacao == "Não":
                                continuacao = True
                                print(continuacao)
                                finalizar = True
                                break
                            else:
                                print('\nPor favor insira apenas "Sim" ou "Não".')

                        if continuacao:
                            break

            # Caso o usuário escolha o número 3, poderá escolher as métricas de Disco que poderá monitorar. 
            if opcao == '3':

                while True:
                    resposta = input("\nQuais dados gostaria que fossem capturados? (Digite os números em sequência se gostaria de mais que uma opção) \n(1 - Memória Swap Utilizada) \n(2 - Utilização Percentual) \n(3- Utilização Total)  ")

                    if resposta == "" or (("1" in resposta) or ("2" in resposta) or ("3" in resposta) or ("4" in resposta)) == False:
                        print('\nPor favor insira números como "1", "2" e "3".')
                    else:
                        if "1" in resposta:
                            dados += "DISKSwap"
                        if "2" in resposta:
                            dados += "DISKPercent"
                        if "3" in resposta:
                            dados += "DISKTotal"

                        while True:
                            confirmacao = input("\nGostaria de monitorar algum outro componente ou funcionalidade? (Sim/Não)  ")
                            if confirmacao == "Sim":
                                continuacao = True
                                break
                            elif confirmacao == "Não":
                                continuacao = True
                                finalizar = True
                                break
                            else:
                                print('\nPor favor insira apenas "Sim" ou "Não".')

                        if continuacao:
                            break

            # Caso o usuário escolha o número 4, poderá escolher as métricas de Rede que poderá monitorar.
            if opcao == '4':

                while True:
                    resposta = input("\nQuais dados gostaria que fossem capturados? (Digite os números em sequência se gostaria de mais que uma opção) \n(1- Pacotes Enviados) \n(2- Pacotes recebidos)  ")

                    if resposta == "" or (("1" in resposta) or ("2" in resposta)) == False:
                        print('\nPor favor insira números como "1" e "2".')
                    else:
                        if "1" in resposta:
                            dados += "REDESent"
                        if "2" in resposta:
                            dados += "REDERecv"


                        while True:
                            confirmacao = input("\nGostaria de monitorar algum outro componente ou funcionalidade? (Sim/Não)  ")
                            if confirmacao == "Sim":
                                continuacao = True
                                break
                            elif confirmacao == "Não":
                                continuacao = True
                                finalizar = True
                                break
                            else:
                                print('\nPor favor insira apenas "Sim" ou "Não".')

                        if continuacao:
                            break

            # Caso o usuário escolha o número 5, poderá escolher as métricas de Processos que poderá monitorar.
            if opcao == '5':
                while True:
                    
                    resposta = input("\nQuais dados gostaria que fossem capturados? (Digite os números em sequência se gostaria de mais que uma opção) \n(1 - Quantidade total de processos)\n (2 - Quantidade de processos ativos) \n(3- Quantidade de processos desativados)")

                    if resposta == "" or (("1" in resposta) or ("2" in resposta) or ("3" in resposta) or ("4" in resposta)) == False:
                        print('\nPor favor insira números como "1", "2" e "3".')
                    else:
                        if "1" in resposta:
                            dados += "ProcessosTotal"
                        if "2" in resposta:
                            dados += "ProcessosAtivo"
                        if "3" in resposta:
                            dados += "ProcessosDesativados"

                        while True:
                            confirmacao = input("\nGostaria de monitorar algum outro componente? (Sim/Não)  ")
                            if confirmacao == "Sim":
                                continuacao = True
                                break
                            elif confirmacao == "Não":
                                continuacao = True
                                finalizar = True
                                break
                            else:
                                print('\nPor favor insira apenas "Sim" ou "Não".')

                    if continuacao:
                        break
            # Caso o usuário não deseja escolher outro componente para monitorar, irá finalizar o looping de escolha dos componentes.
            if finalizar:
                break
        # Finalização da função "interagir" e envio das métricas desejadas pelo usuário para a função "executar".
        return executar(dados)
    else:
        return

# Função responsável por realizar a checagem do acesso do usuário à API.
# Caso seja logado com sucesso, é encaminhado para a função interagir para escolher o componente e métrica que deseja monitorar.
# Se não conseguir logar, será redirecionado para outra tentativa de login.
def login():

    email = input("\n\nInsira o seu email de acesso:  ")
    senha = input("Insira o sua senha de acesso:  ")

    if email == "contato_safra@outlook.com" and senha == "Teste123%":
        interagir()
    else:
        print("\nPor favor insira email ou senha inválidos")
        login()
        

# Teste de conexão com o servidor MySql.
# Caso dê certo, encaminha para a função de login para o usuário se conectar (try:).
# Se não, é encaminhada a mensagem de erro respectiva da falha que ocorreu (except = erros específicos de conexão e permissão; else = outros erros).
try:
    conexaoInsert = mysql.connector.connect(host='localhost', user='techpixInsert', password='Urubu100', database='Techpix')
    print("Banco de dados conectado!")
    login()
except mysql.connector.Error as error:
	if error.errno == errorcode.ER_BAD_DB_ERROR:
		print("Banco de dados não existe!")
	elif error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
		print("Nome de usuário ou senha inválidos")
	else:
		print(error)
else:
	conexaoInsert.close()