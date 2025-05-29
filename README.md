# Cálculo de VLSM para Subredes

## Instalación
Clona el repositorio en tu máquina local ejecutando el siguiente comando:

```bash
git clone https://github.com/DavidAlejandro18/vlsm-calc.git
```

Una ves descargado el repositorio, descarga todas las dependencias necesarias para ejecutar el programa con el siguiente comando:

```bash
npm install
```

Por ultimo, crear un archivo `.env` en la raíz del proyecto y agregar las siguientes variables de entorno:

```env
PORT=3000
URL_SERVER=https://vlsm-calc.onrender.com (opcional)
```

## Uso

Para ejecutar el programa, utiliza el siguiente comando:

```bash
npm start
```

El servidor se ejecutará en el puerto especificado en el archivo `.env` y podrás acceder a la aplicación en tu navegador web ingresando la siguiente URL:

```
http://localhost:3000
```

## Explicación

El cálculo de VLSM (Variable Length Subnet Masking) permite dividir una red principal en subredes de diferentes tamaños, ajustadas a las necesidades específicas de cada segmento. A continuación, se detalla el proceso paso a paso para realizar este cálculo.

### Paso 1: Determinar la Red Principal y el Prefijo
La red principal se define por una dirección IP y un prefijo que determina la cantidad de bits usados para la red. Si el prefijo no se especifica, se determina según la clase de la dirección IP:

- Clase A (1-126): Prefijo 8
- Clase B (128-191): Prefijo 16
- Clase C (192-223): Prefijo 24

### Paso 2: Ordenar las Subredes por Tamaño
Las subredes (LANs) se ordenan de mayor a menor según la cantidad de dispositivos que necesitan soportar. Esto garantiza que las subredes más grandes reciban los bloques de direcciones más grandes disponibles.

### Paso 3: Calcular los Bits Necesarios para Cada Subred
Para cada subred, se calcula el número de bits necesarios para los hosts:

```math
bits\_requeridos = [ \log_2(hosts\_requeridos + 2) ]$
```

### Paso 4: Determinar la Máscara de Subred
Con los bits necesarios, se calcula el nuevo prefijo de la subred:

```math
prefijo\_subred = 32 - bits\_requeridos$
```

La máscara de subred en formato decimal se obtiene convirtiendo a decimal una cadena binaria con los bits de red en 1 y los bits de hosts en 0.

### Paso 5: Calcular las Direcciones de Red y Broadcast
Para cada subred, se determina:

- Dirección de red: los bits de host son todos 0.
- Dirección de broadcast: los bits de host son todos 1.

La dirección de red se convierte en la primera dirección de host añadiendo 1 y la dirección de broadcast se convierte en la última dirección de host restando 1.

### Paso 6: Asignar la Siguiente Subred
La siguiente subred comienza inmediatamente después de la dirección de broadcast de la subred actual.