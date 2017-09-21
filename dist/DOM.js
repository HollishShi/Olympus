/// <reference path="../../dist/Olympus.d.ts"/>
define("DOMBridge", ["require", "exports", "utils/ObjectUtil"], function (require, exports, ObjectUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @author Raykid
     * @email initial_r@qq.com
     * @create date 2017-09-18
     * @modify date 2017-09-18
     *
     * 基于DOM的表现层桥实现
    */
    var DOMBridge = /** @class */ (function () {
        function DOMBridge(root) {
            this._listenerDict = {};
            this._root = root;
        }
        Object.defineProperty(DOMBridge.prototype, "type", {
            /**
             * 获取表现层类型名称
             *
             * @readonly
             * @type {string}
             * @memberof DOMBridge
             */
            get: function () {
                return "DOM";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DOMBridge.prototype, "htmlWrapper", {
            /**
             * 获取表现层HTML包装器，可以对其样式进行自定义调整
             *
             * @readonly
             * @type {HTMLElement}
             * @memberof DOMBridge
             */
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DOMBridge.prototype, "root", {
            /**
             * 获取根显示节点
             *
             * @readonly
             * @type {HTMLElement}
             * @memberof DOMBridge
             */
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DOMBridge.prototype, "bgLayer", {
            /**
             * 获取背景容器
             *
             * @readonly
             * @type {HTMLElement}
             * @memberof DOMBridge
             */
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DOMBridge.prototype, "sceneLayer", {
            /**
             * 获取场景容器
             *
             * @readonly
             * @type {HTMLElement}
             * @memberof DOMBridge
             */
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DOMBridge.prototype, "panelLayer", {
            /**
             * 获取弹窗容器
             *
             * @readonly
             * @type {HTMLElement}
             * @memberof DOMBridge
             */
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DOMBridge.prototype, "topLayer", {
            /**
             * 获取顶级容器
             *
             * @readonly
             * @type {HTMLElement}
             * @memberof DOMBridge
             */
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化表现层桥，可以没有该方法，没有该方法则表示该表现层无需初始化
         * @param {()=>void} complete 初始化完毕后的回调
         * @memberof DOMBridge
         */
        DOMBridge.prototype.init = function (complete) {
            // 如果是名称，则转变成引用
            if (typeof this._root == "string") {
                this._root = document.getElementById(this._root);
            }
            // 如果是空，则生成一个
            if (!this._root) {
                this._root = document.createElement("div");
                document.body.appendChild(this._root);
            }
            // 调用回调
            complete(this);
        };
        /**
         * 判断皮肤是否是DOM显示节点
         *
         * @param {*} skin 皮肤对象
         * @returns {boolean} 是否是DOM显示节点
         * @memberof DOMBridge
         */
        DOMBridge.prototype.isMySkin = function (skin) {
            return (skin instanceof HTMLElement);
        };
        /**
         * 添加显示
         *
         * @param {Element} parent 要添加到的父容器
         * @param {Element} target 被添加的显示对象
         * @return {Element} 返回被添加的显示对象
         * @memberof DOMBridge
         */
        DOMBridge.prototype.addChild = function (parent, target) {
            return parent.appendChild(target);
        };
        /**
         * 按索引添加显示
         *
         * @param {Element} parent 要添加到的父容器
         * @param {Element} target 被添加的显示对象
         * @param {number} index 要添加到的父级索引
         * @return {Element} 返回被添加的显示对象
         * @memberof DOMBridge
         */
        DOMBridge.prototype.addChildAt = function (parent, target, index) {
            return parent.insertBefore(target, this.getChildAt(parent, index));
        };
        /**
         * 移除显示对象
         *
         * @param {Element} parent 父容器
         * @param {Element} target 被移除的显示对象
         * @return {Element} 返回被移除的显示对象
         * @memberof DOMBridge
         */
        DOMBridge.prototype.removeChild = function (parent, target) {
            return parent.removeChild(target);
        };
        /**
         * 按索引移除显示
         *
         * @param {Element} parent 父容器
         * @param {number} index 索引
         * @return {Element} 返回被移除的显示对象
         * @memberof DOMBridge
         */
        DOMBridge.prototype.removeChildAt = function (parent, index) {
            return parent.removeChild(this.getChildAt(parent, index));
        };
        /**
         * 移除所有显示对象
         *
         * @param {Element} parent 父容器
         * @memberof DOMBridge
         */
        DOMBridge.prototype.removeChildren = function (parent) {
            for (var i = 0, len = parent.children.length; i < len; i++) {
                parent.removeChild(parent.children.item(i));
            }
        };
        /**
         * 获取父容器
         *
         * @param {Element} target 目标对象
         * @returns {Element} 父容器
         * @memberof DOMBridge
         */
        DOMBridge.prototype.getParent = function (target) {
            return target.parentElement;
        };
        /**
         * 获取指定索引处的显示对象
         *
         * @param {Element} parent 父容器
         * @param {number} index 指定父级索引
         * @return {Element} 索引处的显示对象
         * @memberof DOMBridge
         */
        DOMBridge.prototype.getChildAt = function (parent, index) {
            return parent.children.item(index);
        };
        /**
         * 获取显示索引
         *
         * @param {Element} parent 父容器
         * @param {Element} target 子显示对象
         * @return {number} target在parent中的索引
         * @memberof DOMBridge
         */
        DOMBridge.prototype.getChildIndex = function (parent, target) {
            for (var i = 0, len = parent.children.length; i < len; i++) {
                if (target === parent.children.item(i))
                    return i;
            }
            return -1;
        };
        /**
         * 通过名称获取显示对象
         *
         * @param {Element} parent 父容器
         * @param {string} name 对象名称
         * @return {Element} 显示对象
         * @memberof DOMBridge
         */
        DOMBridge.prototype.getChildByName = function (parent, name) {
            return parent.children.namedItem(name);
        };
        /**
         * 获取子显示对象数量
         *
         * @param {Element} parent 父容器
         * @return {number} 子显示对象数量
         * @memberof DOMBridge
         */
        DOMBridge.prototype.getChildCount = function (parent) {
            return parent.childElementCount;
        };
        /**
         * 加载资源
         *
         * @param {string[]} assets 资源列表
         * @param {(err?:Error)=>void} handler 回调函数
         * @memberof DOMBridge
         */
        DOMBridge.prototype.loadAssets = function (assets, handler) {
            // DOM暂时不支持加载资源
            handler();
        };
        /**
         * 监听事件，从这个方法监听的事件会在中介者销毁时被自动移除监听
         *
         * @param {EventTarget} target 事件目标对象
         * @param {string} type 事件类型
         * @param {(evt:Event)=>void} handler 事件处理函数
         * @param {*} [thisArg] this指向对象
         * @memberof DOMBridge
         */
        DOMBridge.prototype.mapListener = function (target, type, handler, thisArg) {
            var key = ObjectUtil_1.getObjectHashs(target, type, handler, thisArg);
            // 判断是否已经存在该监听，如果存在则不再监听
            if (this._listenerDict[key])
                return;
            // 监听
            var listener = function (evt) {
                // 调用回调
                handler.call(thisArg || this, evt);
            };
            target.addEventListener(type, listener);
            // 记录监听
            this._listenerDict[key] = listener;
        };
        /**
         * 注销监听事件
         *
         * @param {EventTarget} target 事件目标对象
         * @param {string} type 事件类型
         * @param {(evt:Event)=>void} handler 事件处理函数
         * @param {*} [thisArg] this指向对象
         * @memberof DOMBridge
         */
        DOMBridge.prototype.unmapListener = function (target, type, handler, thisArg) {
            var key = ObjectUtil_1.getObjectHashs(target, type, handler, thisArg);
            // 判断是否已经存在该监听，如果存在则移除监听
            var listener = this._listenerDict[key];
            if (listener) {
                target.removeEventListener(type, listener);
                // 移除记录
                delete this._listenerDict[key];
            }
        };
        return DOMBridge;
    }());
    exports.default = DOMBridge;
});
//# sourceMappingURL=DOM.js.map