function generateTableBodyLANs() {
    const lans_count = $('#lans_count').val();

    for (let i = 0; i < lans_count; i++) {
        $('#table-body-lans').append(`
            <tr data-lan>
                <td>
                    <input type="text" class="form-control-sm" value="Red ${i + 1}" required data-name-lan>
                </td>
                <td>
                    <input type="number" min="1" step="1" class="form-control-sm" tabindex="${i + 1}" required data-number-device>
                </td>
            </tr>
        `);
    }
}

$(document).ready(function() {
    generateTableBodyLANs();

    $('#lans_count').on('input', function() {
        $('#table-body-lans').empty();
        generateTableBodyLANs();
    });

    $("#network-info").on("submit", function(e) {
        e.preventDefault();
        e.stopPropagation();

        const network = $('#main_network').val().split('/');
        const main_network = network[0];
        const prefix =  Number(network[1]);
        const lans = [];

        $('#table-body-lans tr[data-lan]').each(function() {
            const name = $(this).find('input[data-name-lan]').val();
            const devices = $(this).find('input[data-number-device]').val();

            lans.push({
                name,
                devices: Number(devices)
            });
        });

        const data = {
            main_network,
            prefix,
            lans
        };

        let result = $.ajax({
            type: 'POST',
            url: '/calculate',
            data: JSON.stringify(data),
            contentType: 'application/json',
            async: false
        }).responseJSON;

        if(!result.success) {
            alert(result.error);
            return;
        }

        window.location.href = '/results';
    });
});