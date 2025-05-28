import subprocess

def start_background_process(command, path):
    try:
        subprocess.Popen(f"nohup {command} &", shell=True, cwd=path)
        print(f"Servicio {command} iniciado en {path} en segundo plano.")

    except Exception as e:
        print(f"Error al intentar iniciar el servicio: {e}")

if __name__ == "__main__":
    # Rutas y comandos
    backend_command = "node index.js"
    backend_path = "//media/lorena/documentos/proyectos/reg2/backend"
    frontend_command = "npm start"
    frontend_path = "/media/lorena/documentos/proyectos/reg2/ingreso"

    # Iniciar servicios en segundo plano
    start_background_process(backend_command, backend_path)
    start_background_process(frontend_command, frontend_path)


