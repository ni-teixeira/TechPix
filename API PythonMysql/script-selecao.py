import mysql.connector
from mysql.connector import errorcode

cursor = ""

def executar(metricas, componente, formato):
    global cursor

    if formato != '2': 
        sql = "SELECT tipo, AVG(medida) FROM Monitoramento WHERE fkComponente = %s AND tipo LIKE %s GROUP BY tipo LIMIT componente0;"
        values = (componente, f"%{metricas}%")
    else:
        sql = "SELECT tipo, medida FROM Monitoramento WHERE fkComponente = %s AND tipo LIKE %s;"
        values = (componente, f"%{metricas}%")

    cursor.execute(sql, values)

    resultados = cursor.fetchall()

    if resultados:
        for (tipo, medida) in resultados:
            print(f"{tipo}: {medida}")
    else:
        print("Nenhum dado encontrado para esta consulta.")
        
def metricas(componente):
    mensagem = '(Métricas disponíveis: Porcentagem, Pacotes, Bytes ou Processos)'
    metricas = input("Quais métricas deseja analisar? " + mensagem + " ")

    if metricas in ["Porcentagem", "Pacotes", "Bytes", "Processos"]:
        
        while True:

            if metricas in ["Porcentagem", "Pacotes", "Bytes"]:
                formato = input("Qual formato gostaria que aparecessem os resultados? (1 - Unitário) (2- Média a cada 10 registros)")
            else:
                executar(metricas, componente, formato)

            if formato == '1' or formato == '2':
                executar(metricas, componente, formato)
                return
            
            print("Por favor insira apenas valores como '1' ou '2'.")
    else:
        print("Por favor insira apenas 'Porcentagem', 'Pacotes' ou 'Bytes'")


def interagir(listaServidores):
    listaComponentes = []
    listaMetricas = []

    print("Seja bem-vindo à API de visualização de dados TechPix")
    
    print("""
             _______        _     _____ _      
            |__   __|      | |   |  __ (_)     
                | | ___  ___| |__ | |__) |__  __
                | |/ _ \/ __| '_ \|  ___/ \ \/ /
                | |  __/ (__| | | | |   | |>  < 
                |_|\___|\___|_| |_|_|   |_/_/\_\                      
    """)

    while True:
        mensagem = f"(Máquinas disponíveis: {', '.join(map(str, listaServidores))}.)"
        escolha = input("Insira qual máquina gostaria de visualizar os dados: " + mensagem + "  ")

        if escolha.isdigit() and int(escolha) in listaServidores:
            sql = "SELECT tipo, idComponentes FROM Componentes WHERE fkServidor = %s;"
            values = (int(escolha),)
            cursor.execute(sql, values)

            listaComponentes.clear()
            listaMetricas.clear()

            for (tipo, idComponentes) in cursor:
                listaMetricas.append(tipo)
                listaComponentes.append(idComponentes)

            if not listaComponentes:
                print("Nenhum componente encontrado para esta máquina.")
                continue

            mensagem = f"(Componentes disponíveis: {', '.join(map(str, listaComponentes))}.)"
            componente = input("Qual componente deseja observar? " + mensagem + "  ")

            if componente.isdigit() and int(componente) in listaComponentes:
                metricas(int(componente))
                return
            else:
                print("Por favor, insira um dos componentes listados acima.")
        else:
            print("Por favor, insira um dos números descritos acima.")

def login():
    email = input("\n\nInsira o seu email de acesso:  ")
    senha = input("Insira a sua senha de acesso:  ")

    if email == "safra@gmail.com" and senha == "Urubu#100":
        sql = "SELECT idServidores FROM Servidores AS s JOIN Empresa AS e ON e.idEmpresa = s.fkEmpresa WHERE e.email = %s AND e.senha = %s;"
        cursor.execute(sql, (email, senha))

        listaServidores = [idServidores for (idServidores,) in cursor]
        
        if not listaServidores:
            print("Nenhuma máquina encontrada para este usuário.")
            return

        print(listaServidores)
        interagir(listaServidores)
    else:
        print("\nEmail ou senha inválidos. Tente novamente.")
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