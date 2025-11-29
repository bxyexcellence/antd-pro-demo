/**
 * 请求工具
 * 基于 fetch 封装
 */

export interface RequestOptions extends RequestInit {
  params?: Record<string, any>;
  timeout?: number;
}

/**
 * 请求超时处理
 */
const fetchWithTimeout = (url: string, options: RequestOptions = {}, timeout = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    ),
  ]);
};

/**
 * 请求方法
 */
export const request = async <T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { params, timeout = 10000, ...fetchOptions } = options;

  // 处理查询参数
  let requestUrl = url;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        searchParams.append(key, String(params[key]));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      requestUrl += (url.includes('?') ? '&' : '?') + queryString;
    }
  }

  // 设置默认 headers
  const headers = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  try {
    const response = await fetchWithTimeout(
      requestUrl,
      {
        ...fetchOptions,
        headers,
      },
      timeout
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};

/**
 * GET 请求
 */
export const get = <T = any>(url: string, params?: Record<string, any>, options?: RequestOptions) => {
  return request<T>(url, {
    method: 'GET',
    params,
    ...options,
  });
};

/**
 * POST 请求
 */
export const post = <T = any>(url: string, data?: any, options?: RequestOptions) => {
  return request<T>(url, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * PUT 请求
 */
export const put = <T = any>(url: string, data?: any, options?: RequestOptions) => {
  return request<T>(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * DELETE 请求
 */
export const del = <T = any>(url: string, options?: RequestOptions) => {
  return request<T>(url, {
    method: 'DELETE',
    ...options,
  });
};

