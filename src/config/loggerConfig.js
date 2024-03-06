const levels = {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5
  };
  
  const loggerConfig = {
    levels,
    transports: {
      development: {
        level: 'debug',
        console: true
      },
      production: {
        level: 'info',
        file: {
          filename: 'errors.log',
          level: 'error'
        }
      }
    }
  };
  
  export default loggerConfig;
  