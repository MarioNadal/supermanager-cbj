# Pronósticos CBJ

El juego de pronósticos de todo el Club Baloncesto Jaca, de alevines a senior. Es una PWA de un solo archivo (`index.html`) con el mismo estilo que Kortline v3.

## Cómo se juega (v0.3)
Cada semana el club publica los partidos del fin de semana, y cada cuenta pronostica cada partido:

| Qué | Puntos |
|---|---|
| Quién gana | +2 |
| Por cuánto (1-5 / 6-14 / 15+), además de acertar el ganador | +3 |

- **El partido de tu propio equipo no se pronostica: se anima.**
- **Los pronósticos son privados.** Nadie ve qué ha dicho cada uno, solo los puntos. Al cerrar la jornada se muestran porcentajes globales ("el 70% dice que gana el CBJ").
- Hay clasificación **general**, **por categoría** (según el equipo elegido al registrarse) y **por jornada**, con un **podio** que se comparte por WhatsApp.
- **Insignias:** Pleno, Triple, En racha, Fiel, Podio y Ojo de halcón.
- Sin dinero ni premios.

## Datos que se guardan
- **De cada cuenta:** apodo (se avisa de no poner el nombre real), el equipo del club (opcional), los puntos y la casilla "soy padre, madre o tutor, o tengo su permiso".
- **De los equipos:** solo el nombre (categoría + género) y sus marcadores.
- **No se guarda ningún dato de jugadores:** ni nombres, ni estadísticas, ni fotos.
- Los pronósticos individuales viven en `preds/{uid}` y `predsLocked/{jornada}`. Según `firestore.rules`, solo pueden leerlos su dueño y el admin.

## Flujo semanal del admin
1. **Entre semana:** Admin → Jornada → marca qué equipos juegan, con rival, día y casa/fuera → *Guardar partidos*. A partir de ahí se pueden pronosticar.
2. **Antes del primer partido:** *Cerrar pronósticos*.
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
