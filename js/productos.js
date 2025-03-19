function crearProducto(){
    const action= "registroProducto";
    const NuevoProducto = document.getElementById("NuevoProducto").value;
    const NuevaImagen = document.getElementById("NuevaImagen").files;
    const NuevoPrecio = document.getElementById("NuevoPrecio").value;
    const NuevoStock = document.getElementById("NuevoStock").value;
    // const NuevaPass = document.getElementById("NuevaPass").value;
    
    fetch("../php/usuario1.php",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({action,NuevoProducto,NuevaImagen,NuevoPrecio,NuevoStock})
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