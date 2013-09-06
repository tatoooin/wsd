(function ($) {

    //全局系统对象
    window['xjn'] = {};
    //右下角的提示框
    xjn.tip = function (message) {
        if (xjn.wintip) {
            xjn.wintip.set('content', message);
            xjn.wintip.show();
        }
        else {
            xjn.wintip = $.ligerDialog.tip({ content: message });
        }
        setTimeout(function () {
            xjn.wintip.hide()
        }, 2000);
    };

    //预加载图片
    //xjn.prevLoadImage = function (paths) {
    //    for (var i in paths) {
    //        $('<img />').attr('src', paths[i]);
    //    }
    //};

    //预加载dialog的图片
    //xjn.prevDialogImage = function () {
    //    xjn.prevLoadImage("~/Scripts/LigerUI/ligerUI/skins/Aqua/images/win/", ['dialog-icons.gif']);
    //    xjn.prevLoadImage('~/Scripts/LigerUI/ligerUI/skins/Gray/images/win/', ['dialogicon.gif']);
    //};
    //显示loading
    xjn.showLoading = function (message) {
        message = message || "正在加载中...";
        $.ligerDialog.waitting(message);
        $.ligerui.win.mask();

    };
    //隐藏loading
    xjn.hideLoading = function (message) {
        $.ligerui.win.unmask({ id: new Date().getTime() });
        $.ligerDialog.closeWaitting();
    }
    //显示成功提示窗口
    xjn.showSuccess = function (message, callback) {
        if (typeof (message) == "fuwnction" || arguments.length == 0) {
            callback = message;
            message = "操作成功!";
        }
        $.ligerDialog.success(message, '提示信息', callback);
    };
    //显示失败提示窗口
    xjn.showError = function (message, callback) {
        if (typeof (message) == "function" || arguments.length == 0) {
            callback = message;
            message = "操作失败!";
        }
        $.ligerDialog.error(message, '提示信息', callback);
    };

    //Ajax表单提交返回Json数据
    //Post方式提交
    //默认不缓存
    xjn.AjaxForm = function (options) {
        var p = options || {};
        //获取表单名这里使用ID选择器
        var form = "#" + p.formname;
        $(form).ajaxSubmit({
            type: 'post',
            url: p.url,
            loading: p.loading,
            dataType: 'json',
            data: p.data,
            beforeSend: function (a, b, c) {
                xjn.loading = true;
                if (p.beforeSend)
                    p.beforeSend();
                else
                    xjn.showLoading(p.loading);
            },
            complete: function () {
                xjn.loading = false;
                if (p.complete)
                    p.complete();
                else
                    xjn.hideLoading();
            },
            success: function (result) {
                if (!result) return;
                if (!result.IsError) {
                    if (p.success)
                        p.success(result.Data, result.Message, result.IsError);
                }
                else {
                    if (p.error)
                        p.error(result.Message);
                }
            },
            error: function (result, b) {
                xjn.tip('发现系统错误<BR>错误码:' + result.status);
            },
            //clearForm: true || p.clearFormFlag
        });
    };

    //提交服务器请求
    //返回json格式
    //1,提交给类 options.type  方法 options.method 处理
    //2,并返回 AjaxResult(这也是一个类)类型的的序列化好的字符串
    xjn.ajax = function (options) {
        var p = options || {};
        //  var ashxUrl = options.ashxUrl || "/Admin/User/";
        //   var url = p.url || ashxUrl + $.param({ method: p.method });

        $.ajax({
            cache: false,
            async: true,
            url: p.url,
            data: p.data,
            dataType: 'json',
            type: 'post',
            beforeSend: function () {
                xjn.loading = true;
                if (p.beforeSend)
                    p.beforeSend();
                else
                    xjn.showLoading(p.loading);
            },
            complete: function () {
                xjn.loading = false;
                if (p.complete)
                    p.complete();
                else
                    xjn.hideLoading();
            },
            success: function (result) {
                if (!result) return;
                if (!result.IsError) {
                    if (p.success)
                        p.success(result.Data, result.Message, result.IsError);
                }
                else {
                    if (p.error)
                        p.error(result.Message);
                }
            },
            error: function (result, b) {
                xjn.tip('发现系统错误 <BR>错误码：' + result.status);
            }
        });
    };



    //提示 验证错误信息
    xjn.showInvalid = function (validator) {
        validator = validator || xjn.validator;
        if (!validator) return;
        var message = '<div class="invalid">存在' + validator.errorList.length + '个字段验证不通过，请检查!</div>';
        //top.xjn.tip(message);
        $.ligerDialog.error(message);
    };

    //表单验证
    xjn.validate = function (form, options) {
        if (typeof (form) == "string")
            form = $(form);
        else if (typeof (form) == "object" && form.NodeType == 1)
            form = $(form);
        options = $.extend({
            errorPlacement: function (lable, element) {
                if (!element.attr("id"))
                    element.attr("id", new Date().getTime());
                if (element.hasClass("l-textarea")) {
                    element.addClass("l-textarea-invalid");
                }
                else if (element.hasClass("l-text-field")) {
                    element.parent().addClass("l-text-invalid");
                }
                $(element).removeAttr("title").ligerHideTip();
                $(element).attr("title", lable.html()).ligerTip({
                    distanceX: 5,
                    distanceY: -3,
                    auto: true
                });
            },
            success: function (lable) {
                if (!lable.attr("for")) return;
                var element = $("#" + lable.attr("for"));

                if (element.hasClass("l-textarea")) {
                    element.removeClass("l-textarea-invalid");
                }
                else if (element.hasClass("l-text-field")) {
                    element.parent().removeClass("l-text-invalid");
                }
                $(element).removeAttr("title").ligerHideTip();
            }
        }, options || {});
        xjn.validator = form.validate(options);
        return xjn.validator;
    };

    //覆盖页面grid的loading效果
    xjn.overrideGridLoading = function () {
        $.extend($.ligerDefaults.Grid, {
            onloading: function () {
                xjn.showLoading('正在加载表格数据中...');
            },
            onloaded: function () {
                xjn.hideLoading();
            }
        });
    };
    //关闭当前Tab面板
    xjn.closeCurrentTab = function (tabid) {
        if (top.tab)
            top.tab.removeTabItem(tabid);
    }
    //关闭当前窗口刷新父窗口
    xjn.closeAndReloadParentWindow = function (tabid, Parent) {
        var ParentID = top.tab.isTabItemExist(tabid);
        //判断Tab是否存在
        if (ParentID) {
            top.tab.reload(Parent);
            xjn.closeCurrentTab(tabid);
        }
    }

})(jQuery);
