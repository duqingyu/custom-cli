import TokenHelper from '@/utils/tokenHelper'

/**
 * 根据用户信息返回token
 * @param userInfo 用户信息
 * @returns {token}
 */
export async function getToken(userInfo) {
  const token = await TokenHelper.create({
    id: userInfo.id,
    username: userInfo.username
  })
  return token
}
