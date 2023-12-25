import { message } from "antd";
import axios from "axios";

// 企业增删查改
export const getCompanyList = () => {
  return axios({
    url: 'http://47.236.109.159:8080/company/selectAll',
    method: 'get',
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }, err => {
    message.error("获取企业信息失败！请稍后重试！");
    console.log(err);
  }).catch(err => {
    message.error("获取企业信息失败！请稍后重试！");
    console.log(err)
  });
}

export const deleteCompany = (id: number) => {
  return axios({
    url: `http://47.236.109.159:8080/company/delete`,
    method: 'delete',
    params: {
      id: id,
    },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }, err => {
    message.error("删除企业失败！请稍后重试！");
    console.log(err);
  }).catch(err => {
    message.error("删除企业失败！请稍后重试！");
    console.log(err)
  });
}

export const addCompany = (values: { [propName: string]: any }) => {
  return axios({
    url: 'http://47.236.109.159:8080/company/insert',
    method: 'post',
    data: {
      companyName: values.companyName,
      address: values.address,
      quality: values.quality,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }, err => {
    message.error("新增企业失败！请稍后重试！");
    console.log(err);
  }).catch(err => {
    message.error("新增企业失败！请稍后重试！");
    console.log(err)
  });
}

export const updateCompany = (values: { [propName: string]: any }, id: number) => {
  return axios({
    url: `http://47.236.109.159:8080/company/update`,
    method: 'put',
    data: {
      id: id,
      ...values,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }, err => {
    message.error("修改企业失败！请稍后重试！");
    console.log(err);
  }).catch(err => {
    message.error("修改企业失败！请稍后重试！");
    console.log(err)
  });
};

// 部门增删查改
export const getDepartmentList = (id: number) => {
  return axios({
    url: 'http://47.236.109.159:8080/dept/selectByCompanyId',
    method: 'get',
    params: {
      companyId: id,
    },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }, err => {
    message.error("获取部门信息失败！请稍后重试！");
    console.log(err);
  }).catch(err => {
    message.error("获取部门信息失败！请稍后重试！");
    console.log(err)
  });
}

export const deleteDepartment = (id: number) => {
  return axios({
    url: `http://47.236.109.159:8080/dept/delete`,
    method: 'delete',
    params: {
      id: id,
    },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }, err => {
    message.error("删除部门失败！请稍后重试！");
    console.log(err);
  }).catch(err => {
    message.error("删除部门失败！请稍后重试！");
    console.log(err)
  });
}

export const addDepartment = (values: { [propName: string]: any }, companyId: number) => {
  return axios({
    url: 'http://47.236.109.159:8080/dept/insert',
    method: 'post',
    data: {
      companyId: companyId,
      deptName: values.deptName,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }, err => {
    message.error("新增部门失败！请稍后重试！");
    console.log(err);
  }).catch(err => {
    message.error("新增部门失败！请稍后重试！");
    console.log(err)
  });
}

export const updateDepartment = (values: { [propName: string]: any }, id: number) => {
  return axios({
    url: `http://47.236.109.159:8080/dept/update`,
    method: 'put',
    data: {
      id: id,
      ...values,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }, err => {
    message.error("修改部门失败！请稍后重试！");
    console.log(err);
  }).catch(err => {
    message.error("修改部门失败！请稍后重试！");
    console.log(err)
  });
};

// 人员增删查改
export const getStaffList = (id: number) => {
  return axios({
    url: 'http://47.236.109.159:8080/employee/selectByDeptId',
    method: 'get',
    params: {
      deptId: id,
    },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }, err => {
    message.error("获取人员信息失败！请稍后重试！");
    console.log(err);
  }).catch(err => {
    message.error("获取人员信息失败！请稍后重试！");
    console.log(err)
  });
}

export const deleteStaff = (id: number) => {
  return axios({
    url: `http://47.236.109.159:8080/employee/delete`,
    method: 'delete',
    params: {
      id: id,
    },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }, err => {
    message.error("删除人员失败！请稍后重试！");
    console.log(err);
  }).catch(err => {
    message.error("删除人员失败！请稍后重试！");
    console.log(err)
  });
}

export const addStaff = (values: { [propName: string]: any }, companyId: number, deptId: number) => {
  return axios({
    url: 'http://47.236.109.159:8080/employee/insert',
    method: 'post',
    data: {
      deptId: deptId,
      companyId: companyId,
      name: values.name,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }, err => {
    message.error("新增人员失败！请稍后重试！");
    console.log(err);
  }).catch(err => {
    message.error("新增人员失败！请稍后重试！");
    console.log(err)
  });
}

export const updateStaff = (values: { [propName: string]: any }, id: number) => {
  return axios({
    url: `http://47.236.109.159:8080/employee/update`,
    method: 'put',
    data: {
      id: id,
      ...values,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }, err => {
    message.error("修改人员失败！请稍后重试！");
    console.log(err);
  }).catch(err => {
    message.error("修改人员失败！请稍后重试！");
    console.log(err)
  });
};

// 获取企业类别map
export const getQualityList = () => {
  return axios({
    url: 'http://47.236.109.159:8080/company/quality/selectAll',
    method: 'get',
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }, err => {
    message.error("获取企业类别失败！请稍后重试！");
    console.log(err);
  }).catch(err => {
    message.error("获取企业类别失败！请稍后重试！");
    console.log(err)
  });
}
