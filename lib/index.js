$(document).ready(function() {

    $('.animation-video, .animation-wide').click(function(){
        var element = $(this)

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

    $('.video-thumbnail').click(function(){
        vidEmbed = $(this).next();
        vidEmbed.css('display','block'); 
        $(this).css('display','none'); 
    });


    $('#popup-close').click(function(){
        $('#overlay').fadeOut();
        // $('#popup-background').fadeOut();
    });

    var video = $('<video />', {
        class: 'animation-video',
        src: './videos/lowq/raissa-1.mp4',
        type: 'video/mp4'
    }).prop({
        muted: true,
        autoplay: true,
        loop: true,
        playsinline: true,
    });  
    // video.appendTo($('#mainSection'));
    

});
