import winston from 'winston';

// Crea un objeto logger
const logger = winston.createLogger({
  // Define los niveles de registro y sus colores asociados
  levels: {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
  },
  // Define cómo se registrarán los mensajes
  transports: [
    new winston.transports.Console(), // Registra en la consola
    new winston.transports.File({ filename: 'errors.log', level: 'error' }) // Registra en un archivo solo los errores
  ],
});

// Añade colores personalizados para los niveles de registro
winston.addColors({
  debug: 'cyan',
  http: 'green',
  info: 'blue',
  warning: 'yellow',
  error: 'red',
  fatal: 'magenta',
});

export default logger;
