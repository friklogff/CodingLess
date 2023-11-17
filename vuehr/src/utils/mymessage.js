// 导入 Element-UI 中的 Message 组件
import {
    Message
} from 'element-ui';

// 使用 Symbol 创建一个私有方法 showMessage
const showMessage = Symbol('showMessage')

// 定义 JavaboyMessage 类
class JavaboyMessage {
    // 私有方法，用于显示消息
    [showMessage](type, options, single) {
        // 如果设置为 single，且页面上没有显示的 el-message，则显示消息
        if (single) {
            if (document.getElementsByClassName('el-message').length === 0) {
                Message[type](options)
            }
        } else {
            // 否则直接显示消息
            Message[type](options)
        }
    }

    // 显示信息提示消息
    info(options, single = true) {
        this[showMessage]('info', options, single)
    }

    // 显示警告消息
    warning(options, single = true) {
        this[showMessage]('warning', options, single)
    }

    // 显示错误消息
    error(options, single = true) {
        this[showMessage]('error', options, single)
    }

    // 显示成功消息
    success(options, single = true) {
        this[showMessage]('success', options, single)
    }
}

// 创建 JavaboyMessage 实例，并导出
export const mymessage = new JavaboyMessage();
