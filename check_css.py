import os
def list_directory(directorio, action, excluded):
    """
    Lista archivos de un directorio de forma recursiva, excluyendo 
    subdirectorios con nombres específicos.

    Args:
        directorio (str): La ruta del directorio a escanear.
        excluidos (list): Una lista de nombres de directorios a ignorar.
    """
    for ruta_actual, directorios, archivos in os.walk(directorio):
        for ruta_actual, directorios, archivos in os.walk(directorio):
            directorios[:] = [d for d in directorios if d not in excluded]

        for nombre_archivo in archivos:
            ruta_completa = os.path.join(ruta_actual, nombre_archivo)
            action(ruta_completa)


def find_word(word, filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as archivo:
            for linea in archivo:
                if word in linea:
                    print(f"Archivo: {filepath} -> {linea.strip()}")
    except Exception as e:
        #print(f"Error al leer el archivo {filepath}: {e}")
        return

list_directory(directorio='./', action=lambda filepath: find_word('z-', filepath), excluded=['node_modules', '.git'])