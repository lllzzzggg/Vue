class SelfVue {
    constructor(options) {
        this.data = options.data
        this.methods = options.methods
        this.start(options)
    }

    start (options) {
        let self = this
        this.vm = this
        Object.keys(this.data).forEach(function(key){
            self.proxyKeys(key)
        })
        observe(options.data)
        new Compile(options.el,this)
        options.mounted.call(this)
    }

    proxyKeys (key) {
        let self = this
        Object.defineProperty(this,key,{
            enumerable:false,
            configurable:true,
            get:function proxyGetter() {
                return self.data[key]
            },
            set:function proxySetter(newVal) {
                self.data[key] = newVal
            } 
        })
    }
}

function defineReactive (data, key, val){
    observe(val)            //递归遍历所有的属性
    let dep = new Dep()
    Object.defineProperty(data, key, {
        get:function(){
            if(Dep.target) {   //判断是否需要添加订阅者
                dep.addSub(Dep.target)
            }
            return val
        },
        set:function(newVal){
            if (val === newVal) {
                return
            }
            val = newVal
            dep.notify()
            let str = `属性 ${key}已被监听，现在值为: ${newVal}`
            console.log(str)
        }
    
    })
}

function observe (data){
    if(!data || typeof data !== 'object'){
        return
    }
    Object.keys(data).forEach(function(key){
        defineReactive(data, key, data[key])
    })
}

class Dep {
    constructor(){
        this.subs = []
        this.target = null
    }
    addSub (sub) {
        this.subs.push(sub)
    }
    notify () {
        this.subs.forEach(function(sub){
            sub.update()        //通知每个订阅者检查更新
        })
    }
}

class Watcher {
    constructor(vm,exp,cb){
        this.vm = vm    //指向SelfVue的作用域
        this.exp = exp  //绑定属性的key值
        this.cb = cb    //闭包
        this.value = this.get()
    }
    update () {
        this.run()
    }
    run () {
        let value = this.vm.data[this.exp]
        let oldVal = this.value
        if(value !== oldVal) {
            this.value = value
            this.cb.call(this.vm,value,oldVal)
        }
    }
    get () {
        Dep.target = this                   // 缓存自己
        let value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
        Dep.target = null                   // 释放自己
        return value
    }
}

class Compile {
    constructor(el,vm){
        this.vm = vm
        this.el = document.querySelector(el)
        this.fragment = null
        this.init()
    }
    init () {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el)
            this.compileElement(this.fragment)
            this.el.appendChild(this.fragment)
        } else {
            console.log('Dom元素不存在')
        }
    }
    nodeToFragment (el) {
        let fragment = document.createDocumentFragment()   //createdocumentfragment()方法创建了一虚拟的节点对象，节点对象包含所有属性和方法。
        let child = el.firstChild
        while(child) {
        // 将Dom元素移入fragment中
            fragment.appendChild(child)
            child = el.firstChild
        }
        return fragment
    }
    compileElement (el) {
        let childNodes = el.childNodes
        let self = this;
        [].slice.call(childNodes).forEach(function(node) {
            let reg = /\{\{(.*)\}\}/
            let text = node.textContent

            if (self.isElementNode(node)) {  
                self.compile(node)
            } else if (self.isTextNode(node) && reg.test(text)) {
                self.compileText(node, reg.exec(text)[1])
            }

            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node)
            }
        })
    }
    compile (node) {
        let nodeAttrs = node.attributes   //attributes 属性返回指定节点的属性集合，即 NamedNodeMap。
        let self = this
        //Array.prototype属性表示Array构造函数的原型，并允许为所有Array对象添加新的属性和方法。
        //Array.prototype本身就是一个Array
        Array.prototype.forEach.call(nodeAttrs,function(attr) {
            let attrName = attr.name      //添加事件的方法名和前缀:v-on:click="onClick" ,则attrName = 'v-on:click' id="app" attrname= 'id'
            if(self.isDirective(attrName)) {     
                let exp = attr.value      //添加事件的方法名和前缀:v-on:click="onClick" ,exp = 'onClick'

                //substring() 方法用于提取字符串中介于两个指定下标之间的字符。返回值为一个新的字符串
                //dir = 'on:click'
                let dir = attrName.substring(2)  
                if(self.isEventDirective(dir)) {   //事件指令
                    self.compileEvent(node,self.vm,exp,dir)
                }else {          //v-model指令
                    self.compileModel(node,self.vm,exp,dir)
                }

                node.removeAttribute(attrName)
            }
        })
    }
    compileEvent (node, vm, exp, dir) {
        let eventType = dir.split(':')[1]
        let cb = vm.methods && vm.methods[exp]

        if (eventType && cb) {
            node.addEventListener(eventType, cb.bind(vm), false)
        }
    }
    compileModel (node, vm, exp, dir) {
        let self = this
        let val = this.vm[exp]
        this.modelUpdater(node, val)
        new Watcher(this.vm, exp, function (value) {
            self.modelUpdater(node, value)
        })

        node.addEventListener('input', function(e) {
            let newValue = e.target.value
            if (val === newValue) {
                return
            }
            self.vm[exp] = newValue
            val = newValue
        })
    }
    compileText (node, exp) {
        let self = this
        let initText = this.vm[exp]
        this.updateText(node,initText)    // 将初始化的数据初始化到视图中
        new Watcher(this.vm,exp,function(value) {
            self.updateText(node,value)
        })

    }
    updateText (node,value) {
        node.textContent = typeof value == 'undefined' ? '': value
    }
    modelUpdater (node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value
    }
    isTextNode (node) {
        return node.nodeType == 3
    }
    isElementNode (node) {
        return node.nodeType == 1
    }
    isDirective (attr) {
        return attr.indexOf('v-') == 0
    }
    isEventDirective (dir) {
        return dir.indexOf('on:') === 0
    }
}