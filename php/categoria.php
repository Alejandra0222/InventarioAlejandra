<?php
include_once 'conexion.php'; 

header('Content-Type: application/json');

$input = json_decode(file_get_contents("php://input"), true);
$action = $_GET['action'] ?? ($input['action'] ?? null);

if (!$action) {
    echo json_encode(['success' => false, 'message' => 'Acción no válida']);
    exit();
}

// 🔹 Registrar Categoria
if ($action === "registroCategoria") {
    if (!isset($input['nombreCategoria']) || !isset($input['descripcionCategoria'])) {
        echo json_encode(['success' => false, 'message' => 'Faltan datos del Categoria']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO categoria (Nombre, Descripcion) 
                               VALUES(:Nombre, :Descripcion)");
        $stmt->execute([
            ':Nombre' => htmlspecialchars($input['nombreCategoria']),
            ':Descripcion' => htmlspecialchars($input['descripcionCategoria']),
        ]);

        echo json_encode(['success' => true, 'message' => 'Categoria registrado con éxito']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al registrar: ' . $e->getMessage()]);
    }
    exit();
}

// 🔹 Obtener Categoria
if ($action === "obtenerCategoria") {
    try {
        $stmt = $pdo->query("SELECT IdCategoria, Nombre, Descripcion FROM categoria");
        echo json_encode(['success' => true, 'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al obtener Categoria: ' . $e->getMessage()]);
    }
    exit();
}

// 🔹 Editar Categoria
if ($action === "editarCategoria") {
    try {
        $stmt = $pdo->prepare("UPDATE categoria SET Nombre = :Nombre, Descripcion = :Descripcion WHERE IdCategoria = :Id");
        $stmt->execute([
            ':Id' => $input['IdCategoria'],
            ':Nombre' => htmlspecialchars($input['nombreCategoria']),
            ':Descripcion' => htmlspecialchars($input['descripcionCategoria']),
        ]);

        echo json_encode(['success' => true, 'message' => 'Categoria actualizado con éxito']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar: ' . $e->getMessage()]);
    }
    exit();
}

// 🔹 Eliminar Categoria
if ($action === "eliminarCategoria") {
    try {
        $stmt = $pdo->prepare("DELETE FROM categoria WHERE IdCategoria = :Id");
        $stmt->execute([':Id' => $input['IdCategoria']]);

        echo json_encode(['success' => true, 'message' => 'Categoria eliminado con éxito']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al eliminar: ' . $e->getMessage()]);
    }
    exit();
}

echo json_encode(['success' => false, 'message' => 'Acción desconocida']);
exit();
