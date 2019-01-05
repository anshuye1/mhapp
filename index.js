/** @format */
import React, { Component } from 'react';
import {AppRegistry, Platform, YellowBox} from 'react-native';
// import App from './App';
import App from './src';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import codePush from "react-native-code-push";
const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const store = configureStore();
const key = Platform.select({
    ios: 'OFtMbneLRlcg-JDXuXvdJKFp9_3wf4eb6812-f373-4d7d-920c-619db1092814',
    android: 'yCSjKKpJxOEFqFWXzJipAKMloAW3f4eb6812-f373-4d7d-920c-619db1092814',
});

class myApp extends Component {

    componentDidMount () {
        codePush.sync({
            installMode: codePush.InstallMode.IMMEDIATE,
            mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,
            //deploymentKey为刚才生成的,打包哪个平台的App就使用哪个Key,这里用IOS的打包测试
            deploymentKey: key,
            // deploymentKey: 'OFtMbneLRlcg-JDXuXvdJKFp9_3wf4eb6812-f373-4d7d-920c-619db1092814',//ios
            //对话框
            updateDialog : {
                //是否显示更新描述
                appendReleaseDescription : true ,
                //更新描述的前缀。 默认为"Description"
                descriptionPrefix : "更新内容：" ,
                //强制更新按钮文字，默认为continue
                mandatoryContinueButtonLabel : "立即更新" ,
                //强制更新时的信息. 默认为"An update is available that must be installed."
                mandatoryUpdateMessage : "必须更新后才能使用" ,
                //非强制更新时，按钮文字,默认为"ignore"
                optionalIgnoreButtonLabel : '稍后' ,
                //非强制更新时，确认按钮文字. 默认为"Install"
                optionalInstallButtonLabel : '后台更新' ,
                //非强制更新时，检查到更新的消息文本
                optionalUpdateMessage : '有新版本了，是否更新？' ,
                //Alert窗口的标题
                title : '更新提示'
            }
        });
    }

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}


AppRegistry.registerComponent(appName, () => myApp);
