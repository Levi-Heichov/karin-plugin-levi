import { logger } from 'node-karin'
import { basename, config } from './utils/index.js'
/** 请不要在这编写插件 不会有任何效果~ */
logger.info(`${logger.violet(`[插件:${config.package.version}]`)} ${logger.green(basename)} 初始化完成~`)
