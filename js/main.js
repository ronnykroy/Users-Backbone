require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-optamd3-min',
    text: 'libs/require/text',
   	jquerytable: 'libs/jquery/jquery.dataTables',
   	jqueryui: 'libs/jquery/jquery-ui-1.8.23.custom.min',
   	namespace: 'libs/backbone/namespace',
  }

});

require(['views/app'], function(AppView){
  var app_view = new AppView;
});
