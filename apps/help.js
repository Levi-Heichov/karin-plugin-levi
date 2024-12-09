import { plugin, segment, render, Cfg } from 'node-karin'
import { dirPath, basename, config } from '../lib/utils/index.js'
import { helpCfg, helpList } from '../config/help/help.js'
import { style } from '../resources/help/imgs/config.js'
import _ from 'lodash'

export class setting extends plugin {
    constructor() {
        super({
            name: '[levi-plugin] 帮助',
            dsc: '[levi-plugin] 帮助',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: /^#?levi(帮助|help|菜单)$/i,
                    fnc: 'help',
                }
            ]
        })

    }

    async help(e) {
        let helpGroup = []
        _.forEach(helpList, (group) => {
            _.forEach(group.list, (help) => {
                let icon = help.icon * 1
                if (!icon) {
                    help.css = 'display:none'
                } else {
                    let x = (icon - 1) % 10
                    let y = (icon - x - 1) / 10
                    help.css = `background-position:-${x * 50}px -${y * 50}px`
                }
            })

            helpGroup.push(group)
        })

        let themeData = await getThemeData(helpCfg, helpCfg)

        const _res_path = dirPath + '/resources'
        const ImageData = {
            name: basename,
            fileID: basename,
            file: _res_path + '/help/index.html',
            quality: 100,
            data: {
                _res_path,
                _ws_path: _res_path,
                _layout_path: _res_path + '/common/layout/',
                defaultLayout: _res_path + '/common/layout/default.html',
                elemLayout: _res_path + '/common/layout/elem.html',
                helpCfg,
                helpGroup,
                ...themeData,
                element: 'default',
                sys: {
                    scale: 0.6,
                    copyright: `Created by ${Cfg.package.name} <span class="version">${Cfg.package.version}</span> & ${config.package.name} <span class="version">${config.package.version}</span>`
                }
            },
        }
        const img = await render.render(ImageData)
        e.reply(segment.image(img))
    }

}

async function getThemeCfg() {
    let resPath = '{{_res_path}}/help/imgs/'
    return {
        main: `${resPath}/main.png`,
        bg: `${resPath}/bg.jpg`,
        style: style
    }
}

async function getThemeData(diyStyle, sysStyle) {
    let helpConfig = _.extend({}, sysStyle, diyStyle)
    let colCount = Math.min(5, Math.max(parseInt(helpConfig?.colCount) || 3, 2))
    let colWidth = Math.min(500, Math.max(100, parseInt(helpConfig?.colWidth) || 265))
    let width = Math.min(2500, Math.max(800, colCount * colWidth + 30))
    let theme = await getThemeCfg()
    let themeStyle = theme.style || {}
    let ret = [`
    body{background-image:url(${theme.bg});width:${width}px;}
    .container{background-image:url(${theme.main});width:${width}px;}
    .help-table .td,.help-table .th{width:${100 / colCount}%}
    `]
    let css = function (sel, css, key, def, fn) {
        let val = getDef(themeStyle[key], diyStyle[key], sysStyle[key], def)
        if (fn) {
            val = fn(val)
        }
        ret.push(`${sel}{${css}:${val}}`)
    }
    css('.help-title,.help-group', 'color', 'fontColor', '#ceb78b')
    css('.help-title,.help-group', 'text-shadow', 'fontShadow', 'none')
    css('.help-desc', 'color', 'descColor', '#eee')
    css('.cont-box', 'background', 'contBgColor', 'rgba(43, 52, 61, 0.8)')
    css('.cont-box', 'backdrop-filter', 'contBgBlur', 3, (n) => diyStyle.bgBlur === false ? 'none' : `blur(${n}px)`)
    css('.help-group', 'background', 'headerBgColor', 'rgba(34, 41, 51, .4)')
    css('.help-table .tr:nth-child(odd)', 'background', 'rowBgColor1', 'rgba(34, 41, 51, .2)')
    css('.help-table .tr:nth-child(even)', 'background', 'rowBgColor2', 'rgba(34, 41, 51, .4)')
    return {
        style: `<style>${ret.join('\n')}</style>`,
        colCount
    }
}

function getDef() {
    for (let idx in arguments) {
        if (!_.isUndefined(arguments[idx])) {
            return arguments[idx]
        }
    }
}