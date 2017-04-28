/**
 * Store log messages and printout to console if mode is 'development'
 *
 * Usage in components:
 *  super.logger.log('Error message', {}, 'info|warn|error')
 */
class Logger {
    constructor(mode = 'production', standardLevel = 'info')
    {
        this.mode = mode;
        this.standardLevel = standardLevel;
        this.entries = [];
    }

    /**
     * New log message. Print to console if logLevel is error or mode is development
     */
    log(message, payload = {}, logLevel = null)
    {
        if (null === logLevel) {
            logLevel = this.standardLevel;
        }

        switch (logLevel) {
            case 'info':
            case 'warn':
            case 'error':
                break;
            default:
                throw new Error('Unknown logLevel given: ' + logLevel);
        }

        this.entries.push({logLevel, message, payload});

        if (window.console) {
            if (logLevel == 'error') {
                console.error(`(${logLevel}) ${message} `, payload);
            } else if (this.mode == 'development') {
                console.log(`(${logLevel}) ${message} `, payload);
            }
        }
    }

    /**
     * @return Boolean
     */
    hasError() {
        return this.entries.some((el, idx) => {
            return el.logLevel == 'error';
        });
    }

    /**
     * @return Array Log messages with log level is "error"
     */
    getErrors() {
        return this.entries.filter((el) => {
            return el.logLevel == 'error';
        });
    }
}

export default Logger;
