package com.techpix;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class AnaliseComponentes {

    public static void main(String[] args) {
        Componente componente1 = new Componente("CPU", "Porcentagem", 50.4);
        Componente componente2 = new Componente("RAM", "Total", 49.4);
        Componente componente3 = new Componente("DISCO", "Disponível", 48.4);
        Componente componente4 = new Componente("CPU", "Frequência", 47.4);
        Componente componente5 = new Componente("REDE", "Pacotes enviados", 46.4);
        Componente componente6 = new Componente("RAM", "Disponível", 45.4);

        List<Componente> lista = new ArrayList<>();
        lista.add(componente1);
        lista.add(componente2);
        lista.add(componente3);
        lista.add(componente4);
        lista.add(componente5);
        lista.add(componente6);

        interagirComUsuario(lista);
    }

    public static void interagirComUsuario(List<Componente> lista) {
        try (Scanner scan = new Scanner(System.in)) {
            System.out.println("------------------------------------------------------------");
            System.out.println("Seja bem-vindo ao nosso sistema!\nVocê gostaria de ordernar a lista por:");
            Integer escolha;
            
            do { 
                System.out.println("\n1 - Nome\n2 - Componente\n3 - Sair\n");
                escolha = scan.nextInt();
            } while (escolha < 1 || escolha > 3);

            switch (escolha) {
                case 1:
                    Componente.ordernarNome(lista);
                    mostrarLista(lista);
                    break;
                case 2:
                    Componente.ordernarMedida(lista);
                    mostrarLista(lista);
                    break;
                default:
                    System.out.println("Até mais!");
                    break;
            }


        } catch (Exception e) {
            System.out.println("Entrada inválida! Informe apenas 1, 2 ou 3!");
        }

    }

    public static void mostrarLista(List<Componente> lista){
        System.out.println("--------------------------------------------------------");
        System.out.printf("%-20s %-21s %-10s\n", "Componente", "Medida", "Valor");
        System.out.println("--------------------------------------------------------");
        for (Componente componente : lista) {
            System.out.printf("%-20s %-20s  %.2f\n", componente.getNome(), componente.getMedida(), componente.getValor());
        }
        System.out.println("--------------------------------------------------------");
    }

}
