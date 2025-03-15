package com.techpix;
import java.util.List;

public class Componente {

    private String nome;
    private String medida;
    private Double valor;

    public Componente(String nome, String medida, Double valor) {
        this.nome = nome;
        this.medida = medida;
        this.valor = valor;
    }

    public String getNome() {
        return nome;
    }

    public String getMedida() {
        return medida;
    }

    public Double getValor() {
        return valor;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setMedida(String medida) {
        this.medida = medida;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public static void ordernarNome(List<Componente> vetor){
        String nomeComparado = "";
        Componente aux = new Componente("aux", "cmp", 0.0);
        for(int i = 0; i < vetor.size() - 1; i++) {
            Integer indice = i;
            String nomeAtual = (vetor.get(i)).getNome();
            for(int j = i + 1; j < vetor.size(); j++) {
                nomeComparado = (vetor.get(j)).getNome();
                if((vetor.get(indice).getNome()).compareTo(nomeComparado) >= 0) {
                    indice = j;
                }
             
            }
            aux.setNome((vetor.get(i)).getNome());
            vetor.get(i).setNome(vetor.get(indice).getNome());
            vetor.get(indice).setNome(aux.getNome());
        }
       
    }

    public static void ordernarMedida(List<Componente> vetor){
        String medidaComparado = "";
        Componente aux = new Componente("aux", "cmp", 0.0);
        for(int i = 0; i < vetor.size() - 1; i++) {
            Integer indice = i;
            String medidaAtual = (vetor.get(i)).getMedida();
            for(int j = i + 1; j < vetor.size(); j++) {
                medidaComparado = (vetor.get(j)).getMedida();
                if((vetor.get(indice).getMedida()).compareTo(medidaComparado) >= 0) {
                    indice = j;
                }
            }
            aux.setMedida((vetor.get(i)).getMedida());
            vetor.get(i).setMedida(vetor.get(indice).getMedida());
            vetor.get(indice).setMedida(aux.getMedida());
        }
       
    }

    /*
    public static void ordernarValor(List<Componente> vetor){
        Double aux = 0.0;
        for(int i = 0; i < vetor.size() - 1; i++) {
            Integer indice = i;
            for(int j = i + 1; j < vetor.size(); j++) {
                if(vetor.get(j).getValor() < vetor.get(i).getValor()) {
                    indice = j;
                }
            }
            aux = vetor.get(i).getValor();
            vetor.get(i).setValor(vetor.get(indice).getValor());
            vetor.get(indice).setValor(aux);
        }
        System.out.println(vetor);
    }
     */

    @Override
    public String toString() {
        return "Componente{" +
                "nome='" + nome + '\'' +
                ", medida='" + medida + '\'' +
                ", valor=" + valor +
                '}';
    }

    /*
    * Componente componente1 = new Componente("CPU", "Porcentagem", 50.4);
        Componente componente2 = new Componente("RAM", "Total", 50.4);
        Componente componente3 = new Componente("Disco", "Disponível", 50.4);
        Componente componente4 = new Componente("CPU", "Frequência", 50.4);
        Componente componente5 = new Componente("Rede", "Pacotes enviados", 50.4);
        Componente componente6 = new Componente("RAM", "Disponível", 50.4);
    * */
}
