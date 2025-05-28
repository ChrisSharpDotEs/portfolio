from PIL import Image
import os

def convertir_jpg_a_webp(directorio):
    for archivo in os.listdir(directorio):
        if archivo.lower().endswith(".jpg") or archivo.lower().endswith(".png"):
            ruta_jpg = os.path.join(directorio, archivo)
            ruta_webp = os.path.splitext(ruta_jpg)[0] + ".webp"
            with Image.open(ruta_jpg) as img:
                img.save(ruta_webp, "webp")
                print(f"Convertido: {archivo} -> {os.path.basename(ruta_webp)}")

convertir_jpg_a_webp("./public/img")
