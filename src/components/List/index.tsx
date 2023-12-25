import { useEffect, useRef, useState } from 'react';
import { Card, Table, Button, Spin } from 'antd';
import AddCompanyModal from "./AddCompanyModal"
import UpdateCompanyModal from "./UpdateCompanyModal"
import { deleteCompany, deleteDepartment, deleteStaff, getCompanyList, getDepartmentList, getStaffList } from './service';
import { useLocation, useNavigate } from 'react-router-dom';
import AddDepartmentModal from './AddDepartmentModal';
import UpdateDepartmentModal from './UpdateDepartmentModal';
import AddStaffModal from './AddStaffModal';
import UpdateStaffModal from './UpdateStaffModal';
import useCallbackState from '@/hooks/useCallbackState';
// import useForceUpdate from '@/hooks/useForceUpdate';

function List() {
  const [dataSource, setDataSource] = useState([]); // 设置表格内容
  const [isAddCompanyModalVisible, setIsAddCompanyModalVisible] = useState(false); // 控制显示窗口的显示与隐藏
  const [isUpdateCompanyModalVisible, setIsUpdateCompanyModalVisible] = useState(false); // 控制显示窗口的显示与隐藏
  const [isAddDepartmentModalVisible, setIsAddDepartmentModalVisible] = useState(false); // 控制显示窗口的显示与隐藏
  const [isUpdateDepartmentModalVisible, setIsUpdateDepartmentModalVisible] = useState(false); // 控制显示窗口的显示与隐藏
  const [isAddStaffModalVisible, setIsAddStaffModalVisible] = useState(false); // 控制显示窗口的显示与隐藏
  const [isUpdateStaffModalVisible, setIsUpdateStaffModalVisible] = useState(false); // 控制显示窗口的显示与隐藏
  const [detailData, setDetailData] = useState<{ [propName: string]: any }>(); // 要展示的企业信息
  const [loading, setLoading] = useState(false);// 设置加载状态
  const navigate = useNavigate();
  const { pathname } = useLocation(); // 当前路由
  let finalPathname = pathname.split('/')[pathname.split('/').length - 1];
  const [status, setStatus] = useCallbackState(finalPathname);
  const currentStatus = useRef(status);
  // const forceUpdate = useForceUpdate();

  const updateList = () => {
    setLoading(true);
    console.log(currentStatus.current);
    if (currentStatus.current === "company") {
      getCompanyList().then((res) => {
        if (res) {
          setLoading(false);
          setDataSource(res.data.data);
        }
      });
    } else if (currentStatus.current === "department") {
      const companyId = parseInt(pathname.split('/')[pathname.split('/').length - 2])
      getDepartmentList(companyId).then((res) => {
        if (res) {
          setLoading(false);
          setDataSource(res.data.data);
        }
      });
    } else if (currentStatus.current === "staff") {
      const deptId = parseInt(pathname.split('/')[pathname.split('/').length - 2])
      getStaffList(deptId).then((res) => {
        if (res) {
          setLoading(false);
          setDataSource(res.data.data);
        }
      });
    }
  }

  useEffect(() => {
    updateList();
  }, []);

  useEffect(() => {
    finalPathname = pathname.split('/')[pathname.split('/').length - 1];
    currentStatus.current = finalPathname;
    setStatus(finalPathname, () => {
      updateList();
    });
  }, [pathname])

  const companyColumns = [
    {
      title: '序号',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '企业名称',
      key: 'companyName',
      dataIndex: 'companyName',
    },
    {
      title: '企业地址',
      key: 'address',
      dataIndex: 'address',
    },
    {
      title: '企业类型',
      key: 'quality',
      dataIndex: 'quality',
    },
    {
      title: '操作',
      render: (_txt: string, record: { [propName: string]: any }, _index: number) => {
        return <div>
          <Button type='primary' style={{ marginRight: '10px' }} onClick={() => {
            setIsUpdateCompanyModalVisible(true);
            setDetailData(record);
          }}>修改企业</Button>
          <Button type='primary' style={{ marginRight: '10px' }} danger onClick={() => {
            deleteCompany(record.id).then(_res => {
              updateList();
            });
          }}>删除企业</Button>
          <Button type='primary' style={{ marginRight: '10px' }} onClick={() => {
            // setStatus("department");
            navigate(`${pathname}/${record.id}/department`);
          }}>查看部门</Button>
        </div>
      },
    },
  ];

  const departmentColumns = [
    {
      title: '序号',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '部门名称',
      key: 'deptName',
      dataIndex: 'deptName',
    },
    {
      title: '操作',
      render: (_txt: string, record: { [propName: string]: any }, _index: number) => {
        return <div>
          <Button type='primary' style={{ marginRight: '10px' }} onClick={() => {
            setIsUpdateDepartmentModalVisible(true);
            setDetailData(record);
          }}>修改部门</Button>
          <Button type='primary' style={{ marginRight: '10px' }} danger onClick={() => {
            deleteDepartment(record.id).then(_res => {
              updateList();
            });
          }}>删除部门</Button>
          <Button type='primary' style={{ marginRight: '10px' }} onClick={() => {
            // setStatus("staff");
            navigate(`${pathname}/${record.id}/staff`);
          }}>查看人员</Button>
        </div>
      },
    },
  ];

  const staffColumns = [
    {
      title: '序号',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '人员名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '操作',
      render: (_txt: string, record: { [propName: string]: any }, _index: number) => {
        return <div>
          <Button type='primary' style={{ marginRight: '10px' }} onClick={() => {
            setIsUpdateStaffModalVisible(true);
            setDetailData(record);
          }}>修改人员</Button>
          <Button type='primary' style={{ marginRight: '10px' }} danger onClick={() => {
            deleteStaff(record.id).then(_res => {
              updateList();
            });
          }}>删除人员</Button>
        </div>
      },
    },
  ];


  return (
    <Card
      title={currentStatus.current === "company" ?
        "企业信息" :
        currentStatus.current === "department" ?
          "部门信息" : currentStatus.current === "staff" ?
            "人员信息" : "其他信息"}
      extra={
        <>
          <Button type='primary' onClick={() => {
            if (currentStatus.current === "company") {
              setIsAddCompanyModalVisible(true);
            } else if (currentStatus.current === "department") {
              setIsAddDepartmentModalVisible(true);
            } else if (currentStatus.current === "staff") {
              setIsAddStaffModalVisible(true);
            }
          }}>{currentStatus.current === "company" ?
            "新增企业" :
            currentStatus.current === "department" ?
              "新增部门" : currentStatus.current === "staff" ?
                "新增人员" : "新增其他"}</Button>
        </>
      }
    >
      <Spin
        spinning={loading}
      >
        <Table
          rowKey="id"
          columns={currentStatus.current === "company" ?
            companyColumns :
            currentStatus.current === "department" ?
              departmentColumns : currentStatus.current === "staff" ?
                staffColumns : undefined}
          dataSource={dataSource}
          bordered
        />
      </Spin>
      <AddCompanyModal isVisible={isAddCompanyModalVisible} setIsVisible={setIsAddCompanyModalVisible} updateList={updateList}></AddCompanyModal>
      <UpdateCompanyModal isVisible={isUpdateCompanyModalVisible} setIsVisible={setIsUpdateCompanyModalVisible} updateList={updateList} data={detailData}></UpdateCompanyModal>
      <AddDepartmentModal isVisible={isAddDepartmentModalVisible} setIsVisible={setIsAddDepartmentModalVisible} updateList={updateList}></AddDepartmentModal>
      <UpdateDepartmentModal isVisible={isUpdateDepartmentModalVisible} setIsVisible={setIsUpdateDepartmentModalVisible} updateList={updateList} data={detailData}></UpdateDepartmentModal>
      <AddStaffModal isVisible={isAddStaffModalVisible} setIsVisible={setIsAddStaffModalVisible} updateList={updateList}></AddStaffModal>
      <UpdateStaffModal isVisible={isUpdateStaffModalVisible} setIsVisible={setIsUpdateStaffModalVisible} updateList={updateList} data={detailData}></UpdateStaffModal>
    </Card>
  );
}

export default List;
