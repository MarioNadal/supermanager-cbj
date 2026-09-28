# SuperManager CBJ

Fantasy de baloncesto del Club Baloncesto Jaca, inspirado en el SuperManager acb y simplificado para el club.
PWA de un solo archivo (`index.html`), mismo estilo que Kortline v3 (Barlow Condensed + DM Sans, navy/naranja).

## Reglas (v0.1)
- **Plantilla:** 5 jugadores (1 base, 2 aleros, 2 pívots) de los equipos senior.
- **Estrellas en vez de dinero:** cada jugador vale ★, ★★ o ★★★. Cada mánager tiene 10 ★. Si el club le sube las estrellas a un jugador, quien ya lo tenga lo conserva.
- **Puntos** = valoración del partido (sacada de Swish) × multiplicador según el marcador final:

  | Diferencia | Multiplicador |
  |---|---|
  | Gana de 15 o más | +30% |
  | Gana de 6 a 14 | +20% |
  | Gana de 1 a 5 | +10% |
  | Empata o pierde de 1 a 5 | ±0% |
  | Pierde de 6 a 14 | −5% |
  | Pierde de 15 o más | −10% |

  El multiplicador solo se aplica a valoraciones positivas. Si un jugador no juega, suma 0.
- **Jugador del partido:** el entrenador elige uno por partido y suma **+5**.
- **Mercado:** el admin lo cierra antes del primer partido del fin de semana (las alineaciones quedan fijadas en ese momento) y se reabre al publicar la jornada. Antes de la J1 los cambios son libres; después, 2 fichajes por jornada (vender no cuenta).

Todo se puede ajustar en **Admin → Ajustes**: estrellas, plantilla, cambios y bonus del MVP. La tabla de multiplicadores está en `DEFAULT_CFG.margen`.

## Flujo semanal del admin
1. **Viernes:** Admin → Jornada → *Cerrar mercado*.
2. **Después de los partidos:** mete de Swish el marcador de cada equipo y la valoración de cada jugador (vacío = no jugó), marca el **MVP** y pulsa *Publicar*.
3. Si te equivocas, *Deshacer publicación*, corriges y vuelves a publicar.
4. Cada pocas jornadas: Admin → Jugadores → *Revisar estrellas según rendimiento*, que propone estrellas por terciles de valoración media. Decides tú.
5. Clasificación → 📤 copia el ranking para WhatsApp.

## Modo demo
Mientras `FIREBASE_CONFIG` sea `null`, la app funciona con 28 jugadores y 12 mánagers ficticios y 3 jornadas ya jugadas, todo guardado solo en el navegador. El código del club es `DEMO`, y en la demo todos son admin.

## Puesta en marcha real (unos 20 min)
1. **Firebase:** crea un proyecto nuevo en console.firebase.google.com (por ejemplo `supermanager-cbj`).
   - *Authentication* → Método de acceso → activa **Correo electrónico/contraseña**. Por debajo, el login "nombre + PIN" usa un email sintético `nombre-apellido@supermanager-cbj.app`; nadie ve ni recibe ese correo.
   - *Firestore Database* → Crear (región `europe-southwest1`, Madrid) → pestaña Reglas → pega `firestore.rules` → Publicar.
   - *Configuración del proyecto* → Tus apps → Web (`</>`) → copia el objeto `firebaseConfig` y pégalo en `index.html`, en `const FIREBASE_CONFIG = {...}`.
2. **Código del club:** en Firestore, crea la colección `secret` con el documento `club` y el campo `code` = `TUCODIGO` (en mayúsculas).
3. **Tu cuenta de admin:** abre la app, crea tu equipo, busca tu UID en Authentication → Usuarios, y crea en Firestore `admins/{tuUID}` (un documento vacío). Recarga la app y aparecerá la pestaña Admin.
4. **GitHub Pages:** crea el repo `supermanager-cbj`, sube todos los archivos a la raíz y activa Settings → Pages → rama `main`. El enlace será `https://marionadal.github.io/supermanager-cbj/`.
5. Da de alta los jugadores (Admin → Jugadores) y comparte el enlace y el código por WhatsApp. Cada uno lo instala con "Añadir a pantalla de inicio".

## Limitaciones conocidas (v0.1)
- **PIN olvidado:** el admin no puede resetearlo desde la app. Borra el usuario en Authentication y su documento en `managers`, y la persona se vuelve a registrar.
- Las reglas impiden que un mánager toque los puntos o fiche con el mercado cerrado, pero **no validan el límite de estrellas en el servidor**. Alguien con conocimientos técnicos podría saltárselo. Para 50 personas del club es un riesgo asumible; si hiciera falta, se añade una Cloud Function.
- Las estadísticas se meten a mano: Swish/NBN23 no tiene API pública.
