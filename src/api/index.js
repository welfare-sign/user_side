/**
 * @description 客户端相关接口
 * @author 顾超<beyondc@foxmail.com>
 * @swagger http://47.100.29.191:18080/swagger/index.html
 */

import http from '@/plugins/axios'

export function wx_config(params) {
    /**
     * @description 获取微信接口配置
     * @retrun (promise)
     * 
     * @params (object):
     *  @url (string): 当前页URL，不包含#及其后面部分
     */
    return http({
        url: 'v1/wx/config',
        method: 'get',
        params
    })
}

export function login (params) {
    /**
     * @description 客户登录
     * @return (promise)
     * 
     * @params (object):
     *  @code (string): 微信回调code
     */

    return http({
        url: 'v1/customers/login',
        method: 'post',
        params
    })
}


export function checkin_record(params) {
    /**
     * @description 获取签到记录
     * @return (promise)
     * @params (object):
     *  @customer_id (string): 当该参数有值时以该参数为准，否则以token用户为准
     */
    return http({
        url: 'v1/customers/checkin_record',
        method: 'get',
        params
    })
}

export function checkin () {
    /**
     * @description 用户执行签到
     * @return (promise)
     */
    return http({
        url: 'v1/customers/checkin_record',
        method: 'post'
    })
}

export function aid_checkin (data) {
    /**
     * @descrtiption 为他人补签
     * @return (promise)
     * @data (object):
     *  @customer_id (string): 用户id
     */
    return http({
        url: 'v1/customers/checkin_record/help',
        method: 'post',
        data
    })
}

export function re_checkin () {
    /**
     * @description 用户重新签到
     * @return (promise)
     */
    return http({
        url: 'v1/customers/checkin_record/refresh',
        method: 'post'
    })
}

export function user_detail(params) {
    /**
     * @description 获取客户详情
     * @return (promise)
     * 
     * @params (object): 
     *  @customer_id (stirng): 客户ID,客户访问时可不传
     */
    return http({
        url: 'v1/customers/detail',
        method: 'get',
        params
    })
}

export function issue_list() {
    /**
     * @description 客户端查看我的福利
     * @return (promise)
     */
    return http({
        url: 'v1/customers/issue_records',
        method: 'get'
    })
}

export function get_issue(data) {
    /**
     * @description 用户领取福利
     * @return (promise)
     * @data (object):
     *  @merchant_id (string): 商户id
     */
    return http({
        url: 'v1/customers/issue_records',
        method: 'post',
        data
    })
}

export function near_merchant(params) {
    /**
     * @description 获取用户附近最近的几家店铺
     * @return (promise)
     * 
     * @params (object):
     *  @lon (number): 经度
     *  @lat (number): 纬度
     *  @distince (number): 距离多少公里内，默认10
     *  @num (number): 返回数量，默认4个
     */
    return http({
        url: 'v1/customers/near_merchant',
        method: 'get',
        params
    })
}

export function get_qrcode () {
    /**
     * @description 获取客户所属二维码
     * @return (promise)
     */
    return http({
        url: 'v1/customers/qrcode',
        method: 'get'
    })
}

export function wx_pay () {
    /**
     * @dscription 用户支付
     * @return (promise)
     */
    return http({
        url: 'v1/wx/pay',
        method: 'post'
    })
}
export function is_supplement () {
    /**
     * @description 是否是补签
     * @return (promise)
     */
    return http({
        url: 'v1/customers/issue_records/is_supplement',
        method: 'get'
    })
}

export function query_merchants(params) {
    /**
     * @description 获取商户列表
     * @return (promise)
     * 
     * @params (object):
     *  @store_name (string): 商户名
     *  @contact_name (string): 联系人
     *  @contact_phone (string): 联系电话
     *  @status (string): 商户状态
     *  @page_no (number): 页码
     *  @page_size (number): 本页条数
     */
    return http({
        url: 'v1/merchants',
        method: 'get',
        params
    })
}

export function get_ad_poster() {
    /**
     * @description 随机获取商户一张海报
     * @return (promise)
     */
    return http({
        url: 'v1/merchants/poster',
        method: 'get'
    })
}

export function verify_code(params) {
    /**
     * @description 发送验证码
     * @return (promise)
     * 
     * @params (object):
     *  @mobile (string): 手机号
     */
    return http({
        url: 'v1/verify_code',
        method: 'get',
        params
    })
}