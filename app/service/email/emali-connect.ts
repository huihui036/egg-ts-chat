
enum EmailType {
  Rejisiter = 1000,
  Login = 1001,
  ForgetPass = 1002
}
enum ConnextType {
  Rejisiter = "注册验证码",
  Login = "登入验证码",
  ForgetPass = "密码重置验证码"
}

// 生成随机验证

function randMathCode(length: number) {

  const connext = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklnmopqrstuvwxyz012345678'
  let code = ''
  for (let i = 0; i <= length; i++) {
    const index = parseInt((Math.random() * connext.length).toString())
    code = code + connext[index]
  }

  return code
}

function emailConnect(userEmail: string, type: number) {
  let contexType: string = ''
  switch (type) {
    case EmailType.Rejisiter:
      contexType = ConnextType.Rejisiter;
      break
    case EmailType.Login:
      contexType = ConnextType.Login;
      break
    case EmailType.ForgetPass:
      contexType = ConnextType.ForgetPass;
      break
  }
  const randmonCode = randMathCode(6)
  const mailConnect = {
    // 发件人 邮箱  '昵称<发件人邮箱>'
    from: '自主聊天网络<1315574336@qq.com>',
    // 主题
    subject: `${contexType}`,
    // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
    to: userEmail,
    randMathCode: randmonCode,
    // 内容
    text: `您的激活验证码为：${randmonCode}, 30分钟内有效，请谨慎保管。`,
    //这里可以添加html标签
    html: `<p>您的激活验证码为：${randmonCode}, 30分钟内有效，请谨慎保管</p>`
  }
  return mailConnect

}
export { emailConnect } 