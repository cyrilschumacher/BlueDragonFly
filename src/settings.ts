module.exports = {
    bunyan: {
        name: "Blue DragonFly",
        streams: [
            {
                level: "info",
                stream: process.stdout
            },
            {
                level: "error",
                stream: process.stderr
            }
        ]
    },
    express: {
        listen: 6000
    },
    mail: {
        templateDir: "dist/resource/template/mail/",
        from: "admin@test.com"
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
        ignoreTLS: true,
        port: 1025
    }
};
