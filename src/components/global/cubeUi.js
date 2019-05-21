
/**
 * cube-ui 第三方UI组件库 按需引入组件
 * 需要使用Vue.use方法才能使用
 * 官方说明：https://didi.github.io/cube-ui/#/zh-CN/docs/quick-start
 */

import Vue from 'vue';
import {
    Style,
    Checkbox,
    CheckboxGroup,
    Radio,
    Checker,
    Input,
    Textarea,
    Select,
    Switch,
    Rate,
    Upload,
    Form,
    Button,
    Loading,
    Tip,
    Toolbar,
    Popup,
    Toast,
    Picker,
    CascadePicker,
    DatePicker,
    TimePicker,
    SegmentPicker,
    Dialog,
    ActionSheet,
    Drawer,
    TabBar,
    Scroll,
    Validator,
} from 'cube-ui';

var componentNames = [
    Style,
    Checkbox,
    CheckboxGroup,
    Radio,
    Checker,
    Input,
    Textarea,
    Select,
    Switch,
    Rate,
    Upload,
    Form,
    Button,
    Loading,
    Tip,
    Popup,
    Toast,
    Picker,
    CascadePicker,
    DatePicker,
    TimePicker,
    SegmentPicker,
    Dialog,
    ActionSheet,
    Drawer,
    Toolbar,
    TabBar,
    Scroll,
    Validator,
]

componentNames.forEach(name => {
    Vue.use(name)
})





