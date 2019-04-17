function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#image-preview-id')
                .show()
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Clearing the image in the preview when needed to remove
$('#remmove-image-btn').on('click', function () {
    $('#image-preview-id')
        .val('')
        .hide();
});