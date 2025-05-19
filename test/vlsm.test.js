const VLSM = require('../models/vlsm');

test("VLSM calculation", () => {
    let main_network = '192.168.1.0';
    let lans = [
        {
            name: 'LAN 1',
            devices: 50
        },
        {
            name: 'LAN 2',
            devices: 20
        },
        {
            name: 'LAN 3',
            devices: 10
        },
        {
            name: 'LAN 4',
            devices: 5
        }
    ];
    let prefix = 24;

    const vlsm = new VLSM(main_network, lans, prefix);
    const vlsm_result = vlsm.init();

    expect(vlsm_result).toEqual(
        [
            {
                lan: 'LAN 1',
                network: '192.168.1.0',
                broadcast: '192.168.1.63',
                subnetMask: '255.255.255.192',
                subnetMaskPrefix: 26,
                hostsAvailable: 62,
                hostrequired: 50,
                firstHost: '192.168.1.1',
                lastHost: '192.168.1.62'
            },
            {
                lan: 'LAN 2',
                network: '192.168.1.64',
                broadcast: '192.168.1.95',
                subnetMask: '255.255.255.224',
                subnetMaskPrefix: 27,
                hostsAvailable: 30,
                hostrequired: 20,
                firstHost: '192.168.1.65',
                lastHost: '192.168.1.94'
            },
            {
                lan: 'LAN 3',
                network: '192.168.1.96',
                broadcast: '192.168.1.111',
                subnetMask: '255.255.255.240',
                subnetMaskPrefix: 28,
                hostsAvailable: 14,
                hostrequired: 10,
                firstHost: '192.168.1.97',
                lastHost: '192.168.1.110'
            },
            {
                lan: 'LAN 4',
                network: '192.168.1.112',
                broadcast: '192.168.1.119',
                subnetMask: '255.255.255.248',
                subnetMaskPrefix: 29,
                hostsAvailable: 6,
                hostrequired: 5,
                firstHost: '192.168.1.113',
                lastHost: '192.168.1.118'
            }
        ]
    );
});

test("Out of order VLSM input", () => {
    let main_network = '192.168.1.0';
    let lans = [
        {
            name: 'LAN 4',
            devices: 5
        },
        {
            name: 'LAN 2',
            devices: 20
        },
        {
            name: 'LAN 3',
            devices: 10
        },
        {
            name: 'LAN 1',
            devices: 50
        }
    ];
    let prefix = 24;

    const vlsm = new VLSM(main_network, lans, prefix);
    const vlsm_result = vlsm.init();

    expect(vlsm_result).toEqual(
        [
            {
                lan: 'LAN 1',
                network: '192.168.1.0',
                broadcast: '192.168.1.63',
                subnetMask: '255.255.255.192',
                subnetMaskPrefix: 26,
                hostsAvailable: 62,
                hostrequired: 50,
                firstHost: '192.168.1.1',
                lastHost: '192.168.1.62'
            },
            {
                lan: 'LAN 2',
                network: '192.168.1.64',
                broadcast: '192.168.1.95',
                subnetMask: '255.255.255.224',
                subnetMaskPrefix: 27,
                hostsAvailable: 30,
                hostrequired: 20,
                firstHost: '192.168.1.65',
                lastHost: '192.168.1.94'
            },
            {
                lan: 'LAN 3',
                network: '192.168.1.96',
                broadcast: '192.168.1.111',
                subnetMask: '255.255.255.240',
                subnetMaskPrefix: 28,
                hostsAvailable: 14,
                hostrequired: 10,
                firstHost: '192.168.1.97',
                lastHost: '192.168.1.110'
            },
            {
                lan: 'LAN 4',
                network: '192.168.1.112',
                broadcast: '192.168.1.119',
                subnetMask: '255.255.255.248',
                subnetMaskPrefix: 29,
                hostsAvailable: 6,
                hostrequired: 5,
                firstHost: '192.168.1.113',
                lastHost: '192.168.1.118'
            }
        ]
    );
});

test("Small network", () => {
    let main_network = '192.168.1.0';
    let lans = [
        {
            name: 'LAN 1',
            devices: 2
        },
        {
            name: 'LAN 2',
            devices: 2
        },
        {
            name: 'LAN 3',
            devices: 9
        }
    ];
    let prefix = 24;

    const vlsm = new VLSM(main_network, lans, prefix);
    const vlsm_result = vlsm.init();

    expect(vlsm_result).toEqual(
        [
            {
                lan: 'LAN 3',
                network: '192.168.1.0',
                broadcast: '192.168.1.15',
                subnetMask: '255.255.255.240',
                subnetMaskPrefix: 28,
                hostsAvailable: 14,
                hostrequired: 9,
                firstHost: '192.168.1.1',
                lastHost: '192.168.1.14'
            },
            {
                lan: 'LAN 1',
                network: '192.168.1.16',
                broadcast: '192.168.1.19',
                subnetMask: '255.255.255.252',
                subnetMaskPrefix: 30,
                hostsAvailable: 2,
                hostrequired: 2,
                firstHost: '192.168.1.17',
                lastHost: '192.168.1.18'
            },
            {
                lan: 'LAN 2',
                network: '192.168.1.20',
                broadcast: '192.168.1.23',
                subnetMask: '255.255.255.252',
                subnetMaskPrefix: 30,
                hostsAvailable: 2,
                hostrequired: 2,
                firstHost: '192.168.1.21',
                lastHost: '192.168.1.22'
            }
        ]
    );
});