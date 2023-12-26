import { Button, Layout, Menu, Avatar, Popover } from 'antd';
import { Suspense, type FC, type ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUserAvatar, selectUsername } from '@/redux/features/user/userSlice';
import { selectIsLogin, setIsLogin } from '@/redux/features/isLogin/isLoginSlice';
import List from '@/components/List';
import Loading from '@/components/Loading';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from '../PageNotFound';

const { Sider, Content } = Layout;

const Home: FC = (): ReactElement => {
  const username = useAppSelector(selectUsername);
  const avatar = useAppSelector(selectUserAvatar);
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(selectIsLogin);

  const exitLogin = () => {
    localStorage.removeItem("token");
    dispatch(setIsLogin(false));
  }

  return (
    <>
      <Layout
        style={{ height: '100%', overflow: 'hidden' }}
      >
        <Sider
          style={{
            overflowY: 'auto',
            backgroundImage: 'linear-gradient(135deg, rgb(189, 189, 255), rgb(162, 255, 255))',
          }}
          theme='dark' trigger={null} width={100}
        >
          {/* <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
            <Image alt="ATVV-IMVA" preview={false} src={atvvWordsSrc} />
          </div> */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', paddingTop: '20px' }} >
            {avatar ?
              <Popover
                style={{ display: 'flex' }}
                placement="right"
                title={<>
                  <div>{username}</div>
                </>}
                content={<>
                  <Button onClick={exitLogin}>退出登录</Button>
                </>}
              >
                <div style={{ cursor: "pointer", display: 'flex', justifyContent: 'center' }}>
                  <Avatar size={52} src={avatar} />
                </div>
              </Popover> :
              <Popover
                placement="right"
                title={<>
                  <div>{username}</div>
                </>}
                content={<>
                  <Button onClick={exitLogin}>退出登录</Button>
                </>}
              >
                <div style={{ cursor: "pointer", display: 'flex', justifyContent: 'center' }}>
                  <Avatar style={{ backgroundColor: '#4e6dd6', verticalAlign: 'middle' }} size={52} >{username}</Avatar>
                </div>
              </Popover>
            }
          </div>
          <Menu mode='inline' style={{ padding: '5px', backgroundColor: 'transparent', fontSize: '16px', color: '#474747' }} />
        </Sider>
        <Layout>
          {/* <Header
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '8%',
              lineHeight: '8%',
              fontSize: '20px',
              borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
              // backgroundColor: '#f4f1fc'
            }}
          >

          </Header> */}
          <Content
            id='atvv-im-content'
            style={{
              padding: '10px',
              overflow: 'auto',
              // backgroundColor: '#f4f1fc',
            }}
          >
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route
                  path="/home"
                  element={
                    <Navigate to='/home/goods' />
                  }
                />
                <Route
                  path="/home/goods"
                  element={
                    isLogin ? <List /> : <PageNotFound msg="请登录后访问该页面" status="403" />
                  }
                />
                <Route
                  path="/home/department"
                  element={
                    isLogin ? <List /> : <PageNotFound msg="请登录后访问该页面" status="403" />
                  }
                />
                <Route
                  path="/home/staff"
                  element={
                    isLogin ? <List /> : <PageNotFound msg="请登录后访问该页面" status="403" />
                  }
                />
                <Route path="/home/*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
            <List />
          </Content>
        </Layout>
      </Layout >
    </>
  )
}

export default Home
