// Textos de la presentación. Fuente: diseno/presentacion-guion.md (aprobado el 8 nov 2026).
// Todos los datos son de prueba.

// Nombres: cambiarlos aquí y en ningún otro sitio.
// En las pantallas del diseño las viajeras salen como «Viajera Uno» y «Viajera Dos»;
// la etiqueta entre paréntesis las une con su nombre.
const NOMBRES = {
  oficina: 'Laura',
  dueno: 'Alex',
  viajera: 'Camila',
  viajera2: 'Valentina',
};

const N = NOMBRES;
const V1 = `${N.viajera} (V1)`;
const V2 = `${N.viajera2} (V2)`;

const PERSONAS = {
  oficina: { nombre: N.oficina, rol: 'la oficina', equipo: 'escritorio', frase: 'Abro las salidas y valido los pagos.', recorridos: 'R1 y R4' },
  viajera: { nombre: N.viajera, etiqueta: 'Viajera #1', corta: 'V1', rol: 'la viajera', equipo: 'celular', frase: 'Me inscribo, pago y miro mi viaje.', recorridos: 'R2 y R3' },
  dueno: { nombre: N.dueno, rol: 'el dueño', equipo: 'celular', frase: 'Miro cómo va el negocio.', recorridos: 'R5' },
};

// Medidas de cada PNG en px de pantalla (el archivo va a 1,5× o 2×).
// tipo: Nuevo = no existía · Alternativa = propuesta para algo que ya existe.
const RECORRIDOS = [
  {
    id: 'r1',
    titulo: `${N.oficina} abre una salida e invita`,
    persona: 'oficina',
    equipo: 'escritorio',
    entrada: `Soy ${N.oficina}, de la oficina. Hoy abro la salida al Cocuy y le mando el enlace a la gente.`,
    pasos: [
      { codigo: 'R1.1', pantalla: 'Salidas', img: 'r1-1.png', w: 1440, h: 900, tipo: 'Nuevo',
        texto: 'Aquí veo las próximas salidas, de la más cercana a la más lejana, y qué le falta a cada una. El semáforo me dice por dónde empezar.',
        boton: 'Nueva salida' },
      { codigo: 'R1.2', pantalla: 'Nueva salida', img: 'r1-2.png', w: 1440, h: 900, tipo: 'Nuevo',
        texto: 'Lleno el plan, las fechas, los cupos, el coordinador, dónde y a qué hora nos encontramos, y hasta cuándo se puede pagar el saldo.',
        boton: 'Guardar · Enlace de inscripción' },
      { codigo: 'R1.3', pantalla: 'Enlace de inscripción', img: 'r1-3.png', w: 1440, h: 900, tipo: 'Nuevo',
        texto: 'La app me da el enlace de esta salida. Lo copio o lo mando por WhatsApp: quien se registre con él ya queda inscrito al Cocuy.',
        boton: 'Se manda por WhatsApp' },
    ],
  },
  {
    id: 'r2',
    titulo: `${V1} se inscribe por primera vez`,
    persona: 'viajera',
    equipo: 'celular',
    entrada: `Soy ${N.viajera}. Me llegó el enlace por WhatsApp y nunca había usado la app.`,
    pasos: [
      { codigo: 'R2.1', pantalla: 'Entrada con invitación', img: 'r2-1.png', w: 390, h: 844, tipo: 'Alternativa',
        texto: 'La app ya sabe a qué viaje me invitaron. Como no tengo cuenta, toco «Es mi primera vez aquí».',
        boton: 'Es mi primera vez aquí' },
      { codigo: 'R2.2', pantalla: 'Crear cuenta', img: 'r2-2.png', w: 390, h: 844, tipo: 'Alternativa',
        texto: 'Paso 1 de 4: mi documento, nombre, celular, correo y una contraseña.',
        boton: 'Crear mi cuenta' },
      { codigo: 'R2.3', pantalla: 'Tu viaje (paso 2)', img: 'r2-3.png', w: 390, h: 844, tipo: 'Alternativa',
        texto: `La salida ya viene puesta. Somos tres cupos: yo, ${V2} y uno que nombro después. Acepto la política de cancelación.`,
        boton: 'Confirmar inscripción' },
      { codigo: 'R2.4', pantalla: 'Tus datos (paso 3)', img: 'r2-4.png', w: 390, h: 844, tipo: 'Alternativa',
        texto: 'Mis datos para el viaje: ciudad, EPS, contacto de emergencia y talla. Lo médico solo lo ve el equipo de guías.',
        nota: 'El paso 4 y Mi nivel no están dibujados en este borrador.',
        boton: 'Guardar · luego paso 4 y Mi nivel' },
      { codigo: 'R2.5', pantalla: 'Mi viaje', img: 'r2-5.png', w: 390, h: 1154, tipo: 'Alternativa',
        texto: 'Esta es mi pantalla principal. Aquí la ves unos días después, con dos abonos ya validados. «Camino a la cumbre» me dice qué me falta para quedar lista.',
        boton: null },
    ],
  },
  {
    id: 'r3',
    titulo: `${V1} paga`,
    persona: 'viajera',
    equipo: 'celular',
    entrada: 'Hice una transferencia de $780.000. Ahora le aviso a la oficina.',
    pasos: [
      // Misma pantalla que R2.5 (en el diseño es el mismo Mi viaje).
      { codigo: 'R3.1', pantalla: 'Mi viaje', img: 'r2-5.png', w: 390, h: 1154, tipo: 'Alternativa',
        texto: 'Me faltan $2.500.000 COP de una reserva de $6.000.000. Toco «Subir comprobante».',
        boton: 'Subir comprobante' },
      { codigo: 'R3.2', pantalla: 'Subir comprobante', img: 'r3-2.png', w: 390, h: 844, tipo: 'Alternativa',
        texto: 'Escribo el monto, elijo cómo pagué y subo la foto o el PDF del comprobante.',
        boton: 'Enviar' },
      { codigo: 'R3.3', pantalla: 'Comprobante enviado', img: 'r3-3.png', w: 390, h: 844, tipo: 'Alternativa',
        texto: 'Listo. Mi saldo no cambia hasta que la oficina lo revise; me avisan cuando esté validado.',
        boton: 'Ver mi voucher (desde Mi viaje)' },
      { codigo: 'R3.4', pantalla: 'Voucher hoja 1', img: 'r3-4.png', w: 816, h: 1128, tipo: 'Alternativa', documento: true,
        texto: 'Mi voucher resume la reserva: quién viaja, qué he pagado, qué falta, qué incluye el plan y qué llevar. Me llega por correo y lo veo en el celular.',
        boton: null },
    ],
  },
  {
    id: 'r4',
    titulo: `${N.oficina} valida el pago y revisa la salida`,
    persona: 'oficina',
    equipo: 'escritorio',
    entrada: `De vuelta en la oficina. Llegó el comprobante de ${V1}.`,
    pasos: [
      { codigo: 'R4.1', pantalla: 'Inicio y alertas', img: 'r4-1.png', w: 1440, h: 900, tipo: 'Nuevo',
        texto: 'Al entrar veo lo que no puede esperar: 2 comprobantes por validar, 3 salidas que urgen y 1 devolución abierta.',
        boton: 'Bandeja' },
      { codigo: 'R4.2', pantalla: 'Bandeja', img: 'r4-2.png', w: 1440, h: 900, tipo: 'Nuevo',
        texto: 'A la izquierda la fila de comprobantes; en el centro, el comprobante en grande; a la derecha, lo que declaró la viajera, para compararlo. Si cuadra, valido (también con la tecla V).',
        boton: 'Validar y ver la salida' },
      { codigo: 'R4.3', pantalla: 'Detalle de salida', img: 'r4-3.png', w: 1440, h: 900, tipo: 'Nuevo',
        texto: 'En la salida veo cuánto llevamos recaudado, cuánto falta por cobrar y qué requisitos le faltan a cada viajero.',
        boton: 'Tocar a una persona' },
      { codigo: 'R4.4', pantalla: 'Ficha del viajero', img: 'r4-4.png', w: 1440, h: 1100, tipo: 'Nuevo',
        texto: `La ficha de ${V1}: sus datos, sus abonos, sus requisitos y una bitácora con todo lo que ha pasado.`,
        boton: null },
    ],
  },
  {
    id: 'r5',
    titulo: `${N.dueno} mira el negocio`,
    persona: 'dueno',
    equipo: 'celular',
    entrada: `Soy ${N.dueno}, el dueño. No necesito entrar al detalle: quiero saber cómo va el negocio desde el celular.`,
    pasos: [
      { codigo: 'R5.1', pantalla: 'Panel En vivo', img: 'r5-1.png', w: 390, h: 844, tipo: 'Nuevo',
        texto: 'Pesos y dólares van por separado: lo recaudado, lo que falta por cobrar y cuántos viajeros están listos. Abajo, las próximas salidas y cómo van.',
        boton: 'Tocar una salida' },
      { codigo: 'R5.2', pantalla: 'Salida desplegada', img: 'r5-2.png', w: 390, h: 844, tipo: 'Nuevo',
        texto: 'El Cocuy va en 69 %: $5.500.000 de $8.000.000. Veo a los cuatro viajeros y cuánto falta en cada reserva.',
        boton: 'Pestaña Mes' },
      { codigo: 'R5.3', pantalla: 'Mes', img: 'r5-3.png', w: 390, h: 844, tipo: 'Nuevo',
        texto: 'Lo que entró en noviembre, por cuenta de pago. Lo que está por validar todavía no cuenta.',
        boton: null },
    ],
  },
];

