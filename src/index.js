require('./index.css');
require('./abc');
require('bootstrap');
import moment from 'moment';
import 'moment/locale/zh-cn';

// moment.locale('zh-cn');
let r = moment().endOf('day').fromNow();
console.log(r)