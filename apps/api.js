import { karin, axios } from 'node-karin'

export const checkWeather = karin.command('^#?(Weather|weather|wea)', async (e) => {
  const msg = e.msg.replace(/^#?(Weather|weather|wea)/, '').trim()
  if (!msg) return e.reply('内容为空，你搞什么呢？', true)
  const response = await axios.get(`http://ovoa.cc/api/tianqi.php?msg=${msg}&n=1`)
  await e.reply(response.data, true)
  return true
})
