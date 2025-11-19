package mx.uv.listi._9.Saludar;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SaludarControlador {

    @RequestMapping("/")
    public String home() {
        return "<ul>" +
               "<li>alta</li>" +
               "<li>baja</li>" +
               "<li>cambio</li>" +
               "<li>consulta</li>" +
               "</ul>";
    }

    @RequestMapping("/Saludar", method = RequestMethod.POST))
    public String Alta() {
        return "Método Alta invocado";
    }

    @RequestMapping("/Saludar", method = RequestMethod.DELETE)
    public String Baja() {
        return "Método Baja invocado";
    }

    @RequestMapping("/Saludar", method = RequestMethod.PUT)
    public String Cambio() {
        return "Método Cambio invocado";
    }

    @RequestMapping("/Saludar", method = RequestMethod.GET)
    public String Consulta() {
        return "Método Consulta invocado";
    }

}
