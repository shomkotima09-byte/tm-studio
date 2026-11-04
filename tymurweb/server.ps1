# ==============================================================================
# TM STUDIO — SERVIDOR WEB LOCAL SEGURO (POWERSHELL)
# Arquitectura Blindada: Anti Path-Traversal, Cabeceras de Seguridad y Control de Acceso
# ==============================================================================

$port = 3000
$url = "http://localhost:$port/"
$folder = $PSScriptRoot

# Resolver ruta canónica estricta del directorio raíz
$canonicalRoot = [System.IO.Path]::GetFullPath($folder)
if (-not $canonicalRoot.EndsWith([System.IO.Path]::DirectorySeparatorChar.ToString())) {
    $canonicalRoot += [System.IO.Path]::DirectorySeparatorChar
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)

# Cabeceras de Seguridad Estándar OWASP para cada respuesta HTTP
function Add-SecurityHeaders($response) {
    $response.Headers.Add("X-Content-Type-Options", "nosniff")
    $response.Headers.Add("X-Frame-Options", "DENY")
    $response.Headers.Add("X-XSS-Protection", "0")
    $response.Headers.Add("Referrer-Policy", "strict-origin-when-cross-origin")
    $response.Headers.Add("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
    $response.Headers.Add("Cross-Origin-Opener-Policy", "same-origin")
    $response.Headers.Add("Cross-Origin-Resource-Policy", "same-origin")
    $response.Headers.Add("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://wa.me https://discord.gg;")
}

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "🛡️  SERVIDOR SEGURO ACTIVO EN: $url" -ForegroundColor Green
    Write-Host "🔒  Protección Path-Traversal activa: $canonicalRoot" -ForegroundColor Gray
    Write-Host "Presiona Ctrl+C para detener."
    Write-Host "==========================================================" -ForegroundColor Cyan

    # Abrir navegador automáticamente
    Start-Process $url

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        Add-SecurityHeaders($response)

        # 1. Control de Método HTTP (Solo permitir GET y HEAD)
        if ($request.HttpMethod -ne "GET" -and $request.HttpMethod -ne "HEAD") {
            $response.StatusCode = 405
            $response.StatusDescription = "Method Not Allowed"
            $msg = [System.Text.Encoding]::UTF8.GetBytes("405 Method Not Allowed")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
            $response.Close()
            continue
        }

        # 2. Sanitización y Descodificación de Ruta de Entrada
        $rawPath = [System.Uri]::UnescapeDataString($request.Url.LocalPath)
        if ($rawPath -eq "/" -or [string]::IsNullOrWhiteSpace($rawPath)) {
            $rawPath = "/index.html"
        }

        # Normalizar separadores y eliminar barra inicial
        $cleanRelativePath = $rawPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar.ToString())
        $targetFullPath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($canonicalRoot, $cleanRelativePath))

        # 3. DEFENSA CONTRA PATH TRAVERSAL (CWE-22)
        # La ruta resuelta DEBE comenzar estrictamente con el directorio raíz canónico
        if (-not $targetFullPath.StartsWith($canonicalRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
            $response.StatusCode = 403
            $response.StatusDescription = "Forbidden"
            $msg = [System.Text.Encoding]::UTF8.GetBytes("403 Forbidden: Acceso no permitido fuera del directorio raiz.")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
            $response.Close()
            continue
        }

        # 4. DEFENSA CONTRA EXPOSICIÓN DE ARCHIVOS DEL SISTEMA O CÓDIGO FUENTE PRIVADO
        # Bloquear ficheros sensibles aunque estén dentro del directorio
        $fileName = [System.IO.Path]::GetFileName($targetFullPath).ToLowerInvariant()
        $forbiddenFiles = @("server.ps1", "build-optimized.js", "test-seo-audit.js", "test-security.js", "audit.js", "package.json", "package-lock.json", ".gitignore", "readme.md")
        $fileExt = [System.IO.Path]::GetExtension($targetFullPath).ToLowerInvariant()

        if ($forbiddenFiles -contains $fileName -or $fileExt -eq ".ps1" -or $fileExt -eq ".map" -or $fileName.StartsWith(".")) {
            $response.StatusCode = 403
            $response.StatusDescription = "Forbidden"
            $msg = [System.Text.Encoding]::UTF8.GetBytes("403 Forbidden: Archivo protegido.")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
            $response.Close()
            continue
        }

        # 5. Servir el Recurso si Existe
        if ([System.IO.File]::Exists($targetFullPath)) {
            $mime = switch ($fileExt) {
                ".html"        { "text/html; charset=utf-8" }
                ".htm"         { "text/html; charset=utf-8" }
                ".css"         { "text/css; charset=utf-8" }
                ".js"          { "application/javascript; charset=utf-8" }
                ".json"        { "application/json; charset=utf-8" }
                ".xml"         { "application/xml; charset=utf-8" }
                ".txt"         { "text/plain; charset=utf-8" }
                ".webmanifest" { "application/manifest+json; charset=utf-8" }
                ".svg"         { "image/svg+xml" }
                ".png"         { "image/png" }
                ".jpg"         { "image/jpeg" }
                ".jpeg"        { "image/jpeg" }
                ".ico"         { "image/x-icon" }
                default        { "application/octet-stream" }
            }

            $bytes = [System.IO.File]::ReadAllBytes($targetFullPath)
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200

            if ($request.HttpMethod -eq "GET") {
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        } else {
            # Tratamiento seguro de Error 404
            $response.StatusCode = 404
            $custom404 = [System.IO.Path]::Combine($canonicalRoot, "404.html")
            if ([System.IO.File]::Exists($custom404)) {
                $bytes = [System.IO.File]::ReadAllBytes($custom404)
                $response.ContentType = "text/html; charset=utf-8"
                $response.ContentLength64 = $bytes.Length
                if ($request.HttpMethod -eq "GET") {
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                }
            } else {
                $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.ContentType = "text/plain; charset=utf-8"
                $response.ContentLength64 = $notFound.Length
                if ($request.HttpMethod -eq "GET") {
                    $response.OutputStream.Write($notFound, 0, $notFound.Length)
                }
            }
        }

        $response.Close()
    }
} catch {
    Write-Host "Error en el servidor seguro: $_" -ForegroundColor Red
} finally {
    $listener.Stop()
    $listener.Close()
}
