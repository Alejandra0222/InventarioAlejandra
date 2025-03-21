//const usuarioValido ="admin";
//const passValida ="1234";
let intentosRestantes = 3; // Intentos máximos

function verificarLogin() {
    let action = "login";
    let Nombre = document.getElementById("NuevoNombre").value.trim();
    let pass = document.getElementById("pass").value.trim();
    let mensaje = document.getElementById("message");

    if (!Nombre || !pass) {
        mensaje.style.color = "red";
        mensaje.textContent = "Por favor, ingrese el usuario y la contraseña.";
        return;
    }

    fetch("../php/usuario1.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ action, Nombre, pass })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mensaje.style.color = "green";
            mensaje.textContent = "Inicio de sesion exitoso.";
            
            setTimeout(() => {
                if (data.rol === "Comprador") {
                    window.location.href = "../html/PaginaComprador.html"; // Página para compradores
                } else {
                    window.location.href = "../html/EjercicioListasDeProductos.html"; // Página para administradores y vendedores
                }
            }, 2000);
        } else {
            intentosRestantes--;
            mensaje.style.color = "red";
            mensaje.textContent = "Error: " + data.message;

            if (intentosRestantes === 0) {
                mensaje.textContent = "Cuenta bloqueada. Inténtelo más tarde.";
                bloquearFormulario();
            }
        }
    })
    .catch(error => {
        console.error("Error en la petición:", error);
        mensaje.style.color = "red";
        mensaje.textContent = "Error al iniciar sesión. Inténtelo de nuevo.";
    });
}

function bloquearFormulario() {
    document.getElementById("NuevoNombre").disabled = true;
    document.getElementById("pass").disabled = true;
    document.getElementById("submitButton").disabled = true;
}



function registrarUsuario(){
    const action= "registro";
    const NuevoNombre = document.getElementById("NuevoNombre").value;
    const NuevoApellido = document.getElementById("NuevoApellido").value;
    const NuevoCorreo = document.getElementById("NuevoCorreo").value;
    const NuevoTelefono = document.getElementById("NuevoTelefono").value;
    const NuevoRol = document.getElementById("NuevoRol").value;
    const NuevaPass = document.getElementById("NuevaPass").value;
    
    fetch("/VisualCode3/php/usuario1.php",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({action,NuevoNombre,NuevoApellido,NuevoCorreo,NuevoTelefono,NuevoRol,NuevaPass})
    })
    .then(response => response.json())
    .then(data => {
        // alert("exito");
        const mensajeRegistro = document.getElementById("mensajeRegistro");
        if(data.success){
            mensajeRegistro.style.color="green";
            mensajeRegistro.textContent="Registro Exitoso!";
        }else{
            // alert("fetch no logro");
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
    document.getElementById("perfilDatos").style.display = "block";
    const action="getPerfil";
    fetch("/VisualCode3/php/usuario1.php", {
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
            document.getElementById("perfilApellido").value = data.Apellido
            document.getElementById("perfilTelefono").value = data.Telefono;
            document.getElementById("perfilRol").value = data.Rol;
            document.getElementById("perfilEmail").value = data.Email;
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
    document.getElementById("perfilDatos").style.display="none";
    document.getElementById("perfilNombre").disabled= true;
    document.getElementById("perfilApellido").disabled= true;
    document.getElementById("perfilTelefono").disabled= true;
    document.getElementById("perfilRol").disabled= true;
    document.getElementById("perfilEmail").disabled= true;
    document.getElementById("overlay").style.display = "none";
}

function habilitar(){
    document.getElementById("perfilTelefono").disabled= false;
    document.getElementById("perfilEmail").disabled= false;
}

function modificarPerfil(){
    const action ="modificar";
    const NuevoNombre = document.getElementById("NuevoNombre").value;
    const NuevoTelefono = document.getElementById("NuevoTelefono").value;
    const NuevoCorreo = document.getElementById("NuevoCorreo").value;

} 

