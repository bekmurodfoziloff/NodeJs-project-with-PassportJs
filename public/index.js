M.Tabs.init(document.querySelectorAll('.tabs'))

var markupStr = $('#text').summernote('code');
$('#text').summernote('code', markupStr);


$(document).ready(function () {
  $('#text').summernote({
    placeholder: 'text',
    tabsize: 2,
    height: 150,
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link', 'picture', 'video']],
      ['view', ['fullscreen', 'codeview', 'help']]
    ]
  });
});