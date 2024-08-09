
var url = "http://localhost:7236/";
var js = jQuery.noConflict(true);
js(document).ready(function () {

    js('#companyTable').DataTable({

    });

    $("#Error").hide();
});

function ShowAddNewSectorModel() {
    $('#exampleModal').modal("show");
}

function SaveSector() {
    var SectorName = document.getElementById('sectorname').value;

    if (SectorName == "") {


        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Sector Name is Required",
        });

    } else {
        js.ajax({
            type: 'POST',
            url: "api/Sector/SaveSector",
            contentType: 'application/json', // Set Content-Type to application/json
            data: JSON.stringify(SectorName), // Send SectorName as JSON
            dataType: 'json',
            success: function (response) {

                if (response) {
                    $('#exampleModal').modal("hide");

                    Swal.fire({
                        title: "Good job!",
                        text: "Sector is saved Successfully!",
                        icon: "success"
                    });
                }

                  
                else
                {
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
