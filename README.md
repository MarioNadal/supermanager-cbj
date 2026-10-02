# Pronósticos CBJ

Pronósticos de los partidos del Club Baloncesto Jaca entre coaches (Mario, Alex y Alberto). Es una PWA de un solo archivo (`index.html`) con el mismo estilo que Kortline v3.

## Cómo se juega (v0.4)
Cada semana el club publica los partidos del fin de semana, y cada cuenta pronostica cada partido:

| Qué | Puntos |
|---|---|
| Quién gana | +4 |
| Por cuánto (1-5 / 6-10 / 11-15 / 16+), además de acertar el ganador | +6 |
| 🐺 Lobo solitario: eres el único que acierta el ganador de un partido (con 2+ pronósticos) | puntos de ese partido x2 |

- **El partido de tu propio equipo no se pronostica: se anima.**
- **Mientras está abierta, cada uno solo ve lo suyo.** Al cerrar la jornada se copia lo de todos a `jornadas/{n}.picks` y se ve qué ha dicho cada uno; en Resultados, con los puntos de cada uno y el 🐺 de quien fue lobo solitario (`jornadas/{n}.solo`).
- **Normas:** a los jugadores ni una palabra y prohibido influir en ningún partido.
- Hay clasificación **general**, **por categoría** (según el equipo elegido al registrarse) y **por jornada**, con un **podio** que se comparte por WhatsApp.
- **Insignias:** Pleno, Triple, En racha, Fiel, Podio y Ojo de halcón.
- Sin dinero ni premios.

## Pantalla principal
- Cuenta atrás hasta el cierre (verde, ámbar con menos de 24 h, rojo con menos de 3 h) y cuántos partidos te faltan.
- El admin ve además **quién lo tiene hecho** (completo / x de y / nada), sin ver qué ha puesto cada uno.

## Datos que se guardan
- **De cada cuenta:** apodo (se avisa de no poner el nombre real), el equipo del club (opcional), los puntos y la casilla "soy padre, madre o tutor, o tengo su permiso".
- **De los equipos:** solo el nombre (categoría + género) y sus marcadores.
- **No se guarda ningún dato de jugadores:** ni nombres, ni estadísticas, ni fotos.
- Los pronósticos individuales viven en `preds/{uid}` y `predsLocked/{jornada}`. Según `firestore.rules`, solo pueden leerlos su dueño y el admin.

## Flujo semanal del admin
1. **Entre semana:** Admin → Jornada → marca qué equipos juegan, con rival, **día y hora** y casa/fuera → *Guardar partidos*. A partir de ahí se pueden pronosticar.
2. **Cierre automático:** a la hora del primer partido (viernes o sábado) nadie puede cambiar nada (también lo impiden las reglas de Firestore). En cuanto el admin abre la app, la jornada se cierra sola y se ven los pronósticos de todos. Se puede seguir cerrando a mano con *Cerrar pronósticos*.
3. **Después:** mete los marcadores → *Publicar*. Se puede deshacer.
4. Clasificación → Jornada → **Compartir** copia el podio y los resultados para WhatsApp.
5. Admin → Jugadores: cambiar apodos inadecuados o quitar cuentas (PIN olvidado → quitar y registrarse otra vez).

## Puesta en marcha
1. Firebase (proyecto `supermanager-cbj`):
   - Authentication → Correo/contraseña activado.
   - Firestore → Reglas → pega `firestore.rules` → Publicar.
   - Crea `secret/club` con el campo `code` (en MAYÚSCULAS).
2. GitHub Pages: sube los archivos a la raíz del repo `supermanager-cbj`, con Pages desde `main` / root.
3. Authentication → Configuración → Dominios autorizados → añade `marionadal.github.io`.
4. Abre la app, crea tu cuenta y en Firestore crea `admins/{tuUID}` con un campo cualquiera. Recarga.
5. Admin → Equipos: da de alta los equipos reales.
6. Comparte el enlace y el código del club **con las familias**.

## Modo demo
Con `FIREBASE_CONFIG = null` la app funciona con 10 equipos de ejemplo, 14 cuentas ficticias y 3 jornadas jugadas. La J4 queda abierta para probar. Código: `DEMO`.

## Notas
- La v0.3 sustituye a las versiones de fantasy (v0.1 y v0.2). Si llegaste a crear datos con ellas, borra en Firestore las colecciones `players`, `managers`, `jornadas` y `teams` antes de empezar.
- Los marcadores se meten a mano (Swish/NBN23 no tiene API pública).
