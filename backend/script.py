import pandas as pd
import mysql.connector
from datetime import datetime

def excel_to_mysql(input_excel, db_config, table_name):
    # Leer el archivo Excel
    df = pd.read_excel(input_excel)

    # Establecer la conexión a la base de datos
    conexion = mysql.connector.connect(**db_config)
    cursor = conexion.cursor()

    # Obtener la fecha actual
    current_date = datetime.now()

    # Modificar el bucle de inserción de datos en la tabla existente
    for index, row in df.iterrows():
        dni = '' if pd.isna(row['DNI']) else str(row['DNI']) 
        
        if ',' in dni or '.' in dni:
            dni = dni.replace(',', '').replace('.', '')
        #print("como quedo dni")
        print(dni)
        try:

            if not dni:
                print(f"El DNI en la fila {index} está vacío. No se realizará la inserción.")
                continue
            
            dni_int = int(dni) 
            apellido = '' if pd.isna(row['Apellido']) else row['Apellido']
            nombre = '' if pd.isna(row['Nombre']) else row['Nombre']
            dependencia = '' if pd.isna(row['Dependencia']) else row['Dependencia']

            # Verificar si el DNI ya existe en la tabla
            check_query = f"SELECT DNI FROM {table_name} WHERE DNI = %s"
            cursor.execute(check_query, (dni,))
            existing_dni = cursor.fetchone()

            if existing_dni:
                print(f"El DNI {dni} ya existe en la tabla.")
            else:
                # Utilizar parámetros en la consulta de inserción
                sql = f"INSERT INTO {table_name} (DNI, Apellido, Nombre, Dependencia) VALUES (%s, UPPER(%s), UPPER(%s), %s)"
                values = (dni_int, apellido, nombre, dependencia)

                cursor.execute(sql, values)
        except ValueError:
             print(f"Error: El valor '{dni}' no es un número válido")
    # Confirmar y cerrar la conexión
    conexion.commit()
    cursor.close()
    conexion.close()

    print("Proceso completado.")

# Definir la ruta del archivo Excel
input_excel_file = 'Libro1.xlsx'

# Nombre de la tabla en la base de datos
table_name = 'autorizados'

# Configuración de la base de datos 
db_config = {
    'host': '170.210.202.5',
    'user': 'jjaime',
    'password': 'ingreso.2024',
    'database': 'ingreso'
}

# Llamar a la función para insertar nuevos datos sin borrar la tabla
excel_to_mysql(input_excel_file, db_config, table_name)
