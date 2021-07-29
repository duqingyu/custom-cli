import Joi from 'joi'

// 上传产品文件接口（源图文件，纸样文件）
export const login = {
  username: Joi.string().required(),
  password: Joi.string().required()
}
