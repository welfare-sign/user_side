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


export function checkin_record() {
    /**
     * @description 获取签到记录
     * @return (promise)
     */
    return http({
        url: 'v1/customers/checkin_record',
        method: 'get'
    })
}

export function checkin (data) {
    /**
     * @description 用户执行签到
     * @return (promise)
     * @data (object):
     *  @day (number): 签到第几天
     */
    return http({
        url: 'v1/customers/checkin_record',
        method: 'post',
        data
    })
}

export function aid_checkin (data) {
    /**
     * @descrtiption 为他人补签
     * @return (promise)
     * @data (object):
     *  @customer_id (string): 用户id
     *  @day (number): 第几天
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