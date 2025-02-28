import mysql.connector

import psutil

from mysql.connector import errorcode

from datetime import datetime


def executar(dados):

    print(dados)
	
    cursor = conexaoInsert.cursor()
	
    sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "
    
    bibliotecaCaptura = psutil
    dataHoraAtual = datetime.now()

    if "ProcessosTotal" in dados:
        total = 0

        for processo in psutil.process_iter():
            total += 1

        sql += "('Quantidade total de processos', %s, %s, 5)"
        values = (total, dataHoraAtual)
        cursor.execute(sql, values)
        print(total)
        sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "

    if "ProcessosAtivo" in dados:
        ativos = 0

        for processo in psutil.process_iter():
            
            if processo.status() == "running":
                ativos += 1

        sql += "('Quantidade de processos ativos', %s, %s, 5)"
        values = (ativos, dataHoraAtual)
        cursor.execute(sql, values)
        print(ativos)
        sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "

    if "ProcessosDesativados" in dados:
        desativados = 0

        for processo in psutil.process_iter():
                
            if processo.status() == "stopped":
                desativados += 1

        sql += "('Quantidade de processos desativados', %s, %s, 5)"
        values = (desativados, dataHoraAtual)
        cursor.execute(sql, values)
        print(desativados)
        sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "
    
    if "ProcessosTotal" in dados or "ProcessosAtivo" in dados or "ProcessosDesativados" in dados:
        conexaoInsert.commit()
        return
	
    while True:
        
        dataHoraAtual = datetime.now()

        if "CPUPercent" in dados:
            porcentagem_atual = bibliotecaCaptura.cpu_percent(interval=1)
            print("Porcentagem da CPU: ", porcentagem_atual, "%")
            sql += "('Porcentagem da CPU', %s, %s, 1);"
            values = (porcentagem_atual, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "

        if "CPUInterrupt" in dados:
            interrupcoes = bibliotecaCaptura.cpu_stats().interrupts
            print("Número de interrupções do sistema desde a sua inicialização: ", interrupcoes)
            sql += "('Número de interrupções do sistema desde a sua inicialização', %s, %s, 1);"
            values = (interrupcoes, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "

        if "CPUInterruptSoft" in dados:
            interrupcoesSoft = bibliotecaCaptura.cpu_stats().soft_interrupts
            print("Número de interrupções de softwares desde a sua inicialização: ", interrupcoesSoft)
            sql += "('Número de interrupções de softwares desde a sua inicialização', %s, %s, 1);"
            values = (interrupcoesSoft, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "

        if "CPUFreq" in dados:
            frequencia_atual = (bibliotecaCaptura.cpu_freq()).current
            print("Frequência da CPU: ", frequencia_atual, 'Hz')
            sql += "('Frequência da CPU', %s, %s, 1);"
            values = (frequencia_atual, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "

        if "RAMTotal" in dados:
            ramTotal = bibliotecaCaptura.virtual_memory().total
            print("Total de RAM: ", ramTotal)
            sql += "('Total de RAM', %s, %s, 2);"
            values = (ramTotal, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "

        if "RAMUsed" in dados:
            ramUtilizada = bibliotecaCaptura.virtual_memory().used
            print("Total de RAM disponível: ", ramUtilizada)
            sql += "('Total de RAM disponível', %s, %s, 2);"
            values = (ramUtilizada, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "

        if "RAMPercent" in dados:
            ramPercentual = bibliotecaCaptura.virtual_memory().percent
            print("Porcentagem de RAM disponível: ", ramPercentual, "%")
            sql += "('Porcentagem de RAM disponível', %s, %s, 2);"
            values = (ramPercentual, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "

        if "DISKSwap" in dados:
            memoriaSwap = bibliotecaCaptura.swap_memory().used
            (f"Total de Memória Swap utilizada: {memoriaSwap}")
            sql += "('Total de Memória Swap utilizada', %s, %s, 2);"
            values = (memoriaSwap, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "

        if "DISKPercent" in dados:
            discoPercentual = bibliotecaCaptura.disk_usage('C:\\').percent
            print("Porcentagem de Armazenamento utilizado: ", discoPercentual, "%")
            sql += "('Porcentagem de Armazenamento utilizado', %s, %s, 3);"
            values = (discoPercentual, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "

        if "DISKTotal" in dados:
            discoTotal = bibliotecaCaptura.disk_usage('C:\\').total
            print("Total de Armazenamento: ", discoTotal)
            sql += "('Total de Armazenamento', %s, %s, 3);"
            values = (discoTotal, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "

        if "REDESent" in dados:
            redeEnviado = bibliotecaCaptura.net_io_counters().packets_sent
            print("Número de pacotes enviados: ", redeEnviado)
            sql += "('Número de pacotes enviados', %s, %s, 4);"
            values = (redeEnviado, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "

        if "REDERecv" in dados:
            redeRecebido = bibliotecaCaptura.net_io_counters().packets_recv
            print("Número de pacotes recebidos: ", redeRecebido)
            sql += "('Número de pacotes recebidos', %s, %s, 4);"
            values = (redeRecebido, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (tipo, medida, dtHora, fkComponente) VALUES "

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

    verificacao = True

    while True:

        validacao = input("Gostaria que capturemos dados do seu dispositivo? (Sim/Não)  ")

        if validacao == "Sim": 
            print("Ótimo, vamos começar!")
            break
        elif validacao == "Não":
            print("Tudo bem, tenha um ótimo dia!")            
            verificacao = False
            break 
        else:
            print("Por favor, responda apenas com 'Sim' ou 'Não'.")

        # resposta = input("Quais tipos de dados que gostaria que seja capturado? (Apenas digite os números dos dados que deseja obter) \n (4- Frequência da CPU) (5- Memória RAM total) (6- Memória RAM utilizada) (7- Porcentagem da memória RAM utilizada) \n ")
    
    if verificacao:
        dados = ""
        
        while True:
            opcao = input("\nQuais componentes ou funcionalidades deseja monitorar? (1 - CPU) (2 - Memória RAM) (3- Disco) (4- Rede) (5 - Processos) ")
            
            continuacao = False

            finalizar = False
            
            if opcao == '1':
                while True:
                    
                    resposta = input("\nQuais dados gostaria que fossem capturados? (Digite os números em sequência se gostaria de mais que uma opção) \n(1 - Porcentagem utilizada)\n (2 - Número de interrupções desde o início do sistema) \n(3- Número de interrupções em softwares desde o início do sistema) \n(4- Frequência)  ")

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

                        while True:
                            if dados != "":
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
                            if dados != "":
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
                            if dados != "":
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
                            if dados != "":
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

            if opcao == '5':
                while True:
                    
                    resposta = input("\nQuais dados gostaria que fossem capturados? (Digite os números em sequência se gostaria de mais que uma opção) \n(1 - Quantidade total de processos)\n (2 - Quantidade de processos ativos) \n(3- Quantidade de processos desativados)")

                    if resposta == "" or (("1" in resposta) or ("2" in resposta) or ("3" in resposta) or ("4" in resposta)) == False:
                        print('\nPor favor insira números como "1", "2" e "3".')
                    else:
                        if "1" in resposta:
                            dados += "ProcessosTotal "
                        if "2" in resposta:
                            dados += "ProcessosAtivo "
                        if "3" in resposta:
                            dados += "ProcessosDesativados"

                        while True:
                            if dados != "":
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
            if finalizar:
                break
        return executar(dados)
    else:
        return

def login():

    email = input("\n\nInsira o seu email de acesso:  ")
    senha = input("Insira o sua senha de acesso:  ")

    if email == "safra@outlook.com" and senha == "urubu100":
        interagir()
    else:
        print("\nPor favor insira email ou senha inválidos")
        login()
        

try:
    conexaoInsert = mysql.connector.connect(host='10.18.32.8', user='techpixInsert', password='Urubu100', database='techpix')
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