import { plugin, segment, common } from '#Karin'
import path from 'path'

export class urlAndBase extends plugin {
  constructor () {
    super({
      name: 'levi-send',
      dsc: 'levi-send',
      event: 'message',
      priority: 6,
      rule: [
        {
          reg: '^#(sendPic|sendpic|pic)',
          fnc: 'sendPicture',
          permission: 'master'
        },
        {
          reg: '^#(sendVid|sendvid|vid)',
          fnc: 'sendVideo',
          permission: 'master'
        },
        {
          reg: '^#(sendRec|sendrec|rec)',
          fnc: 'sendRecord',
          permission: 'master'
        }
      ]
    })
  }

  // sendPicture
  async sendPicture (e) {
    let url = e.msg.replace(/^#(sendPic|sendpic|pic)/, '').trim()
    if (!url) return e.reply('This is null, Are you crazy?', true)
    if (url.startsWith('http')) {
      e.reply(segment.image(url))
    }
  }

  // sendVideo
  async sendVideo (e) {
    let url = e.msg.replace(/^#(sendVid|sendvid|vid)/, '').trim()
    if (!url) return e.reply('This is null, Are you crazy?', true)
    if (url.startsWith('http')) {
      e.reply(segment.video(url))
    }
  }

  // sendRecord
  async sendRecord (e) {
    let url = e.msg.replace(/^#(sendRec|sendrec|rec)/, '').trim()
    if (!url) return e.reply('This is null, Are you crazy?', true)
    if (url.startsWith('http')) {
      e.reply(segment.record(url))
    }
  }
}
