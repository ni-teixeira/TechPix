import mysql.connector

import psutil

from mysql.connector import errorcode

from datetime import datetime

cursor = ""

def executar(dados):

    print(dados)
	
    cursor = conexaoSelect.cursor()
	
    sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "
    
    bibliotecaCaptura = psutil
	
    while True:
        
        dataHoraAtual = datetime.now()
        
        porcentagem_atual = bibliotecaCaptura.cpu_percent(interval=1)

        if "CPUPercent" in dados:
            print("Porcentagem da CPU: ", porcentagem_atual, "%")
            sql += "(%s, %s, 5);"
            values = (porcentagem_atual, dataHoraAtual)
            cursor.execute(sql, values)
            sql = "INSERT INTO Monitoramento (medida, dtHora, fkComponente) VALUES "
        
        conexaoSelect.commit()

def metricas(listaMetricas):

    porcentagem = False
    bytes = False
    pacotes = False

    if('Porcentagem da CPU', 'Porcentagem de RAM disponível', 'Porcentagem de Armazenamento utilizado') in listaMetricas:
        porcentagem = True
        
    if('Número de pacotes enviados', 'Número de pacotes recebidos') in listaMetricas:
        pacotes = True
        
    if ('Total de RAM', 'Total de RAM disponível', 'Total de Memória Swap utilizada', 'Total de Armazenamento') in listaMetricas:
        bytes = True

    while True:

        mensagem = '(Métricas disponíveis: '
        i = 0

        while listaMetricas.len > i:
            if listaMetricas.len != i:
                mensagem += listaMetricas[i] + ", "
            else:
                mensagem += listaMetricas[i] + ".)"
            i += 1
         
        metricas = input("Quais métricas deseja analisar? ")

        
        


             
            

def interagir(listaServidores):

    listaComponentes = []
    listaMetricas = [] # SELECT DISTINCT  m.tipo AS Tipo FROM Monitoramento AS m JOIN Componentes AS c ON m.fkComponente = c.idComponentes WHERE c.fkServidor = %s;

    print('Seja bem-vindo à API de seleção de dados WinselectPy!!')

    while True:

        mensagem = "(Máquinas disponíveis: "

        i = 0
        while listaServidores.len > i:
            if listaServidores.len != i:
                mensagem += listaServidores[i] + ", "
            else:
                mensagem += listaServidores[i] + ".)"
            i += 1

        escolha = input("Insira qual máquina gostaria de vizualizar os dados: " + mensagem + "  ")
            
        i = 0

        if escolha in listaServidores:
            sql = "SELECT tipo AS Tipo, idComponentes AS Componente FROM Componentes WHERE fkServidor = %s;"
            values = (escolha)
            cursor.execute(sql, values)

            mensagem = ("Componentes disponíveis: ")

            while listaComponentes.len > i:
                if listaComponentes.len != i:
                    mensagem += listaComponentes[i] + ", "
                else:
                     mensagem += listaComponentes[i] + ".)"

            componente = input("Qual componente deseja observar dentre os que estão sendo monitorados? " + mensagem + "  ")

            print(mensagem)

            for (Tipo, Componente) in cursor:
                listaMetricas.append(Tipo)
                listaComponentes.append(Componente)
            
            if componente in listaComponentes:
                metricas(listaMetricas)
                return
            else:
                print("Por favor insira um dos componentes citados acima")
        else:
            print('Por favor insira um dos números descritos acima')

def login():

    email = input("\n\nInsira o seu email de acesso:  ")
    senha = input("Insira o sua senha de acesso:  ")

    if email == "safra@gmail.com" and senha == "Urubu#100":
        sql = "SELECT idServidores FROM Servidores AS s JOIN Empresa AS e ON e.idEmpresa = s.fkEmpresa WHERE e.email = 'safra@gmail.com' and e.senha = 'Urubu#100';"
        cursor.execute(sql)
        listaServidores = []
        for (idServidores)  in cursor:
            listaServidores.append(idServidores)
        print(listaServidores)
        interagir(listaServidores)
    else:
        print("\nPor favor insira email ou senha inválidos")
        login()
        

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