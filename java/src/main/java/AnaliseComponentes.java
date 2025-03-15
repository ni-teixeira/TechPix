import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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

        Componente.ordernarNome(lista);
        Componente.ordernarMedida(lista);
        /*Componente.ordernarValor(lista);*/
    }
}
