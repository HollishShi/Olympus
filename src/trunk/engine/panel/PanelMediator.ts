import Mediator from "../mediator/Mediator";
import IPanel from "./IPanel";
import IPanelPolicy from "./IPanelPolicy";
import { panelManager } from "./PanelManager";

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-06
 * @modify date 2017-09-06
 * 
 * 实现了IPanel接口的弹窗中介者基类
*/
export default abstract class PanelMediator extends Mediator implements IPanel
{
    public constructor(skin?:any, policy?:IPanelPolicy)
    {
        super(skin);
        this.setPolicy(policy);
    }

    private _policy:IPanelPolicy;
    /**
     * 获取弹出策略
     * 
     * @returns {IPanelPolicy} 弹出策略
     * @memberof PanelMediator
     */
    public getPolicy():IPanelPolicy
    {
        return this._policy;
    }
    /**
     * 设置弹出策略
     * 
     * @param {IPanelPolicy} policy 设置弹出策略
     * @memberof PanelMediator
     */
    public setPolicy(policy:IPanelPolicy):void
    {
        this._policy = policy;
    }

    
    /**
     * 弹出当前弹窗（等同于调用PanelManager.open方法）
     * 
     * @param {*} [data] 数据
     * @param {boolean} [isModel] 是否模态弹出（后方UI无法交互）
     * @param {{x:number, y:number}} [from] 弹出点坐标
     * @returns {IPanel} 弹窗本体
     * @memberof PanelMediator
     */
    public pop(data?:any, isModel?:boolean, from?:{x:number, y:number}):IPanel
    {
        return panelManager.open(this, data, isModel, from);
    }

    /**
     * 关闭当前弹窗（等同于调用PanelManager.close方法）
     * 
     * @param {*} [data] 数据
     * @param {{x:number, y:number}} [to] 关闭点坐标
     * @returns {IPanel} 弹窗本体
     * @memberof PanelMediator
     */
    public drop(data?:any, to?:{x:number, y:number}):IPanel
    {
        return panelManager.close(this, data, to);
    }
}