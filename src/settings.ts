module.exports = {
    bunyan: {
        name: "Blue DragonFly",
        streams: [
            {
                level: 'info',
                stream: process.stdout
            },
            {
                level: 'error',
                stream: process.stdout
            }
        ]
    },
    express: {
        listen: 3000
    },
    i18next: {
        dynamicLoad: true,
        fallbackLng: "en",
        resGetPath: "dist/locale/__ns__-__lng__.json"
    },
    reCaptcha: {
        secret: ""
    },
    smtp: {
        port: 1025,
        auth: {
            user: "admin@test.com"
        }
    }
};
