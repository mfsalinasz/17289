package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		System.out.println("Holaaaaaa");


	}

	@RequestMapping("/")
	public String home() {
		System.out.println("Holaaaaaaa");
		return "Binevenidos a Spring Boot!";
	}

	@RequestMapping("/hola")
	public String hola() {
		System.out.println("Hola");
		return "Hola";
	}

	@RequestMapping("/renzo")
	public String html() {
		String html = "<html><body><h1>Renzo</h1></body></html>";
		return html;
	}

}
