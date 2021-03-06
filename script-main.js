var selectedRow = null
function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}
function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["age"] = document.getElementById("age").value;
    formData["gender"] = document.querySelector('input[name="gender"]:checked').value;
    formData["myhobby"] = document.getElementById("myhobby").value;
    return formData;
}
function insertNewRecord(data) {
    var table = document.getElementById("List").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    console.log(typeof(cell1));
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.age;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.gender;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.myhobby;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button>
                       <button onClick="onDelete(this)">Delete</button>`;
}
function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("age").value = "";
    var eras=document.getElementsByClassName("gender");
    for(let gen of eras) 
    {
       gen.checked=false;
    }
    document.getElementById("myhobby").value = "";
    selectedRow = null;
}
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("age").value = selectedRow.cells[1].innerHTML;
    var gender =selectedRow.cells[2].innerHTML;
    if(gender == "Male")
        document.getElementById("Male").checked=true;
    else 
        document.getElementById("Female").checked=true;
    document.getElementById("myhobby").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.age;
    selectedRow.cells[2].innerHTML = formData.gender;
    selectedRow.cells[3].innerHTML = formData.myhobby;
}
function onDelete(td) {
    if (confirm('Conformation to delete this record ?')) {
        var row = td.parentElement.parentElement;
        document.getElementById("List").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    if (document.getElementById("fullName").value == "") {
        alert("Enter the Name");
        return false;
    }
    var age1=document.getElementById("age").value;
    if(age1<=18 || age1>100)
    {
        alert("Age is Mandatory (Between 18 to 100)");
        return false;
    }
    var e = document.getElementById("myhobby");
    var strUser = e.options[e.selectedIndex].value;
    if(strUser==0)
    {
        alert("Please select a hobby");
    }
    return true;
}

