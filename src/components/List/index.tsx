import { useEffect, useRef, useState } from 'react';
import { Card, Table, Button, Spin, Image, Input, Select } from 'antd';
import AddGoodsModal from "./AddGoodsModal"
import UpdateGoodsModal from "./UpdateGoodsModal"
import { deleteGoods, getCategoryList, getGoodsList } from './service';
import { useLocation } from 'react-router-dom';
import useCallbackState from '@/hooks/useCallbackState';
// import useForceUpdate from '@/hooks/useForceUpdate';

function List() {
  const [dataSource, setDataSource] = useState([]); // 设置表格内容
  const [isAddGoodsModalVisible, setIsAddGoodsModalVisible] = useState(false); // 控制显示窗口的显示与隐藏
  const [isUpdateGoodsModalVisible, setIsUpdateGoodsModalVisible] = useState(false); // 控制显示窗口的显示与隐藏
  const [detailData, setDetailData] = useState<{ [propName: string]: any }>(); // 要展示的商品信息
  const [loading, setLoading] = useState(false);// 设置加载状态
  const { pathname } = useLocation(); // 当前路由
  let finalPathname = pathname.split('/')[pathname.split('/').length - 1];
  const [status, setStatus] = useCallbackState(finalPathname);
  const currentStatus = useRef(status);
  const [qualityOptions, setQualityOptions] = useState<Array<any>>();
  // const forceUpdate = useForceUpdate();

  const updateList = () => {
    setLoading(true);
    if (currentStatus.current === "goods") {
      getGoodsList().then((res) => {
        if (res) {
          setLoading(false);
          setDataSource(res.data.data.data);
        }
      });
    }
  }

  const onSearch = (value: string) => {
    if (value) {
      setLoading(true);
      if (currentStatus.current === "goods") {
        getGoodsList({
          searchText: value,
        }).then((res) => {
          if (res) {
            setLoading(false);
            setDataSource(res.data.data.data);
          }
        });
      }
    } else {
      updateList();
    }
  }

  const onClear = () => {
    updateList();
  }

  const onSelect = (value: number) => {
    if (value) {
      setLoading(true);
      if (currentStatus.current === "goods") {
        getGoodsList({
          categoryId: value,
        }).then((res) => {
          if (res) {
            setLoading(false);
            setDataSource(res.data.data.data);
          }
        });
      }
    } else {
      updateList();
    }
  }

  const getQualityOptions = (data: Array<any>) => {
    const options: { label: any; value: any; }[] = [];
    data.forEach(item => {
      options.push({
        label: item.name,
        value: item.id,
      });
    })
    return options;
  }

  useEffect(() => {
    updateList();
    getCategoryList().then(res => {
      if (res) {
        setQualityOptions(getQualityOptions(res.data.data));
      }
    })
  }, []);

  useEffect(() => {
    finalPathname = pathname.split('/')[pathname.split('/').length - 1];
    currentStatus.current = finalPathname;
    setStatus(finalPathname, () => {
      updateList();
    });
  }, [pathname])

  const goodsColumns = [
    {
      title: '序号',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '商家序号',
      key: 'userId',
      dataIndex: 'userId',
    },
    {
      title: '商品名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '商品描述',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: '商品类型',
      key: 'categoryName',
      dataIndex: 'categoryName',
    },
    {
      title: '商品图片',
      key: 'picture',
      dataIndex: 'picture',
      render: (txt: string, record: { [propName: string]: any }, _index: number) => {
        return <Image style={{ maxHeight: '150px', maxWidth: '150px' }} alt={record.name} src={txt} />
      },
    },
    {
      title: '销量',
      key: 'buyCount',
      dataIndex: 'buyCount',
    },
    {
      title: '操作',
      render: (_txt: string, record: { [propName: string]: any }, _index: number) => {
        return <div>
          <Button type='primary' style={{ margin: '5px' }} onClick={() => {
            setIsUpdateGoodsModalVisible(true);
            setDetailData(record);
          }}>修改</Button>
          <Button type='primary' style={{ margin: '5px' }} danger onClick={() => {
            deleteGoods(record.id).then(_res => {
              updateList();
            });
          }}>删除</Button>
        </div>
      },
    },
  ];

  return (
    <Card
      title={currentStatus.current === "goods" ? "商品信息" : "其他信息"}
      extra={
        <>
          <div style={{ display: 'flex' }}>
            <Select
              style={{ width: 100, marginRight: '10px' }}
              placeholder="选择类型"
              allowClear
              options={qualityOptions}
              onSelect={onSelect}
              onClear={onClear}
            />
            <Input.Search
              allowClear
              placeholder='查询商品名称'
              onSearch={onSearch}
              enterButton
              style={{ width: 200, marginRight: '10px' }}
            />
            <Button type='primary' onClick={() => {
              if (currentStatus.current === "goods") {
                setIsAddGoodsModalVisible(true);
              }
            }}>{currentStatus.current === "goods" ?
              "新增商品" : "新增其他"}</Button>
          </div>

        </>
      }
    >
      <Spin
        spinning={loading}
      >
        <Table
          rowKey="id"
          columns={currentStatus.current === "goods" ?
            goodsColumns : undefined}
          dataSource={dataSource}
          bordered
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 5,
            pageSizeOptions: [5, 10, 20, 50, 100],
          }}
        />
      </Spin>
      <AddGoodsModal isVisible={isAddGoodsModalVisible} setIsVisible={setIsAddGoodsModalVisible} updateList={updateList}></AddGoodsModal>
      <UpdateGoodsModal isVisible={isUpdateGoodsModalVisible} setIsVisible={setIsUpdateGoodsModalVisible} updateList={updateList} data={detailData}></UpdateGoodsModal>
    </Card>
  );
}

export default List;
