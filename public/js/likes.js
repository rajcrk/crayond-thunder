function updateLikes(event) {
    id = event.target.id;
    var userName = document.getElementById(id).getAttribute("username");
    $.post('/post/like/' + id + '/' + userName, function (response) {
        console.log('JQuery Request is sent');
        $('.like-count-' + id).text(response.likeCount);
        $('.fa-thumbs-o-up').animate({ fontSize: "18px" });
    })
}