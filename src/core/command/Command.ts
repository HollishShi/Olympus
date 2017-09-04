import context, {Context} from "../context/Context"
import IMessage from "../message/IMessage"

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-01
 * @modify date 2017-09-01
 * 
 * 内核命令类，内核命令在注册了消息后可以在消息派发时被执行
*/
export default class Command
{
    /**
     * 触发该Command运行的Message实例
     * 
     * @type {IMessage}
     * @memberof Command
     */
    public msg:IMessage;

    /**
     * 内核上下文实例
     * 
     * @type {Context}
     * @memberof Command
     */
    public context:Context;

    public constructor(msg:IMessage)
    {
        this.msg = msg;
        this.context = context;
    }

    public exec():void
    {
        // 留待子类完善
    }
}