

function sortTable(n, isNumberComparator) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("contactTable");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (isNumberComparator) {
                if (dir == "asc") {
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else {
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function nameFilter() {
    var table = document.getElementById("contactTable");
    var tr = table.getElementsByTagName("tr");
    var td, txtValue;
    var input = document.getElementById("Name");
    var filter = input.value.toUpperCase();
    for (var i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) == -1) {
                tr[i].style.display = "none";
            }
        }
    }
}

function birthDateFilter() {
    var table = document.getElementById("contactTable");
    var tr = table.getElementsByTagName("tr");
    var td, dateValue;
    var filter = Date.parse(document.getElementById("BirthDate").value);
    var inputFilterType = document.getElementById("birthDateFilterType");
    var filterType = inputFilterType.value;
    for (var i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            dateValue = Date.parse(td.innerText);
            if (filterType == 1) {
                if (dateValue < filter) {
                    tr[i].style.display = "none";
                }
            } else if (filterType == 2) {
                if (dateValue > filter) {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

function marriedFilter() {
    var table = document.getElementById("contactTable");
    var tr = table.getElementsByTagName("tr");
    var td, checkValue;
    var filter = document.getElementById("IsMarried").checked;
    for (var i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            checkValue = td.getElementsByTagName("input")[0].checked;
            if (checkValue != filter) {
                tr[i].style.display = "none";
            }
        }
    }
}

function phoneFilter() {
    var table = document.getElementById("contactTable");
    var tr = table.getElementsByTagName("tr");
    var td, txtValue;
    var input = document.getElementById("Phone");
    var filter = input.value.toUpperCase();
    for (var i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) == -1) {
                tr[i].style.display = "none";
            }
        }
    }
}

function salaryFilter() {
    var table = document.getElementById("contactTable");
    var tr = table.getElementsByTagName("tr");
    var td, numberValue;
    var filter = Number(document.getElementById("Salary").value);
    var inputFilterType = document.getElementById("salaryFilterType");
    var filterType = inputFilterType.value;
    for (var i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
            numberValue = Number(td.innerText);
            if (filterType == 1) {
                if (numberValue < filter) {
                    tr[i].style.display = "none";
                }
            } else if (filterType == 2) {
                if (numberValue > filter) {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

function formClear() {
    document.getElementById("isUseNameFilter").checked = false;
    document.getElementById("isUseBirthDateFilter").checked = false;
    document.getElementById("isUseMarriedFilter").checked = false;
    document.getElementById("isUsePhoneFilter").checked = false;
    document.getElementById("isUseSalaryFilter").checked = false;
}

function filterTableClear() {
    var table = document.getElementById("contactTable");
    var tr = table.getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }
}

function filterTable() {
    if (document.getElementById("isUseNameFilter").checked == true) {
        nameFilter();
    }
    if (document.getElementById("isUseBirthDateFilter").checked == true) {
        birthDateFilter();
    }

    if (document.getElementById("isUseMarriedFilter").checked == true) {
        marriedFilter();
    }

    if (document.getElementById("isUsePhoneFilter").checked == true) {
        phoneFilter();
    }
    if (document.getElementById("isUseSalaryFilter").checked == true) {
        salaryFilter();
    }
}

function filterSubmit() {
    filterTable();
    document.getElementById("filterForm").style.display = "none";
    document.getElementById("filterSubmit").style.display = "none";
    document.getElementById("filterClear").style.display = "";
}
function filterClear() {
    formClear();
    filterTableClear();
    document.getElementById("filterForm").style.display = "";
    document.getElementById("filterSubmit").style.display = "";
    document.getElementById("filterClear").style.display = "none";

}


document.addEventListener("DOMContentLoaded", function () {
    let table = document.getElementById("contactTable");

    for (let i = 0; i < (table.rows[0].cells.length - 1); i++) {
        let isSalary = i == 4; 
        table.rows[0].cells[i].addEventListener("click", () => { sortTable(i, isSalary) });
    }
    document.getElementById("filterSubmit").addEventListener("click", filterSubmit);
    document.getElementById("filterClear").addEventListener("click", filterClear);
});
