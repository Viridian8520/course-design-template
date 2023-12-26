import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { App as AntdApp } from 'antd'
// import 'nprogress/nprogress.css'
import { BrowserRouter } from 'react-router-dom'
import { store } from '@/redux/store.ts'
import { Provider } from 'react-redux'
import { ConfigProvider, ThemeConfig } from 'antd'
import '@/css/index.less'
import { FC } from 'react'
import zhCN from 'antd/locale/zh_CN';

const RootNode: FC = () => {

  // 定制主题
  const globalTheme: ThemeConfig = {
    token: {
      colorPrimary: '#4e6dd6',
    },
    // algorithm: theme.darkAlgorithm,
    // components: {
    //   Button: {
    //     colorPrimary: '#4e6dd6',
    //     algorithm: true,
    //   },
    // },
  }

  return (
    <ConfigProvider locale={zhCN} theme={globalTheme}>
      <AntdApp style={{ height: '100%' }}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </AntdApp>
    </ConfigProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RootNode />
)
