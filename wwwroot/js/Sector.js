

var js = jQuery.noConflict(true);
js(document).ready(function () {

    SectorMaster = js("#companyTable").DataTable();

    LoadActiveSectors();
});

function ShowAddNewSectorModel() {
    ClearFields();
    $('#exampleModal').modal("show");
}

function SaveSector() {

    var SectorId = document.getElementById('sectorid').value;
    var SectorName = document.getElementById('sectorname').value;

    if (SectorId == "") {
        SectorId = 0;
    }

    if (SectorName == "") {


        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Sector Name is Required",
        });

    } else {

        var SectorViewModel = {};
        SectorViewModel.SectorId = SectorId;
        SectorViewModel.SectorName = SectorName;

        js.ajax({
            type: 'POST',
            url: "api/Sector/SaveSector",
            contentType: 'application/json', // Set Content-Type to application/json
            data: JSON.stringify(SectorViewModel), // Send SectorName as JSON
            dataType: 'json',
            success: function (response) {

                if (response) {
                    $('#exampleModal').modal("hide");

                    Swal.fire({
                        title: "Good job!",
                        text: "Sector is saved Successfully!",
                        icon: "success"
                    });

                    SectorMaster.clear().draw();
                    LoadActiveSectors();

                }


                else {
                    $('#exampleModal').modal("hide");

                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",

                    });
                }

            },
            error: function (err) {
                console.log("API failed: ERROR - ", err);
                alert("Failed to save sector. Please try again."); // Handle error
            }
        });
    }
}

function LoadActiveSectors() {
    js.ajax({
        type: 'GET',
        url: "api/Sector/GetActiveSectors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            if (data != null) {
                //companypioritytableone.clear().draw();
                $.each(data, function (index, item) {

                    var Id = item.id;
                    var SectorName = item.sectorName;
                    var EnterdBy = item.enterdBy;
                    var Status = item.satus;
                    let dateTime = new Date(item.enterdDate);
                    let ReadableDateTime = dateTime.toLocaleString();
                    var EditButton = '<button id="btnactiveSector_' + Id + '" class="btn btn-sm btn-primary" onclick="UpdateSector(' + Id + ', \'' + SectorName + '\');" type="button"><i class="fa fa-pencil"></i></button>';
                    var DeleteButton = '<button id="btnactiveSector_' + Id + '" class="btn btn-sm btn-danger" onclick="DeleteSector(' + Id + ');" type="button"><i class="fa fa-close"></i></button>'

                    // Add the data to your table or perform other operations as needed
                    var rowdatanew = [Id, SectorName, EnterdBy, ReadableDateTime, EditButton + ' ' + DeleteButton];
                    SectorMaster.row.add(rowdatanew).draw();
                });
            }

            // Loop through the data

        },
        error: function (err) {
            console.log("GetCompanyPiorities failed: ERROR - " + err);
        }
    });
}


function UpdateSector(cmpId,sectorname) {
    var sectorId = document.getElementById('sectorid');
    sectorId.value = cmpId;
    var sectorName = document.getElementById('sectorname');
    sectorName.value = sectorname;
    // var modalpopup = document.getElementById('exampleModal');
    $('#exampleModal').modal("show");

}

function DeleteSector(sectorId) {
    document.getElementById('deletesectorid').value = sectorId;
     
    $('#deleteconfirmmodel').modal("show");    
}

function DeactivateSector() {

    var sectorId = document.getElementById('deletesectorid').value;

    js.ajax({
        type: 'POST',
        url: "api/Sector/DeactivateSector?sectorId=" + sectorId,
        contentType: 'application/json', // Set Content-Type to application/json   
        dataType: 'json',
        success: function (response) {

            if (response) {
                $('#deleteconfirmmodel').modal("hide");

                Swal.fire({
                    title: "Good job!",
                    text: "Sector is Deactivated Successfully!",
                    icon: "success"
                });

                SectorMaster.clear().draw();
                LoadActiveSectors();

            }


            else {
                $('#deleteconfirmmodel').modal("hide");

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",

                });
            }

        },
        error: function (err) {
            console.log("API failed: ERROR - ", err);
            alert("Failed to save sector. Please try again."); // Handle error
        }
    });
}

function ClearFields() {
    document.getElementById('sectorid').value = '';
    document.getElementById('sectorname').value = '';
}