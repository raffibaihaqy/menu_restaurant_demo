function allMenu(){
    $.getJSON('data/sarapan-pagi.json', function(data){
        let menu = data.menu;
        $.each(menu, function(i, data){
            $('#daftar-menu').append('<div class="col-md-3"><div class="card mb-3"><img src="image/sarapan_pagi/'+ data.gambar +'" style="background-color: #FFFED9" class="card-img-top"><div class="card-body"><h5 class="card-title">'+ data.nama +'</h5><p class="card-text">'+ data.deskripsi +'</p><h5 class="card-title" id="termurah">Rp. '+ data.harga +'</h5><a href="#" class="btn btn-success">Pesan Sekarang</a></div></div></div>');
        });
    });
}

allMenu();

$('.nav-link').on('click', function(){
    $('.nav-link').removeClass('active');
    $(this).addClass('active');

    let kategori = $(this).html();
    $('h3').html(kategori);

    if(kategori == 'Semua menu')
    {
        allMenu();
        return;
    }

    $.getJSON('data/sarapan-pagi.json', function(data){
        let menu = data.menu;
        let content = '';

        $.each(menu, function(i, data){
            if(data.kategori == kategori.toLowerCase())
            {
                content += '<div class="col-md-3"><div class="card mb-3"><img src="image/sarapan_pagi/'+ data.gambar +'" style="background-color: #FFFED9" class="card-img-top"><div class="card-body"><h5 class="card-title">'+ data.nama +'</h5><p class="card-text">'+ data.deskripsi +'</p><h5 class="card-title">Rp. '+ data.harga +'</h5><a href="#" class="btn btn-success">Pesan Sekarang</a></div></div></div>'
            }
        });

        $('#daftar-menu').html(content);
    });
});