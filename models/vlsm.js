/**
 * Class to calculate the VLSM (Variable Length Subnet Masking) for a given network, list of LANs and prefix length
 */
class VLSM {
    constructor(mainNetwork, lans, prefix) {
        this.mainNetwork = mainNetwork;
        this.lans = lans;
        this.prefix = prefix || this.determinePrefix(mainNetwork);
    }

    /**
     * Initialize the VLSM calculation
     * @returns {Array} Subnets
     */
    init() {
        // Order the LANs by number of devices
        this.lans.sort((a, b) => b.devices - a.devices);

        // Array to store the subnets
        let subnets = [];
        let currentNetwork = this.ipToBinary(this.mainNetwork).slice(0, this.prefix).padEnd(32, '0');
        const ipAddressLength = 32;

        for (let lan of this.lans) {
            let bitsRequired = this.calculateBitsRequired(lan.devices);
            let subnetMaskPrefix = ipAddressLength - bitsRequired;
            let subnetMask = this.prefixToSubnetMask(subnetMaskPrefix);

            // Calculate the number of available hosts
            let hostsAvailable = Math.pow(2, bitsRequired) - 2; // Hosts + Network and Broadcast addresses

            // Calculate the network and broadcast addresses
            let networkAddress = currentNetwork.slice(0, subnetMaskPrefix).padEnd(32, '0');
            let broadcastAddress = currentNetwork.slice(0, subnetMaskPrefix).padEnd(32, '1');

            // Calculate the first and last host addresses adding 1 to the network address and subtracting 1 from the broadcast address
            let firstHostBinary = (parseInt(networkAddress, 2) + 1).toString(2).padStart(32, '0');
            let lastHostBinary = (parseInt(broadcastAddress, 2) - 1).toString(2).padStart(32, '0');

            // Convert the addresses to decimal format
            let network = this.binaryToIp(networkAddress);
            let broadcast = this.binaryToIp(broadcastAddress);
            let firstHost = this.binaryToIp(firstHostBinary);
            let lastHost = this.binaryToIp(lastHostBinary);

            // Add the subnet to the list
            subnets.push({
                lan: lan.name,
                network,
                broadcast,
                subnetMask,
                subnetMaskPrefix,
                hostsAvailable,
                firstHost,
                lastHost
            });

            // Calculate the next network address
            let nextNetwork = (parseInt(broadcastAddress, 2) + 1).toString(2).padStart(32, '0'); // Add 1 to the broadcast address
            currentNetwork = nextNetwork;
        }

        return subnets;
    }

    /**
     * Convert an IP address from decimal to binary
     * @param {String} ip - IP address in decimal format
     * @returns {String} IP address in binary format
     */
    ipToBinary(ip) {
        return ip.split('.').map(octet => {
            return parseInt(octet, 10) // Convert to integer
                .toString(2) // Convert to binary
                .padStart(8, '0'); // Add leading zeros
        }).join('');
    }

    /**
     * Convert an IP address from binary to decimal
     * @param {String} binary - IP address in binary format
     * @returns {String} IP address in decimal format
     */
    binaryToIp(binary) {
        return binary.match(/.{1,8}/g).map(byte => {
            return parseInt(byte, 2) // Convert to integer
                .toString(10); // Convert to decimal
        }).join('.');
    }

    /**
     * Convert a prefix length to a subnet mask
     * @param {Integer} prefix - Prefix length
     * @returns {String} Subnet mask in decimal format
     */
    prefixToSubnetMask(prefix) {
        return this.binaryToIp('1'.repeat(prefix).padEnd(32, '0')); // Convert prefix to binary and then to decimal
    }

    /**
     * Calculate the number of bits required for the subnet mask
     * @param {Integer} hosts - Number of hosts 
     * @returns {Integer} Number of bits required for the subnet mask
     */
    calculateBitsRequired(hosts) {
        return Math.ceil(Math.log2(hosts + 2));
    }

    /**
     * Determine the default prefix based on the IP address class
     * @param {String} ip - IP address in decimal format
     * @returns {Integer} Default prefix length
     */
    determinePrefix(ip) {
        const firstOctet = parseInt(ip.split('.')[0], 10);
        if (firstOctet >= 1 && firstOctet <= 126) {
            return 8;  // Class A
        } else if (firstOctet >= 128 && firstOctet <= 191) {
            return 16; // Class B
        } else if (firstOctet >= 192 && firstOctet <= 223) {
            return 24; // Class C
        } else {
            throw new Error('IP address class not supported');
        }
    }
}

module.exports = VLSM;