const PORTADA = {
  eyebrow: 'XPERIENCIA · BORRADOR 1',
  titulo: 'Una salida al Cocuy, contada por quien usa la app',
  texto: 'Este borrador muestra cómo trabajarían con la app nueva la oficina, los viajeros y el dueño. Son cinco recorridos cortos. Todos los datos son de prueba.',
  boton: 'Empezar',
  pie: 'Cómo se mira: flechas del teclado, toque o deslizar. Toca una pantalla para ampliarla.',
};

const PORQUE = {
  titulo: 'Por qué se ve así',
  entrada: 'Es una evolución del estilo actual, no un cambio de marca: se conservan el fondo oscuro, el naranja, Montserrat + Poppins y el tono sencillo. Estas son las decisiones que lo ordenan.',
  // muestra: id de la muestra en CSS (ver presentacion.js)
  decisiones: [
    { antes: 'El naranja significaba todo (marca, borde, aviso y botón a la vez).', ahora: 'Naranja solo para la acción principal.', muestra: 'botones' },
    { antes: 'El estado se adivinaba por el color.', ahora: 'Cada estado tiene su color, un punto y una palabra, así se entiende aunque no se distinga el color.', muestra: 'estados' },
    { antes: 'Los fondos oscuros casi iguales.', ahora: 'Cuatro escalones de superficie, sin sombras: fondo, pantalla, tarjeta y selección.', muestra: 'elevacion' },
    { antes: 'Letra chica y gris difícil de leer.', ahora: 'Mínimo 12 px y grises que se leen sobre todas las superficies (contraste 4,5:1 o más).', muestra: 'contraste' },
    { antes: 'Muchos botones del mismo peso.', ahora: 'Un botón principal por pantalla; el resto, secundario o en «Más».', muestra: 'fila' },
    { antes: 'El avance se contaba en frases sueltas.', ahora: '«Camino a la cumbre»: barra y lista de lo hecho y lo pendiente.', muestra: 'cumbre' },
  ],
  leyenda: [
    { tipo: 'Alternativa', texto: 'nuestra propuesta para algo que ya existe (la app del viajero, el voucher).' },
    { tipo: 'Nuevo', texto: 'pantalla que no existía (oficina y panel del dueño).' },
  ],
};

const CIERRE = {
  titulo: 'Esto es un borrador para revisar juntos',
  pasos: [
    'Revisan los cinco recorridos y anotan lo que cambiarían.',
    `Hacemos con ${N.oficina} el mapeo de las acciones de la oficina.`,
  ],
  fuera: 'No están en este borrador: olvidé mi contraseña, Mi nivel, Destinos, Próximas salidas, el paso 4 de la inscripción, registrar un abono a mano, cancelar y devolver.',
  boton: 'Volver a empezar',
  pie: 'Todos los nombres, documentos, teléfonos y montos son de prueba.',
};
