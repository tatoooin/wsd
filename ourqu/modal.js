/**
 * Created with JetBrains WebStorm.
 * User: TAT-
 * Date: 13-9-3
 * Time: 下午2:18
 * To change this template use File | Settings | File Templates.
 */

//modal模式的基本特征
//1.模块化，可重用。
//2.封装了变量和function,和全局的namespace不接触，松耦合。
//3.之暴露可用public的方法，其他似有方法全隐藏。

//最简单的一个例子。
var Calculator = function(eq){                      ·
    //这里可以声明私有成员
    var eqCtl = document.getElementById(eq);

    return {
        //暴露公开的成员
        add: function(x,y) {
            var val = x + y;
            eqCtl.innerHTML = val;
        }
    };
};
//可以通过下面的方式来调用
var calculator = new Calculator('eq');
calculator.add(2,2);


//匿名闭包，是让一切成为可能的基础，而这也是javascript最好的特性，我们来创建一个最简单的闭包函数，函数内部的
//代码一直存在于闭包内，在整个运行周期内，该闭包都保证了内部的代码处于私有状态。
(function(){
    //...所有的变量和function都在这里声明，并且作用域也只能在这个匿名闭包里。
    //...但是这里的代码依然可以访问外部全局变量。
}());
//注意，匿名函数后面的括号，这是javascript语言所要求的，因为如果你不声明的话，javascript解释器默认是声明一个function函数
//，有括号，就是创建一个函数表达式，也就是自执行，用的时候不用和上面那样再new了，当然你也可以这样声明。

(function(){/*内部代码*/})();
//这里推荐第一种，后话

//引用全局变量
//javascript有个特性叫隐性全局变量，不管一个变量有没有用过，javascript解释器反向遍历作用域来查找整个变量的var声明，
//，如果没有找到var，解释器就假定该变量是全局变量。如果该变量用于了赋值操作后，如果之前不存在的话，解释器则会自动创建它，这
//就是说在匿名闭包里使用或创建全局变量非常容易。不过困难的是代码比较难以管理，尤其是阅读代码的人看着区分哪些变量是全局的，哪些又是局部的
//不过，好在在匿名函数中我们可以提供一个比较简单的替代方案，我们可以将全局变量当成一个参数传入匿名函数然后使用，相比隐式全局变量，
// 它清晰又快，我们来看一个例子。
(function($,YAHOO){
    //这里，我们的代码就可以使用全局的jQuery对象了，YAHOO也是一样

}(jQuery,YAHOO));

//现在很多类库里都有使用这种方式，比如jQuery源码。
//不过，有时候可能不仅仅要使用全局变量，而是也想声明全局变量，如何做呢？我们可以通过匿名函数的返回值来返回这个全局变量，这也就是一个基本
//


