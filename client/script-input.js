const socket = io("https://proxy.athallahdzaki.my.id:3000");

$("#Input").on("submit", function (event) {
    event.preventDefault();
    const kupon = $("#Number").val();
    if (kupon.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Kupon Kosong',
            text: "Masukkan Kupon!",
            timer: 2000,
            allowOutsideClick: false,
            allowEscapeKey: false
        });
    }
    else {
        Swal.fire({
            icon: 'info',
            title: 'Menunggu...',
            text: "Kupon ID : " + kupon,
            showConfirmButton: false,
            timer: 3000,
            allowOutsideClick: false,
            allowEscapeKey: false,
            willClose: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Kupon Berhasil di Kirim ke Server',
                    text: "KUPON ID : " + kupon,
                    timer: 4000,
                })
            }
        });
        socket.emit("PushKupon", kupon);
    }
})

$("#Accept").on("click", function (event) {
    event.preventDefault();
    socket.emit("DiTerima");
    Swal.fire({
        icon: 'success',
        title: 'Kupon Diterima',
        showConfirmButton: false,
        timer: 5000,
        allowOutsideClick: false,
        allowEscapeKey: false
    });
})

$("#Denied").on("click", function (event) {
    event.preventDefault();
    socket.emit("Hangus");
    Swal.fire({
        icon: 'error',
        title: 'Kupon Ditolak',
        timer: 5000,
        allowOutsideClick: false,
        allowEscapeKey: false
    });
});