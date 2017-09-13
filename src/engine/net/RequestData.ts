import IMessage from "../../core/message/IMessage"
import IRequestPolicy from "./IRequestPolicy"

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-11
 * @modify date 2017-09-11
 * 
 * 通讯发送消息基类
*/

export interface IRequestParams
{
    /**
     * 消息名
     * 
     * @type {string}
     * @memberof IRequestParams
     */
    type:string;
    /**
     * 消息数据
     * 
     * @type {*}
     * @memberof IRequestParams
     */
    data:any;
    /**
     * 协议类型
     * 
     * @type {string}
     * @memberof IRequestParams
     */
    protocol:string;
    /**
     * 其他可能需要的参数
     * 
     * @type {*}
     * @memberof IRequestParams
     */
    [key:string]:any;
}

export default abstract class RequestData implements IMessage
{
    /**
     * 用户参数，可以保存任意参数到Message中，该参数中的数据不会被发送
     * 
     * @type {*}
     * @memberof RequestData
     */
    public __userData:any = {};
    /**
     * 请求参数，可以运行时修改
     * 
     * @type {IRequestParams}
     * @memberof RequestData
     */
    public abstract __params:IRequestParams;
    /**
     * 消息发送接收策略
     * 
     * @type {IRequestPolicy}
     * @memberof RequestData
     */
    public abstract __policy:IRequestPolicy;

    /**
     * 获取请求消息类型字符串
     * 
     * @returns {string} 请求消息类型字符串
     * @memberof RequestData
     */
    public getType():string
    {
        return this.__params.type;
    }
}

/** 导出公共消息参数对象 */
export var commonData:any = {};