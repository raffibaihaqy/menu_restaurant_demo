function allMenu(){
    $.getJSON('data/sarapan-pagi.json', function(data){
        let menu = data.menu;
        $.each(menu, function(i, data){
            $('#daftar-menu').append('<div class="col-md-3"><div class="card mb-3"><img src="image/sarapan_pagi/'+ data.gambar +'" style="background-color: #FFFED9" class="card-img-top"><div class="card-body"><h5 class="card-title">'+ data.nama +'</h5><p class="card-text">'+ data.deskripsi +'</p><h5 class="card-title" id="termurah">Rp. '+ data.harga +'</h5><a href="#" class="btn btn-success">Pesan Sekarang</a></div></div></div>');
        });
    });
}

function sortAlphabet(a, b){
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

function SortMenu(command="asc"){
    return function MenuSort(a,b){
        var nameA = a.nama.toLowerCase();
        var nameB = b.nama.toLowerCase();
        var compare = 0;
        if (nameA > nameB){
            compare = 1;
        } else if (nameA < nameB){
            compare = -1;
        }
        return (command == "desc" ? compare * -1 : compare);
    }
}

function SortPrice(command="asc"){
    return function PriceSort(a,b){
        var priceA = a.harga;
        var priceB = b.harga;
        var compare = 0;
        if (priceA > priceB){
            compare = 1;
        }else if(priceA < priceB){
            compare = -1;
        }
        return (command == "desc" ? compare * -1 : compare);
    }
}
var menus = [];

$.getJSON('data/sarapan-pagi.json',function(results){
    var menu = results.menu;
    $.each(menu,function(i,data){
        menus.push(data);
    });
});

allMenu();
// list Semua menu
$('.nav-link').on('click', function(){
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
    $('button').text("Sort by ");
    $('.dropdown-item').removeClass('active');
    let kategori = $.trim($(this).text());
    $('h3').html(kategori);
    if(kategori == 'Semua menu')
    {
        allMenu();
    }
    $.getJSON('data/sarapan-pagi.json', function(result){
        let menu = result.menu;
        let content = "";
        $.each(menu, function(i, data){
            if(data.kategori == kategori.toLowerCase())
            {
                content += '<div class="col-md-3"><div class="card mb-3"><img src="image/sarapan_pagi/'+ data.gambar +'" style="background-color: #FFFED9" class="card-img-top"><div class="card-body"><h5 class="card-title">'+ data.nama +'</h5><p class="card-text">'+ data.deskripsi +'</p><h5 class="card-title">Rp. '+ data.harga +'</h5><a href="#" class="btn btn-success">Pesan Sekarang</a></div></div></div>';
            }else if(kategori == "Semua menu")
            {
                $.getJSON('data/sarapan-pagi.json', function(result){
                    var menu = result.menu;
                    $.each(menu, function(i, data){
                        $("#daftar-menu").append('<div class="col-md-3"><div class="card mb-3"><img src="image/sarapan_pagi/'+ data.gambar +'" style="background-color: #FFFED9" class="card-img-top"><div class="card-body"><h5 class="card-title">'+ data.nama +'</h5><p class="card-text">'+ data.deskripsi +'</p><h5 class="card-title">Rp. '+ data.harga +'</h5><a href="#" class="btn btn-success">Pesan Sekarang</a></div></div></div>');
                    });
                });
                return false;
            }
        });
        $('#daftar-menu').html(content);
    });
});

// Dropdown sort button
$('.dropdown-menu a').on('click',function(){
    var tempmenu = [];
    var content = "";
    $('button').text($(this).text());
    $('.dropdown-item').removeClass('active');
    $(this).addClass('active');
    var kategori = $("h3").text();
    for (var i = 0; i < menus.length; i ++){
        if (menus[i].kategori == kategori.toLowerCase()){
            tempmenu.push(menus[i]);
        }else if (kategori == "Semua menu"){
            tempmenu.push(menus[i]);
        }
    }
    var sort = $(this).text().toLowerCase();
    if (sort == "a-z"){
        tempmenu = tempmenu.sort(SortMenu("asc"));
        $.each(tempmenu, function(z, tempmenus){
            content += '<div class="col-md-3"><div class="card mb-3"><img src="image/sarapan_pagi/'+ tempmenus.gambar +'" style="background-color: #FFFED9" class="card-img-top"><div class="card-body"><h5 class="card-title">'+ tempmenus.nama +'</h5><p class="card-text">'+ tempmenus.deskripsi +'</p><h5 class="card-title">Rp. '+ tempmenus.harga +'</h5><a href="#" class="btn btn-success">Pesan Sekarang</a></div></div></div>';
        })
    }else if (sort == "z-a"){
        tempmenu = tempmenu.sort(SortMenu("desc"));
        $.each(tempmenu, function(z, tempmenus){
            content += '<div class="col-md-3"><div class="card mb-3"><img src="image/sarapan_pagi/'+ tempmenus.gambar +'" style="background-color: #FFFED9" class="card-img-top"><div class="card-body"><h5 class="card-title">'+ tempmenus.nama +'</h5><p class="card-text">'+ tempmenus.deskripsi +'</p><h5 class="card-title">Rp. '+ tempmenus.harga +'</h5><a href="#" class="btn btn-success">Pesan Sekarang</a></div></div></div>';
        })
    }else if (sort == "termurah"){
        tempmenu = tempmenu.sort(SortPrice('asc'));
        $.each(tempmenu, function(z, tempmenus){
            content += '<div class="col-md-3"><div class="card mb-3"><img src="image/sarapan_pagi/'+ tempmenus.gambar +'" style="background-color: #FFFED9" class="card-img-top"><div class="card-body"><h5 class="card-title">'+ tempmenus.nama +'</h5><p class="card-text">'+ tempmenus.deskripsi +'</p><h5 class="card-title">Rp. '+ tempmenus.harga +'</h5><a href="#" class="btn btn-success">Pesan Sekarang</a></div></div></div>';
        })
    }else if (sort == "termahal"){
        tempmenu = tempmenu.sort(SortPrice("desc"));
        $.each(tempmenu, function(z, tempmenus){
            content += '<div class="col-md-3"><div class="card mb-3"><img src="image/sarapan_pagi/'+ tempmenus.gambar +'" style="background-color: #FFFED9" class="card-img-top"><div class="card-body"><h5 class="card-title">'+ tempmenus.nama +'</h5><p class="card-text">'+ tempmenus.deskripsi +'</p><h5 class="card-title">Rp. '+ tempmenus.harga +'</h5><a href="#" class="btn btn-success">Pesan Sekarang</a></div></div></div>';
        })
    }
    $('#daftar-menu').html(content);
});