$(document).ready(function() {

    $('.animation-video').click(function(){
        var webmSrc = $(this).children().first().attr('src');
        var vidName = webmSrc.substr(0, webmSrc.lastIndexOf(".") + 1); // get just the filename
        var pathName = vidName.replace('lowq', 'hiq')

        $('#hiq-overlay').find('source').each(function() {
            var thisSrc = $(this).attr('type');
            var extension = thisSrc.split('/')[1]; // get just the filename
            var newFileName = pathName + extension;
            $(this).attr("src", newFileName);
          });

        $('#hiq-overlay')[0].load(); // reload it

        $('#overlay').fadeIn();
    });
    

    $('#popup-close').click(function(){
        $('#overlay').fadeOut();
        // $('#popup-background').fadeOut();
    });
    

});
