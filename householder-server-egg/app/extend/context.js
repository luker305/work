'use strict'
module.exports = {
    ERROR_CODE: 500, //失败
    SUCCESS_CODE: 0, //成功
    NO_LOGIN_CODE: 100, //未登录
    UNIQUE_CODE: 200, //唯一性冲突


    //设置token
    setToken(data = {}){
        const { app }= this
        let { name,userUuid,userName,userType} = data
        if(decodeURI(name) === name){
            name = encodeURI(name)
        }
        const token = app.jwt.sign(data, app.config.jwt.secret, {expiresIn: '1h'})
        const cookieConfig = {maxAge:1000*3600*24*7, httpOnly:false, overwrite:true, sifned:false}
   
        this.cookies.set('token',token,{ ...cookieConfig, httpOnly: true})
        this.cookies.set('name',name,cookieConfig)
        this.cookies.set('userUuid',userUuid,cookieConfig)
        this.cookies.set('userName',userName,cookieConfig)
        this.cookies.set('userType',userType,cookieConfig)   
    },
    removeToken(){
        this.cookies.set('token',null)
    },


    // 校验token
	async verifyToken() {
		const { app } = this
		const name = this.cookies.get('name', { signed: false })
		const userUuid = this.cookies.get('userUuid', { signed: false })
		const userName = this.cookies.get('userName', { signed: false })
		const userType = this.cookies.get('userType', { signed: false })
		const token = this.cookies.get('token', { signed: false })
		// jwt.verify 方法做验证
		// decoded 是解码之后的token数据
		const verifyResult = await new Promise(resolve => {
			app.jwt.verify(token, app.config.jwt.secret, (err, decoded) => {
				if(err) {
					if(err.name === 'TokenExpiredError' && userUuid) {
						this.setToken({ name, userUuid, userName, userType })
						resolve({ verify: true, message: { userUuid }})
					}
					else {
						resolve({ verify: false, message: err.message })
					}
				} 
				else {
					resolve({ verify: true, message: decoded})
				}
			})
		})
		if(!verifyResult.verify) {
			this.verifyFail(401, verifyResult.message)
			return false
		}
		if(userUuid !== verifyResult.message.userUuid) {
			this.verifyFail(401, '用户uuid 与 token 不一致')
			return false
		}
		// 正常情况
		this.request.body.userUuid = userUuid
		this.request.body.userName = userName
		this.request.body.userType = userType
		// 将get请求的ctx.query 合并到ctx.request.body
		this.request.body = { ...this.request.body, ...this.query }
		// console.log(this.request.body)
		return true
	},

    verifyFail(code, message) {
		this.body = { code, message }
		this.status = code
	}

}