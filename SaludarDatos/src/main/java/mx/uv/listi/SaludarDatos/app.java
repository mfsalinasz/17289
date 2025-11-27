package mx.uv.listi.SaludarDatos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import  org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

@CrossOrigin
@RestController
public class app {

    @Autowired
    private Isaludadores Isaludadores;

    @RequestMapping(value = "/saludos", method = RequestMethod.GET)
    public void dameSaludos(){
        Isaludadores.findAll();

    }

    @RequestMapping(value = "/saludos", method = RequestMethod.POST)
    public void crearSaludos(@RequestBody Saludadores saludadores){
        Isaludadores.save(saludadores);

    }
    
}
