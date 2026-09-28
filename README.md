# SuperManager CBJ

Fantasy de baloncesto del Club Baloncesto Jaca, inspirado en el SuperManager acb y simplificado para el club.
PWA de un solo archivo (`index.html`), mismo estilo que Kortline v3 (Barlow Condensed + DM Sans, navy/naranja).

## Reglas (v0.2 · todo el club, sin puntuar a ningún jugador)
- **Fantasy de equipos:** cada mánager ficha 5 equipos del club (de alevín a senior). Cada equipo vale de ★ a ★★★ según su nivel, y hay 10 ★ en total. Uno es el **capitán** y puntúa ×2.
- **Puntos de cada equipo** según la diferencia final:

  | Resultado | Puntos |
  |---|---|
  | Gana de 15 o más | 15 |
  | Gana de 6 a 14 | 12 |
  | Gana de 1 a 5 | 10 |
  | Empate | 5 |
  | Pierde de 1 a 5 | 4 |
  | Pierde de 6 a 14 | 2 |
  | Pierde de 15 o más | 0 |

  Si un equipo no juega esa jornada, suma 0.
- **Porra:** cada partido del club se pronostica con quién gana (+3) y por cuánto: 1-5, 6-14 o 15+ (+2 más si también se acierta).
- **Mercado:** el admin lo cierra antes de los partidos y con eso quedan fijados plantilla, capitán y porra. Se reabre al publicar la jornada. Antes de la J1 los fichajes son libres; después, 2 por jornada (vender y cambiar capitán no cuentan).
- **Registro con apodo** + PIN + código del club + casilla "tengo 14 años o más, o mis padres me dejan". No se pide ningún nombre real.

Todo es ajustable en **Admin → Ajustes**.

## Flujo semanal del admin
1. **Entre semana:** Admin → Jornada → marca qué equipos juegan, con rival, día y casa/fuera → *Guardar partidos*. Con eso aparecen en la porra.
2. **Viernes:** *Cerrar mercado*.
3. **Después de los partidos:** mete los marcadores → *Publicar*. Si te equivocas, usa *Deshacer publicación*.
4. Cada pocas jornadas: Admin → Equipos → *Revisar estrellas según resultados*.
5. Clasificación → 📤 copia el ranking para WhatsApp.

## Modo demo
Mientras `FIREBASE_CONFIG` sea `null`, la app funciona con 10 equipos de ejemplo, 12 mánagers ficticios, 3 jornadas jugadas y la J4 con partidos para probar la porra, todo guardado solo en el navegador. El código del club es `DEMO`, y en la demo todos son admin.

## Puesta en marcha real (unos 20 min)
1. **Firebase:** crea un proyecto nuevo en console.firebase.google.com (por ejemplo `supermanager-cbj`).
   - *Authentication* → Método de acceso → activa **Correo electrónico/contraseña**. Por debajo, el login "nombre + PIN" usa un email sintético `nombre-apellido@supermanager-cbj.app`; nadie ve ni recibe ese correo.
   - *Firestore Database* → Crear (región `europe-southwest1`, Madrid) → pestaña Reglas → pega `firestore.rules` → Publicar.
   - *Configuración del proyecto* → Tus apps → Web (`</>`) → copia el objeto `firebaseConfig` y pégalo en `index.html`, en `const FIREBASE_CONFIG = {...}`.
2. **Código del club:** en Firestore, crea la colección `secret` con el documento `club` y el campo `code` = `TUCODIGO` (en mayúsculas).
3. **GitHub Pages (antes de crear tu cuenta):** crea el repo público `supermanager-cbj`, sube todos los archivos a la raíz (con el `firebaseConfig` ya pegado en `index.html`) y activa Settings → Pages → Deploy from a branch → `main` / `(root)`. Enlace: `https://marionadal.github.io/supermanager-cbj/`.
4. **Dominio autorizado:** Firebase → Authentication → Configuración → Dominios autorizados → Agregar dominio → `marionadal.github.io`. Sin este paso, el registro falla.
5. **Tu cuenta de admin:** abre el enlace, crea tu equipo con el código del club, copia tu UID en Authentication → Usuarios y crea en Firestore la colección `admins` con un documento cuyo ID sea tu UID (vale un campo cualquiera, p. ej. `nombre: "Mario"`). Recarga la app y aparecerá la pestaña Admin.
6. **Equipos:** Admin → Equipos → Añadir: categoría, género, letra si hay varios, y estrellas.
7. **Compartir:** manda por WhatsApp el enlace y el código del club. En iPhone se instala con Safari → Compartir → "Añadir a pantalla de inicio"; en Android, con Chrome → ⋮ → "Instalar aplicación".

## Limitaciones conocidas (v0.1)
- **PIN olvidado:** el admin no puede resetearlo desde la app. Borra el usuario en Authentication y su documento en `managers`, y la persona se vuelve a registrar.
- Las reglas impiden que un mánager toque los puntos o fiche con el mercado cerrado, pero **no validan el límite de estrellas en el servidor**. Alguien con conocimientos técnicos podría saltárselo. Para 50 personas del club es un riesgo asumible; si hiciera falta, se añade una Cloud Function.
- Los marcadores se meten a mano: Swish/NBN23 no tiene API pública.
- **v0.2 cambia el modelo de datos** (`teams` en lugar de `players`). Si llegaste a crear datos con la v0.1, borra en Firestore las colecciones `players`, `managers` y `jornadas` y vuelve a registrarte.
