import VueRouter from 'vue-router'
//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Storeup from '../pages/storeup/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import payList from '../pages/pay'

import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import yinlexinxiList from '../pages/yinlexinxi/list'
import yinlexinxiDetail from '../pages/yinlexinxi/detail'
import yinlexinxiAdd from '../pages/yinlexinxi/add'
import yinleleixingList from '../pages/yinleleixing/list'
import yinleleixingDetail from '../pages/yinleleixing/detail'
import yinleleixingAdd from '../pages/yinleleixing/add'
import gedanxinxiList from '../pages/gedanxinxi/list'
import gedanxinxiDetail from '../pages/gedanxinxi/detail'
import gedanxinxiAdd from '../pages/gedanxinxi/add'
import newstypeList from '../pages/newstype/list'
import newstypeDetail from '../pages/newstype/detail'
import newstypeAdd from '../pages/newstype/add'
import emailregistercodeList from '../pages/emailregistercode/list'
import emailregistercodeDetail from '../pages/emailregistercode/detail'
import emailregistercodeAdd from '../pages/emailregistercode/add'
import discussyinlexinxiList from '../pages/discussyinlexinxi/list'
import discussyinlexinxiDetail from '../pages/discussyinlexinxi/detail'
import discussyinlexinxiAdd from '../pages/discussyinlexinxi/add'
import discussgedanxinxiList from '../pages/discussgedanxinxi/list'
import discussgedanxinxiDetail from '../pages/discussgedanxinxi/detail'
import discussgedanxinxiAdd from '../pages/discussgedanxinxi/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'pay',
					component: payList,
				},
				{
					path: 'storeup',
					component: Storeup
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'yinlexinxi',
					component: yinlexinxiList
				},
				{
					path: 'yinlexinxiDetail',
					component: yinlexinxiDetail
				},
				{
					path: 'yinlexinxiAdd',
					component: yinlexinxiAdd
				},
				{
					path: 'yinleleixing',
					component: yinleleixingList
				},
				{
					path: 'yinleleixingDetail',
					component: yinleleixingDetail
				},
				{
					path: 'yinleleixingAdd',
					component: yinleleixingAdd
				},
				{
					path: 'gedanxinxi',
					component: gedanxinxiList
				},
				{
					path: 'gedanxinxiDetail',
					component: gedanxinxiDetail
				},
				{
					path: 'gedanxinxiAdd',
					component: gedanxinxiAdd
				},
				{
					path: 'newstype',
					component: newstypeList
				},
				{
					path: 'newstypeDetail',
					component: newstypeDetail
				},
				{
					path: 'newstypeAdd',
					component: newstypeAdd
				},
				{
					path: 'emailregistercode',
					component: emailregistercodeList
				},
				{
					path: 'emailregistercodeDetail',
					component: emailregistercodeDetail
				},
				{
					path: 'emailregistercodeAdd',
					component: emailregistercodeAdd
				},
				{
					path: 'discussyinlexinxi',
					component: discussyinlexinxiList
				},
				{
					path: 'discussyinlexinxiDetail',
					component: discussyinlexinxiDetail
				},
				{
					path: 'discussyinlexinxiAdd',
					component: discussyinlexinxiAdd
				},
				{
					path: 'discussgedanxinxi',
					component: discussgedanxinxiList
				},
				{
					path: 'discussgedanxinxiDetail',
					component: discussgedanxinxiDetail
				},
				{
					path: 'discussgedanxinxiAdd',
					component: discussgedanxinxiAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
