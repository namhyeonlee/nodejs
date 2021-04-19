const winston = require('winston')
const winstonDaily = require('winston-daily-rotate-file')
const appRoot = require('app-root-path')
const process = require('process')

const logDir = `${appRoot}/logs` //logs 디렉토리 하위에 로그파일 저장

const {
    combine,
    timestamp,
    label,
    printf
} = winston.format

const logFormat = printf(({

    level,
    message,
    label,
    timestamp
}) => {
    return `${timestamp} [${label}] ${level}: ${message}` //log 포맷출력
})

// log level
//error: 0, warn:1, info:2, http:3, verbose:4, debug:5, silly:6

const logger = winston.createLogger({
    format: combine(
        label({
            label:'LogTestSystem'
        }),
        timestamp({
            format:'YYYY-MM-DD HH:mm:ss'
        }),
        logFormat //log
    ),
    transports: [
        //info 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: '%DATE%.log',
            maxFiles: 30, //30일치 로그파일 저장
            zippedArchive: true
        }),
        //error 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: '%DATE%.error.log',
            maxFiles: 30, //30일치 로그파일 저장
            zippedArchive: true

        })

    ],
    exceptionHandlers: [
        //uncaughtException 발생시
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: '%DATE%.error.log',
            maxFiles: 30, //30일치 로그파일 저장
            zippedArchive: true

        })
    ]
    
})

//production 환경이 아닌 경우(dev 등)
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transport.Console({
        format: winston.format.combine(
            winston.format.combine(), //색깔 넣어서 출력
            winston.format.simple()
        )
    }))
}