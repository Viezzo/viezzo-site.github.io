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
        $('#hiq-overlay').css('display','block'); 

        $('#overlay').fadeIn();
    });

    $('.video-thumbnail').click(function(){
        vidEmbed = $(this).next();
        vidEmbed.css('display','block'); 
        $(this).css('display','none'); 
    });


    $('#popup-close').click(function(){
        $('#overlay').fadeOut();

        // for misc page
        $('#hiq-overlay').fadeOut();
        $('#soundcloud-overlay').fadeOut();

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

    //---- MISC page
    $('.drawing, .drawing-wide').click(function(){
        var originalSrc = $(this).attr("src");
        var newSrc = originalSrc.replace('/graphics/lowq', '/graphics/hiq')
        $('#hiq-overlay').attr("src", newSrc);
        $('#hiq-overlay').css('display','block'); 

        $('#overlay').fadeIn();
    });
    
    $('.album-cover').click(function(){
        var thisSongId = $(this).attr("data-id");
        var newSrc = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/"
            + thisSongId
            + "&color=%23042434&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true";
        $('#soundcloud-overlay').attr("src", newSrc);
        $('#soundcloud-overlay').css('display','block'); 

        $('#overlay').fadeIn();
    });

});
