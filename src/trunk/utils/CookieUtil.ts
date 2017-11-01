/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-01
 * @modify date 2017-11-01
 * 
 * Cookie工具
*/
export default class CookieUtil
{
    /**
     * 获取cookie值
     * @param name cookie名称
     * @return cookie值
     */
    public static getCookie(name:string):string
    {
        if (document.cookie.length > 0)
        {
            var start:number = document.cookie.indexOf(name + "=");
            if(start != -1)
            {
                start = start + name.length + 1;
                var end:number = document.cookie.indexOf(";", start);
                if (end == -1) end = document.cookie.length;
                return decodeURIComponent(document.cookie.substring(start, end));
            }
        }
        return "";
    }

    /**
     * 获取cookie值
     * @param name cookie名称
     * @param value cookie值
     * @param expire 有效期时长（毫秒）
     */
    public static setCookie(name:string, value:any, expire?:number)
    {
        var exstr:string = "";
        if(expire != null)
        {
            var exdate:Date = new Date();
            exdate.setMilliseconds(exdate.getMilliseconds() + expire);
            exstr = ";expires=" + exdate.toUTCString();
        }
        document.cookie = name+ "=" + encodeURIComponent(value) + exstr;
    }
}