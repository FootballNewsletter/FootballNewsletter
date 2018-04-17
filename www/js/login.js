$(function() {

    $('#login-form-link').click(function(e) {
        $("#login-form").fadeIn(0);
        $("#register-form").fadeOut(0);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").fadeIn(0);
        $("#login-form").fadeOut(0);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

});