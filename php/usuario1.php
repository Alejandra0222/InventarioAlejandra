<?php
//Incluir el php de conexion//
include_once 'conexion.php';

session_start();

//Obtener y decodificar la entrada JSON//
$input =json_decode(file_get_contents("php://input"), true);
if(!$input || !isset($input['action'])){
    echo json_encode(['success'=> false, 'message' => 'Action']);
}

$action = $input['action'];


if ($action=="registro") {

    // Obtener y decodificar la entrada JSON
    $input= json_decode(file_get_contents("php://input"),true);
    if (!$input || !isset($input['NuevoNombre']) || !isset($input['NuevoApellido']) || !isset($input['NuevoCorreo']) || !isset($input['NuevoTelefono']) || !isset($input['NuevoRol']) || !isset($input['NuevaPass'])){
        echo json_encode(['success' => false, 'message' => 'Datos inválidos']);  //21-24 valida datos//
        exit();
    }
    $NuevoNombre= htmlspecialchars($input['NuevoNombre']);
    $NuevoApellido= htmlspecialchars($input['NuevoApellido']);
    $NuevoCorreo= htmlspecialchars($input['NuevoCorreo']);
    $NuevoTelefono= htmlspecialchars($input['NuevoTelefono']);
    $NuevoRol= htmlspecialchars($input['NuevoRol']);
    $NuevaPass= htmlspecialchars($input['NuevaPass']);

    $NuevaPassHash =password_hash($NuevaPass,PASSWORD_BCRYPT); //para incriptar la contraseña//

    try{
        $stmt = $pdo->prepare("INSERT INTO usuario (Nombre,Apellido,Email,Telefono,Rol,pass) VALUES(:Nombre,:Apellido,:Email,:Telefono, :Rol, :pass)");
        $stmt -> bindParam(':Nombre', $NuevoNombre);
        $stmt -> bindParam(':Apellido', $NuevoApellido);
        $stmt -> bindParam(':Email', $NuevoCorreo);
        $stmt -> bindParam(':Telefono', $NuevoTelefono);
        $stmt -> bindParam(':Rol', $NuevoRol);
        $stmt -> bindParam(':pass', $NuevaPassHash);
        $stmt -> execute();
        echo json_encode(['success'=> true]);

        //$stmt = PDO::prepare ("INSERT INTO registrarcuenta (Nombre,Email,pass) VALUES(:Nombre,:Email,:pass)");
            //$stmt->execute([
                //'Nombre' => $NuevoNombre,
                //'Email' => $NuevoCorreo,
                //'pass' => $NuevaPass,
                    //]);

    }catch (PDOException $e) {
        if ($e->getCode() == 23000) {
        echo json_encode(['success' => false, 'message'=> 'El Nombre o correo ya esta registrado']);
        }else{
        echo json_encode(['success' => false, 'message'=> 'Error al registrar Nombre' . $e->getMessage()]);
        }
    }

}elseif($action == "login") {
    if (!$input || !isset($input['Nombre']) || !isset($input['pass'])) {
        echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
        exit;
    }

    $Nombre = htmlspecialchars($input['Nombre']);
    $pass = htmlspecialchars($input['pass']);

    try {
        // Obtener el usuario con su rol
        $stmt = $pdo->prepare("
        SELECT IdUsuario, Nombre, pass, Rol FROM usuario WHERE Nombre = :Nombre");
        $stmt->bindParam(':Nombre', $Nombre);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            $storedpass = $user['pass']; // Contraseña almacenada en la BD

            if (password_verify($pass, $storedpass)) {
                $_SESSION['user_id'] = $user['IdUsuario'];
                $_SESSION['Nombre'] = $user['Nombre'];
                $_SESSION['Rol'] = $user['Rol'];

                echo json_encode([
                    'success' => true, 
                    'message' => 'Inicio de sesión exitoso',
                    'rol' => $user['Rol']
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Nombre o contraseña incorrectos']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Nombre no encontrado']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al iniciar sesión: ' . $e->getMessage()]);
    }
} elseif ($action == "getPerfil") {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'Acción no válida']);
        exit;
    }

    $userId = $_SESSION['user_id'];
    try {
        $stmt = $pdo->prepare("SELECT * FROM usuario WHERE IdUsuario = :id");
        $stmt->bindParam(':id', $userId);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode([
                'success' => true,
                'Nombre' => $user['Nombre'],
                'Apellido' => $user['Apellido'],
                'Email' => $user['Email'],
                'Telefono' => $user['Telefono'],
                'Rol' => $user['Rol']
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al obtener los datos del perfil: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Acción no válida']);
}
?>



            