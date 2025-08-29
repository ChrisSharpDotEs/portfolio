#!/bin/bash

# Verifica si se proporcionó una URL
if [ -z "$1" ]; then
  echo "Uso: $0 https://soydigital.ai"
  exit 1
fi

# Realiza la solicitud y muestra los encabezados
echo "🔍 Encabezados HTTP para: $1"
echo "--------------------------------------"
curl -s -X GET -D - -o /dev/null -A "Mozilla/5.0" "$1"
echo "--------------------------------------"
