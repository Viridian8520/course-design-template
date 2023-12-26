import { setIsLogin } from "@/redux/features/isLogin/isLoginSlice";
import { useAppDispatch } from "@/redux/hooks";
import { message } from "antd";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface PendingTask {
  config: AxiosRequestConfig
  resolve: Function
}
let refreshing = false;
const queue: PendingTask[] = [];

// 创建自定义axios实例
const axiosInstance = axios.create({
  // baseURL: 'http://10.21.22.100:85698520/',
  timeout: 3000
});

// 设置响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // const { data } = response || { data: {} };
    return Promise.resolve(response);
  },
  (error: any) => {
    let { data, config } = error.response;

    if (refreshing) {
      return new Promise((resolve) => {
        queue.push({
          config,
          resolve,
        });
      });
    }

    if (data.statusCode === 401 && !config.url.includes('/user/refresh')) {
      refreshing = true;

      refreshToken().then((res: AxiosResponse) => {
        refreshing = false;

        if (res.status === 200) {

          queue.forEach(({ config, resolve }) => {
            resolve(axiosInstance(config))
          })

          // 清空队列
          queue.length = 0

          return axiosInstance(config);
        } else {
          message.error(data || '登录过期，请重新登录');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          dispatchLogin(false);
          return error.response;
        }
      });

    } else {
      return Promise.resolve(error.response);
    }
  }
)

// 设置请求拦截器
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    config.headers.authorization = 'Bearer ' + accessToken;
  }
  return config;
}, (error) => Promise.reject(error))

// 刷新Token的方法
const refreshToken = () => {
  return axiosInstance.get('/user/refresh', {
    params: {
      token: localStorage.getItem('refresh_token')
    }
  }).then((res: AxiosResponse) => {
    localStorage.setItem('access_token', res.data.data.accessToken);
    localStorage.setItem('refresh_token', res.data.data.refreshToken);
    return res;
  });
}

const dispatchLogin = (isLogin: boolean) => {
  const dispatch = useAppDispatch();
  dispatch(setIsLogin(isLogin));
}

export { axiosInstance }