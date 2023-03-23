'use strcit'

// 判断是否登录
// 
module.exports = (options, app) => {
  return async function auth(ctx, next) {
    // 管理端接口  过滤登录接口和验证token
    // 如果是登录请求,则忽略
    const ignorePaths = ['/user/login']
    const valid = await ctx.verifyToken()
    if(valid || ignorePaths.includes(ctx.path)) {
      await next()
    }
  }
}