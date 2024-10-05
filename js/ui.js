document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidenav for mobile view
    var sidenavElems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavElems);

    // Initialize dropdowns
    var dropdownElems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdownElems, {
        constrainWidth: false,
        coverTrigger: false
    });

    // Initialize modals
    var modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems);

    // Initialize select elements
    var selectElems = document.querySelectorAll('select');
    M.FormSelect.init(selectElems);
});
