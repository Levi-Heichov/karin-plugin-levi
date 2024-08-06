import { plugin, segment } from 'node-karin'
import fetch from 'node-fetch'

export class voice extends plugin {
  constructor () {
    super({
      name: 'levi-voice',
      dsc: 'levi-voice',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#?(唱鸭|随机唱鸭)$',
          fnc: 'sjcy'
        },
        {
          reg: '^#?(坤坤语音|随机坤坤)$',
          fnc: 'sjkk'
        },
        {
          reg: '^#?(网易云|随机网易云)$',
          fnc: 'sjwyy'
        },
        {
          reg: '^#?骂我$',
          fnc: 'maren'
        },
        {
          reg: '^#?(绿茶|随机绿茶)$',
          fnc: 'lvcha'
        }
      ]
    })
  }

  // 随机网易云
  async sjwyy (e) {
    let url = 'https://api.yujn.cn/api/sjwyy.php?type=json'
    let response = await fetch(url) // 调用接口获取数据
    let result = await response.json()
    if (result.code != 200) {
      return e.reply('api寄了')
    }
    console.log(result)
    if (result.id) {
      await this.reply(segment.image(result.img))
      await this.reply(segment.record(result.url))
    } else {
      this.reply('随机到vip歌曲了，已自动随机下一首')
      this.sjwyy()
    }
  }

  // 随机唱鸭
  async sjcy (e) {
    await this.reply(segment.record('http://api.yujn.cn/api/changya.php?type=mp3'))
    return true // 返回true 阻挡消息不再往下
  }

  // 随机坤坤
  async sjkk (e) {
    await this.reply(segment.record('http://api.yujn.cn/api/sjkunkun.php?'))
    return true // 返回true 阻挡消息不再往下
  }

  // 随机语音骂人
  async maren (e) {
    await this.reply(segment.record('http://api.yujn.cn/api/maren.php?'))
    return true // 返回true 阻挡消息不再往下
  }

  // 绿茶语音包
  async lvcha (e) {
    await this.reply(segment.record('https://api.yujn.cn/api/lvcha.php?'))
    return true // 返回true 阻挡消息不再往下
  }
}
