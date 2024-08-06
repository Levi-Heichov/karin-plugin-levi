import { plugin } from 'node-karin'

export class urlAndBase extends plugin {
  constructor () {
    super({
      name: 'levi-api',
      dsc: 'levi-api',
      event: 'message',
      priority: 6,
      rule: [
        {
          reg: '^#?(Weather|weather|wea)',
          fnc: 'checkWeather'
        }
      ]
    })
  }

  // checkWeather
  async checkWeather (e) {
    let msg = e.msg.replace(/^#?(Weather|weather|wea)/, '').trim()
    console.log(msg)
    if (!msg) return e.reply('This is empty, Are you crazy?', { reply: true })
    let response = await fetch(`http://ovoa.cc/api/tianqi.php?msg=${msg}&n=1`)
    e.reply(await response.text(), { reply: true })
  }
}
