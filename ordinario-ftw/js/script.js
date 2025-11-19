document.addEventListener('DOMContentLoaded', () => {

    const btnNosotros = document.getElementById('btn-nosotros');
    const btnProyectos = document.getElementById('btn-proyectos');
    const btnCita = document.getElementById('btn-cita');
    const seccionNosotros = document.getElementById('seccion-nosotros');
    const seccionProyectos = document.getElementById('seccion-proyectos');
    const seccionCita = document.getElementById('seccion-cita');
    const formularioCita = document.getElementById('formulario-cita');
    const modalConfirmacion = document.getElementById('modal-confirmacion');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');
    const tablaProyectos = document.getElementById('tabla-proyectos').querySelector('tbody');
    const anunciosAria = document.getElementById('anuncios-aria');

    const secciones = [seccionNosotros, seccionProyectos, seccionCita];
    const botones = [btnNosotros, btnProyectos, btnCita];

    function cambiarSeccion(seccionActiva, botonActivo) {
        secciones.forEach(seccion => {
            if (seccion !== seccionActiva && seccion.classList.contains('visible')) {
                seccion.style.opacity = '0';
                seccion.style.transform = 'translateY(10px)';
                seccion.setAttribute('aria-hidden', 'true');

                setTimeout(() => {
                    seccion.classList.remove('visible');
                }, 300);
            } else if (seccion !== seccionActiva) {
                seccion.classList.remove('visible');
                seccion.setAttribute('aria-hidden', 'true');
            }
        });
        
        botones.forEach(boton => {
            boton.removeAttribute('aria-current');
            boton.setAttribute('aria-expanded', 'false');
        });

        setTimeout(() => {
            seccionActiva.classList.add('visible');
            seccionActiva.setAttribute('aria-hidden', 'false');
            
            setTimeout(() => {
                seccionActiva.style.opacity = '1';
                seccionActiva.style.transform = 'translateY(0)';
            }, 50);
            

            botonActivo.setAttribute('aria-current', 'page');
            botonActivo.setAttribute('aria-expanded', 'true');
            
            const tituloSeccion = seccionActiva.querySelector('h2');
            if (tituloSeccion) {
                tituloSeccion.focus();
                anunciarCambioSeccion(tituloSeccion.textContent);
            }
        }, 300);
    }

    function anunciarCambioSeccion(mensaje) {
        if (anunciosAria) {
            anunciosAria.textContent = `Navegando a: ${mensaje}`;
            
            setTimeout(() => {
                anunciosAria.textContent = '';
            }, 2000);
        }
    }

    function manejarNavegacionTeclado(evento) {
        const teclaPresionada = evento.key;
        const botonActual = evento.target;
        const indiceActual = botones.indexOf(botonActual);
        
        let nuevoIndice = indiceActual;
        
        switch (teclaPresionada) {
            case 'ArrowRight':
            case 'ArrowDown':
                evento.preventDefault();
                nuevoIndice = (indiceActual + 1) % botones.length;
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                evento.preventDefault();
                nuevoIndice = (indiceActual - 1 + botones.length) % botones.length;
                break;
            case 'Home':
                evento.preventDefault();
                nuevoIndice = 0;
                break;
            case 'End':
                evento.preventDefault();
                nuevoIndice = botones.length - 1;
                break;
            case 'Enter':
            case ' ':
                evento.preventDefault();
                botonActual.click();
                return;
        }
        
        if (nuevoIndice !== indiceActual) {
            botones[nuevoIndice].focus();
        }
    }

    btnNosotros.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarSeccion(seccionNosotros, btnNosotros);
    });
    
    btnProyectos.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarSeccion(seccionProyectos, btnProyectos);
    });
    
    btnCita.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarSeccion(seccionCita, btnCita);
    });

    botones.forEach(boton => {
        boton.addEventListener('keydown', manejarNavegacionTeclado);
    });
    
    formularioCita.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById('nombre');
        const correo = document.getElementById('correo');
        const telefono = document.getElementById('telefono');
        const formStatus = document.getElementById('form-status');
        
        limpiarErrores();
        
        let isValid = true;
        let primerCampoConError = null;
        
        if (nombre.value.trim() === '') {
            mostrarErrorCampo(nombre, 'El nombre es requerido');
            isValid = false;
            if (!primerCampoConError) primerCampoConError = nombre;
        } else if (nombre.value.trim().length < 2) {
            mostrarErrorCampo(nombre, 'El nombre debe tener al menos 2 caracteres');
            isValid = false;
            if (!primerCampoConError) primerCampoConError = nombre;
        } else {
            nombre.setAttribute('aria-invalid', 'false');
        }
        
        if (correo.value.trim() === '') {
            mostrarErrorCampo(correo, 'El correo electrónico es requerido');
            isValid = false;
            if (!primerCampoConError) primerCampoConError = correo;
        } else if (!validarEmail(correo.value.trim())) {
            mostrarErrorCampo(correo, 'Ingrese un correo electrónico válido');
            isValid = false;
            if (!primerCampoConError) primerCampoConError = correo;
        } else {
            correo.setAttribute('aria-invalid', 'false');
        }
        
        if (telefono.value.trim() === '') {
            mostrarErrorCampo(telefono, 'El número de teléfono es requerido');
            isValid = false;
            if (!primerCampoConError) primerCampoConError = telefono;
        } else if (!validarTelefono(telefono.value.trim())) {
            mostrarErrorCampo(telefono, 'Ingrese un número de teléfono válido');
            isValid = false;
            if (!primerCampoConError) primerCampoConError = telefono;
        } else {
            telefono.setAttribute('aria-invalid', 'false');
        }
        
        if (!isValid) {
            const mensajeError = 'Por favor, corrija los errores en el formulario.';
            formStatus.textContent = mensajeError;
            formStatus.classList.remove('visually-hidden');
            
            anunciarError(mensajeError);
            if (primerCampoConError) {
                primerCampoConError.focus();
            }
            return;
        }

        formStatus.textContent = 'Formulario enviado correctamente.';
        formStatus.classList.remove('visually-hidden');
        anunciarExito('Formulario enviado correctamente.');
        
        mostrarModal();
        formularioCita.reset();
        limpiarErrores();
    });

    function mostrarErrorCampo(campo, mensaje) {
        campo.setAttribute('aria-invalid', 'true');
        const errorId = campo.id + '-error';
        const errorElement = document.getElementById(errorId);
        
        if (errorElement) {
            errorElement.textContent = mensaje;
            errorElement.classList.remove('visually-hidden');
        }
    }

    function limpiarErrores() {
        const campos = [
            document.getElementById('nombre'),
            document.getElementById('correo'),
            document.getElementById('telefono')
        ];
        
        campos.forEach(campo => {
            if (campo) {
                campo.setAttribute('aria-invalid', 'false');
                const errorId = campo.id + '-error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.classList.add('visually-hidden');
                }
            }
        });
        
        const formStatus = document.getElementById('form-status');
        if (formStatus) {
            formStatus.textContent = '';
            formStatus.classList.add('visually-hidden');
        }
    }

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validarTelefono(telefono) {
        const re = /^[\d\s\-\(\)\+]{10,}$/;
        return re.test(telefono);
    }
    
    function anunciarError(mensaje) {
        if (anunciosAria) {
            anunciosAria.textContent = `Error: ${mensaje}`;
            
            setTimeout(() => {
                anunciosAria.textContent = '';
            }, 3000);
        }
    }

    function anunciarExito(mensaje) {
        if (anunciosAria) {
            anunciosAria.textContent = `Éxito: ${mensaje}`;
            
            setTimeout(() => {
                anunciosAria.textContent = '';
            }, 3000);
        }
    }
    
    function mostrarModal() {
        modalConfirmacion.removeAttribute('hidden');
        modalConfirmacion.setAttribute('aria-hidden', 'false');
        
        setTimeout(() => {
            document.body.classList.add('modal-abierto');
            
            btnCerrarModal.focus();

            configurarTrampaDeFoco(modalConfirmacion);
            
            if (anunciosAria) {
                anunciosAria.textContent = "Se ha abierto una ventana de confirmación. Su solicitud ha sido enviada.";
                
                setTimeout(() => {
                    anunciosAria.textContent = '';
                }, 3000);
            }
        }, 10);
    }

    function configurarTrampaDeFoco(elementoModal) {
        const elementosEnfocables = elementoModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const primerElemento = elementosEnfocables[0];
        const ultimoElemento = elementosEnfocables[elementosEnfocables.length - 1];
        
        function manejarTecladoModal(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === primerElemento) {
                        ultimoElemento.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === ultimoElemento) {
                        primerElemento.focus();
                        e.preventDefault();
                    }
                }
            }
            
            if (e.key === 'Escape') {
                cerrarModal();
            }
        }
        
        elementoModal.addEventListener('keydown', manejarTecladoModal);

        elementoModal._manejarTecladoModal = manejarTecladoModal;
    }

    function cerrarModal() {
        document.body.classList.remove('modal-abierto');
        modalConfirmacion.setAttribute('aria-hidden', 'true');

        const modalContenido = modalConfirmacion.querySelector('.modal-contenido');
        if (modalContenido) {
            modalContenido.style.opacity = '0';
            modalContenido.style.transform = 'translateY(20px)';
        }

        if (modalConfirmacion._manejarTecladoModal) {
            modalConfirmacion.removeEventListener('keydown', modalConfirmacion._manejarTecladoModal);
            delete modalConfirmacion._manejarTecladoModal;
        }
        
        setTimeout(() => {
            modalConfirmacion.setAttribute('hidden', 'true');

            const botonCita = document.getElementById('btn-cita');
            if (botonCita) {
                botonCita.focus();
            }

            if (anunciosAria) {
                anunciosAria.textContent = "Se ha cerrado la ventana de confirmación";
                
                setTimeout(() => {
                    anunciosAria.textContent = '';
                }, 2000);
            }
        }, 300);
    }

    btnCerrarModal.addEventListener('click', cerrarModal);

    modalConfirmacion.addEventListener('click', (e) => {
        if (e.target === modalConfirmacion) {
            cerrarModal();
        }
    });
    
    cargarDatosProyectos();
    
    /**
     * Función mejorada para cargar datos de proyectos
     * Incluye manejo de errores y mejor accesibilidad
     */
    function cargarDatosProyectos() {
        try {
            const xmlSimulado = `
            <proyectos>
                <proyecto>
                    <nombre>Torre Residencial Viento</nombre>
                    <ubicacion>Ciudad de México</ubicacion>
                    <anno>2023</anno>
                    <tipo>Residencial</tipo>
                    <area>12500</area>
                </proyecto>
                <proyecto>
                    <nombre>Centro Cultural Nautilus</nombre>
                    <ubicacion>Guadalajara</ubicacion>
                    <anno>2022</anno>
                    <tipo>Cultural</tipo>
                    <area>8750</area>
                </proyecto>
                <proyecto>
                    <nombre>Oficinas Corporativas Horizon</nombre>
                    <ubicacion>Monterrey</ubicacion>
                    <anno>2021</anno>
                    <tipo>Comercial</tipo>
                    <area>15200</area>
                </proyecto>
                <proyecto>
                    <nombre>Residencial Parque Norte</nombre>
                    <ubicacion>Querétaro</ubicacion>
                    <anno>2020</anno>
                    <tipo>Residencial</tipo>
                    <area>22000</area>
                </proyecto>
                <proyecto>
                    <nombre>Hotel Bahía Azul</nombre>
                    <ubicacion>Cancún</ubicacion>
                    <anno>2021</anno>
                    <tipo>Hotelero</tipo>
                    <area>18500</area>
                </proyecto>
            </proyectos>
            `;
            
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlSimulado, 'text/xml');
            
            const parseError = xmlDoc.querySelector('parsererror');
            if (parseError) {
                throw new Error('Error al parsear XML');
            }
            
            const proyectos = xmlDoc.getElementsByTagName('proyecto');
            
            if (!tablaProyectos) {
                throw new Error('No se encontró la tabla de proyectos');
            }
            
            tablaProyectos.innerHTML = '';
            
            for (let i = 0; i < proyectos.length; i++) {
                const proyecto = proyectos[i];
                const nombre = proyecto.getElementsByTagName('nombre')[0]?.textContent || 'Sin nombre';
                const ubicacion = proyecto.getElementsByTagName('ubicacion')[0]?.textContent || 'Sin ubicación';
                const anno = proyecto.getElementsByTagName('anno')[0]?.textContent || 'Sin año';
                const tipo = proyecto.getElementsByTagName('tipo')[0]?.textContent || 'Sin tipo';
                const area = proyecto.getElementsByTagName('area')[0]?.textContent || '0';
                
                const fila = document.createElement('tr');
                fila.setAttribute('role', 'row');
                
                fila.innerHTML = `
                    <td role="gridcell">${nombre}</td>
                    <td role="gridcell">${ubicacion}</td>
                    <td role="gridcell">${anno}</td>
                    <td role="gridcell">${tipo}</td>
                    <td role="gridcell">${Number(area).toLocaleString()} m²</td>
                `;
                
                tablaProyectos.appendChild(fila);
            }
            
            if (anunciosAria) {
                anunciosAria.textContent = `Se han cargado ${proyectos.length} proyectos en la tabla correctamente.`;
                
                setTimeout(() => {
                    anunciosAria.textContent = '';
                }, 3000);
            }
            
        } catch (error) {
            console.error('Error al cargar proyectos:', error);
            
            if (tablaProyectos) {
                tablaProyectos.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #666;">Error al cargar los proyectos. Intente recargar la página.</td></tr>';
            }
            
            // Anunciar error
            if (anunciosAria) {
                anunciosAria.textContent = 'Error al cargar los proyectos. Por favor, recargue la página.';
                
                setTimeout(() => {
                    anunciosAria.textContent = '';
                }, 5000);
            }
        }
    }

    window.addEventListener('error', (event) => {
        console.error('Error global:', event.error);
        
        if (anunciosAria) {
            anunciosAria.textContent = 'Ha ocurrido un error. Por favor, recargue la página.';
            
            setTimeout(() => {
                anunciosAria.textContent = '';
            }, 5000);
        }
    });

    cambiarSeccion(seccionNosotros, btnNosotros);

    setTimeout(() => {
        if (anunciosAria) {
            anunciosAria.textContent = 'Página de Ploceus26 Arquitectura cargada correctamente. Use Tab para navegar por el sitio.';
            
            setTimeout(() => {
                anunciosAria.textContent = '';
            }, 4000);
        }
    }, 1000);

});