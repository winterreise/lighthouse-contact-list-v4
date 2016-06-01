/*global $, Handlebars*/
(function() {

  var contactTemplate = Handlebars.compile($('#contact-template').html());

  function drawContacts(contacts) {
    $('#ContactList').empty();
    if (contacts) {
      for (var i=0;i<contacts.length;i++) {
        var row = contactTemplate(contacts[i]); // handlebars makes us an HTML string representing one row in our table
        $('#ContactList').append(row); // append row html to table
      }
    }
  }

  function refreshContacts() {
    $.ajax({
      url: '/contacts',
      method: 'GET',
      success: drawContacts
    });
  }

  function createContact(name, email) {
    $.ajax({
      url: '/contacts',
      method: 'POST',
      data: {
        name: name,
        email: email
      },
      success: refreshContacts
    });
  }

  function deleteContact(id) {
    $.ajax({
      url: '/contacts/' + id,
      method: 'DELETE',
      success: refreshContacts
    });
  }

  $(document).ready(function() {
    // start off by loading all the contacts
    refreshContacts();

    $(document).on('click','button',function(e){
      deleteContact($(e.target).attr('data-id'));
    });
  });
})();
