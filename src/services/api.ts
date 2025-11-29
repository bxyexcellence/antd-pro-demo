/**
 * API 服务
 * 示例 API 调用
 */
import { get, post } from '../utils/request';

export interface UserInfo {
  id: string;
  name: string;
  avatar?: string;
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return get<UserInfo>('/api/user/info');
};

/**
 * 登录
 */
export const login = (username: string, password: string) => {
  return post<{ token: string }>('/api/login', { username, password });
};

/**
 * 登出
 */
export const logout = () => {
  return post('/api/logout');
};

