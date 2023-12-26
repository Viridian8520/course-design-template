import { message } from "antd";
import axios from "axios";

// 商品增删查改
export const getGoodsList = (values?: { searchText?: string, categoryId?: number }) => {
  return axios({
    url: 'http://10.21.22.100:8569/good/list',
    method: 'get',
    params: values ? values.searchText ? {
      page: 1,
      size: 999,
      search: values.searchText,
    } : values.categoryId ? {
      page: 1,
      size: 999,
      categoryId: values.categoryId,
    } : {
      page: 1,
      size: 999,
    } : {
      page: 1,
      size: 999,
    },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }).catch(err => {
    message.error("获取商品信息失败！请稍后重试！");
    console.log(err)
  });
}

export const deleteGoods = (id: number) => {
  return axios({
    url: `http://10.21.22.100:8569/good/delete`,
    method: 'post',
    params: {
      id: id,
    },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }).catch(err => {
    message.error("删除商品失败！请稍后重试！");
    console.log(err)
  });
}

export const addGoods = (values: { [propName: string]: any }) => {
  return axios({
    url: 'http://10.21.22.100:8569/good/add',
    method: 'post',
    data: values,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage.getItem('token'),
    },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }).catch(err => {
    message.error("新增商品失败！请稍后重试！");
    console.log(err)
  });
}

export const updateGoods = (values: { [propName: string]: any }, id: number) => {
  return axios({
    url: `http://10.21.22.100:8569/good/update`,
    method: 'post',
    data: {
      id: id,
      ...values,
    },
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
    message.error("修改商品失败！请稍后重试！");
    console.log(err)
  });
};

// 获取商品类别map
export const getCategoryList = () => {
  return axios({
    url: 'http://10.21.22.100:8569/category/list',
    method: 'get',
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }).catch(err => {
    message.error("获取商品类别失败！请稍后重试！");
    console.log(err)
  });
}
