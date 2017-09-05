import core from "../core/Core"
import Explorer from "./explorer/Explorer"
import Query from "./query/Query"
import External from "./external/External"

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-05
 * @modify date 2017-09-05
 * 
 * Env模块是Olympus框架用来集成与运行时环境相关的部分，如浏览器环境、开发环境、运行时参数等
*/
// 注入
core.mapInject(Explorer);
core.mapInject(Query);
core.mapInject(External);
// 导出
export {Explorer, Query, External}