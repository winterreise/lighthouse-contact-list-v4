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
    // clear form
    $('#name').val('');
    $('#email').val('');
    // make a new contact object
    var contact = {
      name: name,
      email: email
    };
    // post object
    $.ajax({
      url: '/contacts',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(contact),
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
      e.preventDefault();
      // is this a delete or an add button?
      var button = e.target;
      if ($(button).attr('type') === 'submit') {
        createContact($('#name').val(), $('#email').val());
      } else {
        deleteContact($(e.target).attr('data-id'));
      }
    });
  });
})();
