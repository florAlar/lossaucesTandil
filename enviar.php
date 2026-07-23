<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST['nombre']);
    $email = htmlspecialchars($_POST['email']);
    $telefono = htmlspecialchars($_POST['telefono']);
    $fecha_entrada = htmlspecialchars($_POST['fecha-entrada']);
    $fecha_salida = htmlspecialchars($_POST['fecha-salida']);
    $cantidad_personas = htmlspecialchars($_POST['cantidad-personas']);
    $mensaje = htmlspecialchars($_POST['mensaje']);

    $destinatario = "tu-email@dominio.com"; // Reemplazar con tu email
    $asunto = "Nueva consulta desde la web de Cabañas Los Sauces";

    $cuerpo = "Nombre: " . $nombre . "\n";
    $cuerpo .= "Email: " . $email . "\n";
    $cuerpo .= "Teléfono: " . $telefono . "\n";
    $cuerpo .= "Fecha de Entrada: " . $fecha_entrada . "\n";
    $cuerpo .= "Fecha de Salida: " . $fecha_salida . "\n";
    $cuerpo .= "Cantidad de Personas: " . $cantidad_personas . "\n";
    $cuerpo .= "Mensaje: " . $mensaje . "\n";

    $headers = "From: " . $email;

    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
        echo "<h1>¡Consulta enviada con éxito!</h1>";
        echo "<p>Gracias por contactarnos. Te responderemos a la brevedad.</p>";
        echo "<a href='index.html'>Volver al inicio</a>";
    } else {
        echo "<h1>Error al enviar la consulta.</h1>";
        echo "<p>Por favor, intentá nuevamente más tarde.</p>";
        echo "<a href='contacto.html'>Volver al formulario</a>";
    }
} else {
    header("Location: contacto.html");
}
?>
