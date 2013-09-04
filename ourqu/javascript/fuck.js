(function ($) {
		window['fuck'] = {};
		fuck.fuck1 = function (type)
         {
            switch (type)
             {
                 case "success":
                     $.ligerDialog.success('提示内容2','fuck');
                     break;
                 case "error":
                     $.ligerDialog.error('提示信息','错误提示fuck');
                     break;
                 case "waitting":
                     $.ligerDialog.waitting('正在保存中,请稍候...','bit');
                     setTimeout(function ()
                     {
                         $.ligerDialog.closeWaitting();
                     }, 1000);
                     break;
             }
})(jQuery);