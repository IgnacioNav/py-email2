document.addEventListener('DOMContentLoaded', function() {

    const form = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarForm);

    btnReset.addEventListener('click', function (e) {
        e.preventDefault();

        resetFormulario();
    })

    function enviarForm(e) {
        e.preventDefault();

        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.add('hidden');

            resetFormulario();

            // Alerta envio exitoso
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            form[e.target.name] = '';
            comprobarForm()
            return;
        } 

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement);
            form[e.target.name] = '';
            comprobarForm()
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Llenar el objeto de form
        form[e.target.name] = e.target.value.trim().toLowerCase();
        
        // Comprobar el objeto de form
        comprobarForm();

    }

    function mostrarAlerta(mensaje, referencia) {
        // Evitar duplicidad de alertas
        limpiarAlerta(referencia);

        // Generar la alerta
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'uppercase', 'font-bold', 'alerta');

        // Mostrar error en el formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        // Eliminar una alerta
        const alerta = referencia.querySelector('.alerta')
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        // Expresión regular
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarForm() {
        // Si hay un valor vacio, retorna true
        if(Object.values(form).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        } 

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
        // Reiniciar el objeto
        form.email = '';
        form.asunto = '';
        form.mensaje = '';

        formulario.reset();
        comprobarForm();
    }
});

