import JSONEditor from "JSONEditor";
import "../node_modules/jsoneditor/dist/jsoneditor.css";
export default () => {
  	let container, options, json,
      nowFontSize = 13,
      containerId = "json-format-container";

    function changeEditorFontSize(fontSize, duration) {
      duration = typeof(duration) != "undefined" ? duration : 0;
      $("#json-format #json-format-container .jsoneditor .ace_editor.ace-jsoneditor").velocity({
        "font-size": fontSize
      }, {
        duration: duration,
      });
    }

    function formatMenuInfo() {
      $("button[type=button].jsoneditor-repair").remove();
      $("a.jsoneditor-poweredBy").remove();
    };

  	container = document.getElementById(containerId);

  	options = {
    	mode: 'code',
    	modes: ['code', 'tree'], // allowed modes
    	onError: function (err) {
    	  	var error = err.toString();
      		layer.msg(
      			"出现错误：" + error, {
        		time: 2000, //2s后自动关闭
      		});	    	  	
    	},
      onModeChange: function(newMode, oldMode) {
        formatMenuInfo();
      }
  	};

  	json = {
	   "weatherinfo": {
	     "city": "北京",
	     "city_en": "beijing",
	     "date_y": "2013年9月24日",
	     "index": "较冷",
	     "index_d": "建议着大衣、呢外套加毛衣、卫衣等服装。体弱者宜着厚外套、厚毛衣。因昼夜温差较大，注意增减衣服。",
	     "index48": "较舒适",
	     "index_co": "舒",
	     "st1": "21",
	     "index_ag": "极易发"
	    }
	  };
    var editor = new JSONEditor(container, options, json);	



    (function() {
      // resize调整
      let res;
      $(window).resize(function(){
          if (res){
            clearTimeout(res);
          }
          res = setTimeout(function(){
              let width = $("#"+containerId).width();
              let fontSize = width * 0.02;
              if (fontSize > 20) {
                fontSize = 20;
              } else if (fontSize < 14) {
                fontSize = 14;
              }
              nowFontSize = fontSize;
            },
            500
          );
      });   

      formatMenuInfo();
    })();
};