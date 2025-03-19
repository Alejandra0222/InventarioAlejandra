//const usuarioValido ="admin";
//const passValida ="1234";
let intentosRestantes =3;

function verificarLogin(){
    let action= "login"; //Define la acción que se mnada al servidor
    let Nombre = document.getElementById("NuevoNombre").value; // Obtiene el valor del campo de nombre de usuario
    let pass = document.getElementById("pass").value; // Obtiene el valor del campo de contraseña
    let mensaje = document.getElementById("message"); // Captura el elemento donde se mostrará el mensaje

    // Envía una solicitud HTTP al servidor para verificar el inicio de sesión
    fetch("usuario1.php",{
        method: "POST",
        headers:{
            "Content-Type": "application/json" // Indica que se envían datos en formato JSON
        },
        body: JSON.stringify({action, Nombre, pass}) // Convierte los datos en formato JSON y los envía en el cuerpo de la solicitud.
    })
    .then(response => response.json()) // Convierte la respuesta del servidor en un objeto JavaScript
    .then(data => {
            if(data.success){
                mensaje.style.color = "green";
                mensaje.textContent = "El inicio de sesion ha sido exitoso";
                setTimeout(() => {
                    window.location.href= "EjercicioListasDeProductos.html"
                }, 3000); 
            }else{
                intentosRestantes--;
                mensaje.style.color="Red";
                mensaje.textContent="Error" + data.message;
            }

             // Si los intentos restantes llegan a 0, bloquea el formulario.
        if (intentosRestantes===0){
            mensaje.textContent = "Cuenta Bloqueada. Vuelve a intentarlo mas tarde";
            document.getElementById("form").elements["Nombre"].disabled = true;
            document.getElementById("form").elements["pass"].disabled = true;
            document.getElementById("form").elements["submitButton"].disabled = true;
            }
    })
    // Captura cualquier error en la solicitud.
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("message").textContent="Error al iniciar sesion"
    });
}


// Función para registrar un nuevo usuario
function registrarUsuario(){
    const action= "registro";
    const NuevoNombre = document.getElementById("NuevoNombre").value;
    const NuevoApellido = document.getElementById("NuevoApellido").value;
    const NuevoCorreo = document.getElementById("NuevoCorreo").value;
    const NuevoTelefono = document.getElementById("NuevoTelefono").value;
    const NuevaPass = document.getElementById("NuevaPass").value;
    
    // Envía la solicitud de registro al servidor
    fetch("usuario1.php",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({action,NuevoNombre,NuevoApellido,NuevoCorreo,NuevoTelefono,NuevaPass})
    })
    .then(response => response.json())
    .then(data => {
        alert("exito")
        const mensajeRegistro = document.getElementById("mensajeRegistro");
        if(data.success){
            mensajeRegistro.style.color="green";
            mensajeRegistro.textContent="Registro Exitoso!";
        }else{
            alert("fetch no logro")
            mensajeRegistro.style.color="Red";
            mensajeRegistro.textContent="Error" + data.message;
        }
    })
    .catch(error=>{
        console.error("error", error);
        document.getElementById("mensajeRegistro").textContent="Error en el registro";
    });
}

function mostrarPerfil() {
    
    const action="getPerfil";
    fetch("/VisualCode3/usuario1.php", {
        method: "POST",
        headers: {
            "Content-Type": "aplication/json"
        },
        body: JSON.stringify({action})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("perfilNombre").value = data.Nombre;
            document.getElementById("perfilTelefono").value = data.Telefono;
            document.getElementById("perfilEmail").value = data.Email;
            document.getElementById("perfilUsuario").style.display = "block";
        } else {
            alert("Error: " + data.messsage);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert ("Hubo un problema al obtener los datos del perfil.");
    });
}
function cerrarPerfilDatos(){
    document.getElementById("perfilUsuario").style.display="none";
    document.getElementById("perfilNombre").disabled= true;
    document.getElementById("perfilTelefono").disabled= true;
    document.getElementById("perfilEmail").disabled= true;
    document.getElementById("overlay").style.display = "none";
}

function habilitar(){
    document.getElementById("perfilNombre").disabled= false;
    document.getElementById("perfilTelefono").disabled= false;
    document.getElementById("perfilEmail").disabled= false;
}

function modificarPerfil(){
    const action ="modificar";
    const NuevoNombre = document.getElementById("NuevoNombre").value;
    const NuevoCorreo = document.getElementById("NuevoCorreo").value;
    const NuevoTelefono = document.getElementById("NuevoTelefono").value;
} 

