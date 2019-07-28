$(function() {

    $.ajax({
        type: 'GET',
        url: 'api/productList',
        data: '',
        success: function(data) {
            var petsRow = $('#petsRow');
            var petTemplate = $('#petTemplate');
    
            for (i = 0; i < data.length; i ++) {
                petTemplate.find('.panel-title').text(data[i].name);
                petTemplate.find('img').attr('src', data[i].picture);
                petTemplate.find('.pet-breed').text(data[i].price);
                petTemplate.find('.pet-age').text(data[i].age);
                petTemplate.find('.pet-location').text(data[i].amount);
                petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
                petsRow.append(petTemplate.html());
            }
        }
    });

    $('#petsRow').on('click', '.btn-adopt', function() {
        console.log($(this).attr('data-id'))
    })
    $('#account-btn').on('click', function() {
        const param = {
            userName: 'Jacky',
            password: '123456'
        }
        $.ajax({
            type: 'POST', 
            url: '/api/signUp', 
            data: param,
            success: function(data) {
                console.log(data)
                // alert('注册成功！', data)
            },
            error: function(err) {
                console.log('111', err)
            }
        })
    })
})