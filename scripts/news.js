jQuery.fn.comments = function(options) {

    //private fields
    var self = this;
    var submitting = false;
    var settings = jQuery.extend({
        postId: 'post_id',
        nameId: 'comment-name',
        emailAddressId: 'comment-emailAddress',
        contentId: 'comment-content',
        submitId: 'submit-comment',
        rememberMeId: 'comment-rememberMe',
        notifyUpdatesId: 'comment-notifyUpdates',
        onSubmitHandler: null,
        onCompleteSubmitHandler: null,
        onApproveHandler: null,
        onCompleteApproveHandler: null,
        onRejectHandler: null,
        onCompleteRejectHandler: null,
        onDeleteHandler: null,
        onCompleteDeleteHandler: null,
        approvedCommentSelector: '.approved',
        nonApprovedCommentSelector: '.pending',
        approveCommentSelector: '.approve',
        rejectCommentSelector: '.reject',
        deleteCommentSelector: '.delete'
    }, options);

    //private functions
    var deleteComment = function(commentId) {
        if (!submitting) {
            submitting = true;
            if (settings.onDeleteHandler != null) {
                settings.onDeleteHandler();
            }
            $.post('/News/DeleteComment', { id: commentId },
                    function(data) {
                        if (settings.onCompleteDeleteHandler != null) {
                            settings.onCompleteDeleteHandler(data);
                        }
                        submitting = false;
                    },
                    "json");
        }
    };

    //public functions
    jQuery.fn.comments.insertComment = function(elementId, commentId) {
        $.get('/News/Comment/' + commentId, function(comment) {
            $("#" + elementId).append(comment);
            $("#" + commentId).find(settings.deleteCommentSelector).click(function() {
                deleteComment(commentId);
            });
        }, "html");
    };

    //hook up event handlers
    $(settings.nonApprovedCommentSelector).each(function() {
        var commentId = this.id;
        $(this).find(settings.approveCommentSelector).click(function() {
            if (!submitting) {
                submitting = true;
                if (settings.onApproveHandler != null) {
                    settings.onApproveHandler();
                }
                $.post('/News/ApproveComment', { id: commentId },
                    function(data) {
                        if (settings.onCompleteApproveHandler != null) {
                            settings.onCompleteApproveHandler(data);
                        }
                        submitting = false;
                    },
                "json");
            }
        });
        $(this).find(settings.rejectCommentSelector).click(function() {
            if (!submitting) {
                submitting = true;
                if (settings.onRejectHandler != null) {
                    settings.onRejectHandler();
                }
                $.post('/News/RejectComment', { id: commentId },
                function(data) {
                    if (settings.onCompleteRejectHandler != null) {
                        settings.onCompleteRejectHandler(data);
                    }
                    submitting = false;
                },
                "json");
            }
        });
    });

    $(settings.approvedCommentSelector).each(function() {
        var commentId = this.id;
        $(this).find(settings.deleteCommentSelector).click(function() {
            deleteComment(commentId);
        });
    });

    $('#' + settings.submitId).click(function() {
        if (!submitting) {
            submitting = true;
            if (settings.onSubmitHandler != null) {
                settings.onSubmitHandler();
            }

            $.post('/News/SubmitComment', {
                Name: $('#' + settings.nameId).val(),
                EmailAddress: $('#' + settings.emailAddressId).val(),
                Content: $('#' + settings.contentId).val(),
                PostId: $('#' + settings.postId).val(),
                RememberMe: $('#' + settings.rememberMeId).length == 1 ? $('#' + settings.rememberMeId).prop('checked') : false,
                NotifyUpdates: $('#' + settings.notifyUpdatesId).prop('checked')
            },
            function(data) {
                $('#' + settings.contentId).val('');
                if (settings.onCompleteSubmitHandler != null) {
                    settings.onCompleteSubmitHandler(data);
                }
                submitting = false;
            },
            "json");
        }
    });
}
