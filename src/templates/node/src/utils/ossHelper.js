import OSS from 'ali-oss'
import OSSCONFIG from '@/config/oss'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs'
import Url from 'url'
import http from 'http'
import https from 'https'

const client = new OSS({
  region: OSSCONFIG.region,
  accessKeyId: OSSCONFIG.accessKeyId,
  accessKeySecret: OSSCONFIG.accessKeySecret,
  bucket: OSSCONFIG.bucket
})

/**
 * oss相关服务
 */
export default class OssHelper {
  /**
   * 上传图片到oss通过file文件
   * @param {file} file 文件
   * @param {string} dir 需要上到指定的文件名
   * @returns 响应: ossUrl
   */
  static async uploadImageToAliOssByFile({ file, dir }) {
    let file_re = await this.readFileAsBuffer(file)

    const imgName = uuidv4() // uuid.v4生成文件名
    const imgType = file.type.substr(6, 4) // 取图片类型
    const filePath = `${dir}/${imgName}.${imgType}`
    // 想要成功上传base64数据到OSS，必须通过put接口传转换后的buffer文件
    let response = await client.put(filePath, file_re)
    if (response.res.status == 200) {
      return response.url.replace('http://', 'https://') // 返回OSS的图片地址到前端
    }
  }
  //将文件转为blob类型
  static async readFileAsBuffer(file) {
    let filePath = path.resolve(file.path) // 读取路径
    let data = fs.readFileSync(filePath) // 读取文件
    let base64File = new Buffer.from(data, 'base64') // base64转buffer
    return base64File
  }
  /**
   * 上传图片到oss通过httpUrl
   * @param {string} url http链接
   * @param {string} filename 需要上到指定的文件名
   * @returns 响应: ossUrl
   */
  static async httpImageToOssByHttpUrl({ url, imgType, dir }) {
    try {
      // uuid4生成文件名
      const filename = uuidv4() + imgType
      console.log('图片下载中..')
      const imageData = await this.downloadImage(url)
      console.log('图片保存到本地中..')
      const localPath = await this.saveImageToLocal({
        imageData,
        filename
      })
      console.log('图片上传oss中..')
      const ossRes = await client.put(`${dir}/${filename}`, localPath)
      console.log('删除图片中..')
      await this.delLocalImage(localPath)
      return ossRes.url
    } catch (error) {
      throw new Error(error)
    }
  }
  // 下载网络图片
  static async downloadImage(url) {
    const { protocol } = Url.parse(url)
    const $http = protocol === 'http:' ? http : https
    return new Promise((resolve, reject) => {
      $http.get(url, (res) => {
        let imageData = ''
        // 一定要设置response的编码为binary否则会下载下来的图片打不开
        res.setEncoding('binary')
        res.on('data', (chunk) => {
          imageData += chunk
        })
        res.on('end', () => {
          resolve(imageData)
        })
        res.on('error', (err) => {
          reject(err)
        })
      })
    })
  }
  // 将图片保存到本地
  static async saveImageToLocal({ imageData, filename }) {
    return new Promise((resolve, reject) => {
      try {
        const localDir = path.join(__dirname, '..', 'public/images')
        const localPath = path.join(localDir, filename)
        fs.writeFileSync(localPath, imageData, 'binary')
        resolve(localPath)
      } catch (err) {
        reject(err)
      }
    })
  }
  // 删除本地图片
  static async delLocalImage(localPath) {
    return new Promise((resolve, reject) => {
      fs.unlink(localPath, (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }
}
