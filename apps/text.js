import { plugin } from 'node-karin'
import { getRandomLineFromFile } from '../utils/common.js'
import jieba from 'nodejieba';

const rootPath = process.cwd() + '/plugins/karin-plugin-levi'
export class text extends plugin {
  constructor () {
    super({
      name: 'levi-text',
      dsc: 'levi-text',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#?发癫`,
          fnc: 'fd'
        },
        {
          reg: `^#?(淫语|yinglish)`,
          fnc: 'yinglish'
        }
      ]
    })
  }

  async fd (e) {
    let msg = e.msg.replace(/^#?发癫/, '').trim()
    // 判断是否是艾特
    if (e.at.length > 0) {
      // 解决前缀问题
      msg = e.raw_message.replace(/^#?(.*)发癫/, '').trim() || e.at[0]
      msg = msg.replace(/@/g, '').trim()
    }
    // 判断是否含有发癫对象，没有则默认对憨憨发癫
    if (!msg || msg.length === 0) {
      msg = e.sender.card || e.sender.nick || '憨憨'
    }
    let path = rootPath + '/resources/json/psycho.json'
    let result = await getRandomLineFromFile(path)
    console.log(result)
    result = result.replace(/name/g, msg)
    console.log(result)
    await this.reply(result)
  }

  async yinglish (e) {
    let 淫乱度 = 0.8
    const words = jieba.tag(e.msg.replace(/^#?(淫语|yinglish)/, '').trim())
    const result = words.map(word => _词转换(word.word, word.tag, 淫乱度)).join('')
    await this.reply(result)
  }
}

function _词转换(x, y, 淫乱度) {
  if (Math.random() > 淫乱度) {
    return x;
  }
  if ([',', '，', '。'].includes(x)) {
    return '…';
  }
  if (['!', '！'].includes(x)) {
    return '❤';
  }
  if (x.length > 1 && Math.random() > 淫乱度) {
    return `${x[0]}…${x}`;
  } else {
    if (y === 'n') {
      return '〇'.repeat(x.length);
    }
    return `…${x}`;
  }
}