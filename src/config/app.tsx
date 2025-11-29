/**
 * 运行时配置
 * 更多信息见文档：https://umijs.org/docs/api/runtime-config
 */
export const request = {
  timeout: 10000,
  errorConfig: {
    errorHandler: (error: any) => {
      console.error('Request error:', error);
    },
    errorThrower: (error: any) => {
      throw error;
    },
  },
  requestInterceptors: [],
  responseInterceptors: [],
};

export const layout = () => {
  return {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    menu: {
      locale: false,
    },
    logout: () => {
      // 退出登录逻辑
      console.log('退出登录');
    },
  };
};

