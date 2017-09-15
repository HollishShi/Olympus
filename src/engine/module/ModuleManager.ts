/// <reference path="./Decorator.ts"/>

import {core} from "../../core/Core"
import {wrapConstruct} from "../../utils/ConstructUtil"
import RequestData from "../net/RequestData"
import ResponseData from "../net/ResponseData"
import {netManager} from "../net/NetManager"
import IModule from "./IModule"
import IModuleConstructor from "./IModuleConstructor"

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-14
 * @modify date 2017-09-15
 * 
 * 模块管理器，管理模块相关的所有操作。模块具有唯一性，同一时间不可以打开两个相同模块，如果打开则会退回到先前的模块处
*/
@Injectable
export default class ModuleManager
{
    private _moduleStack:[IModuleConstructor, IModule][] = [];

    private getIndex(cls:IModuleConstructor):number
    {
        for(var i:number = 0, len:number = this._moduleStack.length; i < len; i++)
        {
            if(this._moduleStack[i][0] == cls) return i;
        }
        return -1;
    }

    private getAfter(cls:IModuleConstructor):[IModuleConstructor, IModule][]
    {
        var result:[IModuleConstructor, IModule][] = [];
        for(var i:number = 0, len:number = this._moduleStack.length; i < len; i++)
        {
            var temp:[IModuleConstructor, IModule] = this._moduleStack[i];
            if(temp[0] == cls) return result;
            result.push(temp);
        }
        return [];
    }
    
    private getCurrent():[IModuleConstructor, IModule]|undefined
    {
        return this._moduleStack[0];
    }

    /**
     * 获取模块是否开启中
     * 
     * @param {IModuleConstructor} cls 要判断的模块类型
     * @returns {boolean} 是否开启
     * @memberof ModuleManager
     */
    public isOpened(cls:IModuleConstructor):boolean
    {
        return (this._moduleStack.filter(temp=>temp[0]==cls).length > 0);
    }

    /**
     * 获取当前模块
     * 
     * @returns {IModuleConstructor} 当前模块的类型
     * @memberof ModuleManager
     */
    public getCurModule():IModuleConstructor|undefined
    {
        var curData:[IModuleConstructor, IModule] = this.getCurrent();
        return (curData && curData[0]);
    }

    /**
     * 获取活动模块数量
     * 
     * @returns {number} 活动模块数量
     * @memberof ModuleManager
     */
    public getActiveCount():number
    {
        return this._moduleStack.length;
    }

    /**
     * 打开模块
     * 
     * @param {IModuleConstructor} cls 模块类型
     * @param {*} [data] 参数
     * @param {boolean} [replace=false] 是否替换当前模块
     * @memberof ModuleManager
     */
    public open(cls:IModuleConstructor, data?:any, replace:boolean=false):void
    {
        // 非空判断
        if(!cls) return;
        var after:[IModuleConstructor, IModule][] = this.getAfter(cls);
        if(after.length > 0)
        {
            // 已经打开了，先关闭当前模块到目标模块之间的所有模块
            for(var i :number = 1, len:number = after.length; i < len; i++)
            {
                this.close(after[i][0], data);
            }
            // 最后关闭当前模块，以实现从当前模块直接跳回到目标模块
            this.close(after[0][0], data);
        }
        else
        {
            // 尚未打开过，正常开启模块
            var target:IModule = new cls();
            // 调用onOpen接口
            target.onOpen(data);
            // 发送所有模块消息
            var requests:RequestData[] = target.listInitRequests();
            netManager.sendMultiRequests(requests, function(responses:ResponseData[]):void
            {
                var from:[IModuleConstructor, IModule] = this.getCurrent();
                var fromModule:IModule = from && from[1];
                // 调用onGetResponses接口
                target.onGetResponses(responses);
                // 调用onDeactivate接口
                fromModule && fromModule.onDeactivate(cls, data);
                // 插入模块
                this._moduleStack.unshift([cls, target]);
                // 调用onActivate接口
                target.onActivate(from && from[0], data);
            }, this);
        }
    }

    /**
     * 关闭模块，只有关闭的是当前模块时才会触发onDeactivate和onActivate，否则只会触发onClose
     * 
     * @param {IModuleConstructor} cls 模块类型
     * @param {*} [data] 参数
     * @memberof ModuleManager
     */
    public close(cls:IModuleConstructor, data?:any):void
    {
        // 非空判断
        if(!cls) return;
        // 存在性判断
        var index:number = this.getIndex(cls);
        if(index < 0) return;
        // 取到目标模块
        var target:IModule = this._moduleStack[index][1];
        // 如果是当前模块，则需要调用onDeactivate和onActivate接口，否则不用
        if(index == 0)
        {
            var to:[IModuleConstructor, IModule] = this._moduleStack[1];
            var toModule:IModule = to && to[1];
            // 调用onDeactivate接口
            target.onDeactivate(to && to[0], data);
            // 移除当前模块
            this._moduleStack.shift();
            // 调用onClose接口
            target.onClose(data);
            // 调用onActivate接口
            toModule && toModule.onActivate(cls, data);
        }
        else
        {
            // 移除模块
            this._moduleStack.splice(index, 1);
            // 调用onClose接口
            target.onClose(data);
        }
    }
}
/** 再额外导出一个单例 */
export const moduleManager:ModuleManager = core.getInject(ModuleManager)


/*********************** 下面是装饰器方法实现 ***********************/

/** Module */
window["Module"] = function Module(cls:IConstructor):IConstructor
{
    // 判断一下Module是否有dispose方法，没有的话弹一个警告
    if(!cls.prototype.dispose)
        console.warn("Module[" + cls["name"] + "]不具有dispose方法，可能会造成内存问题，请让该Module实现IDisposable接口");
    return wrapConstruct(cls);
}