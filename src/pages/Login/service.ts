import axios from 'axios'
import { UserLoginParams, UserRegisterParams } from './type';
import { message } from 'antd';

export const userLogin = (data: UserLoginParams) => {
  return axios({
    method: 'post',
    url: 'http://10.21.22.100:8569/user/login',
    data: data,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }).catch(err => {
    message.error("登录失败！请稍后重试！");
    console.log(err)
  });
};

export const userRegister = (data: UserRegisterParams) => {
  return axios({
    method: 'post',
    url: 'http://10.21.22.100:8569/user/register',
    data: data,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }).catch(err => {
    message.error("注册失败！请稍后重试！");
    console.log(err)
  });
};