window.DEVELOPMENT = /^http:\/\/127\.0\.0\.1:[0-9]{1,5}\/?$/.test(window.origin);

window.game = {
    protocol: 5,
    version: `v${require('./Version')}`,
    state: 0,
    focus: true,
    screenX: 0,
    screenY: 0,
    halfScreenX: 0,
    halfScreenY: 0,
    scale: 1,
    spectatingID: null,
    myID: null,
    myType: null,
    myTeam: null,
    myUserID: "",
    myName: "",
    myOriginalName: "",
    myScore: 0,
    myPlace: 0,
    myLevel: 0,
    myToken: "",
    myFlag: "xx",
    loggedIn: false,
    roomName: "",
    regionName: "",
    playRegion: "derp",
    playRoom: "ffa",
    playHost: "",
    playPath: "",
    playInvited: false,
    gameType: null,
    inviteLink: "",
    lastFlagSet: "xx",
    reloading: false,
    ping: 0,
    lagging: false,
    timeFactor: 1,
    timeFactorUncapped: 1,
    time: 0,
    timeNetwork: 0,
    jitter: 0,
    frames: 0,
    shadowX: 0,
    shadowY: 0,
    graphics: {},
    debug: {},
    buckets: [],
    customServerUrl: null,
    backendHost: "data.airmash.online",
    server: {}
};

window.config = {
    settings: {},
    auth: {},
    ships: [
        // Unused (0)
        {},
        // PlaneType.Predator (1)
        {
            name: "raptor",
            turnFactor: .065,
            accelFactor: .225,
            maxSpeed: 5.5,
            minSpeed: .001,
            brakeFactor: .025,
            energyLight: .6,
            collisions: [[0, 5, 23], [0, -15, 15], [0, -25, 12]]
        },
        // PlaneType.Goliath (2)
        {
            name: "spirit",
            turnFactor: .04,
            accelFactor: .15,
            maxSpeed: 3.5,
            minSpeed: .001,
            brakeFactor: .015,
            energyLight: .9,
            collisions: [[0, 0, 35], [50, 14, 16], [74, 26, 14], [30, 8, 23], [63, 22, 15], [-50, 14, 16], [-74, 26, 14], [-30, 8, 23], [-63, 22, 15]]
        },
        // PlaneType.Mohawk (3)
        {
            name: "mohawk",
            turnFactor: .07,
            accelFactor: .275,
            maxSpeed: 6,
            minSpeed: .001,
            brakeFactor: .025,
            energyLight: .3,
            collisions: [[0, -12, 15], [0, 0, 17], [0, 13, 15], [0, 26, 15]]
        },
        // PlaneType.Tornado (4)
        {
            name: "tornado",
            turnFactor: .055,
            accelFactor: .2,
            maxSpeed: 4.5,
            minSpeed: .001,
            brakeFactor: .025,
            energyLight: .5,
            collisions: [[0, 8, 18], [14, 12, 13], [-14, 12, 13], [0, -12, 16], [0, -26, 14], [0, -35, 12]]
        },
        // PlaneType.Prowler (5)
        {
            name: "prowler",
            turnFactor: .055,
            accelFactor: .2,
            maxSpeed: 4.5,
            minSpeed: .001,
            brakeFactor: .025,
            energyLight: .75,
            collisions: [[0, 11, 25], [0, -8, 18], [19, 20, 10], [-19, 20, 10], [0, -20, 14]]
        }
    ],
    /*
     * This array contains elements whose index is a missile MobType and whose
     * value is an object with keys:
     *      * thruster: [xScale, yScale] to size the exhaust
     *      * exhaust: offset from top(?) of missile texture where exhaust appears
     * Optional:
     *      * thrusterGlowAlpha: 0..1.0, cannot be 0.0, default 1.0
     *      * smokeGlowAlpha: 0..1.0, default 1.0
     *      * thrusterAlpha: 0..1.0, default 1.0
     */
    mobs: [
        // Unused (0)
        {},
        // MobType.PredatorMissile (1)
        {
            exhaust: 20,
            thruster: [.2, .4]
        },
        // MobType.GoliathMissile (2)
        {
            exhaust: 30,
            thruster: [.3, .6]
        },
        // MobType.MohawkMissile (3)
        {
            exhaust: 18,
            thruster: [.14, .3]
        },
        // MobType.Upgrade (4)
        {},
        // MobType.TornadoSingleMissile (5)
        {
            exhaust: 20,
            thruster: [.2, .4]
        },
        // MobType.TornadoTripleMissile (6)
        {
            exhaust: 20,
            thruster: [.2, .4]
        },
        // MobType.ProwlerMssile (7)
        {
            exhaust: 20,
            thruster: [.2, .4]
        },
        // Unused (8)
        {},
        // Unused (9)
        {},
        // Unused (10)
        {},
        // Unused (11)
        {},
        // MobType.CarrotMissile (12)
        {
            exhaust: 18,
            thruster: [.15, .3],
            thrusterGlowAlpha: 0.5,
            smokeGlowAlpha: 0.5,
            thrusterAlpha: 0.5
        }
    ],
    upgrades: {
        speed: {
            cost: [0, 1, 1, 1, 1, 1],
            factor: [1, 1.05, 1.1, 1.15, 1.2, 1.25]
        },
        defense: {
            cost: [0, 1, 1, 1, 1, 1],
            factor: [1, 1.05, 1.1, 1.15, 1.2, 1.25]
        },
        energy: {
            cost: [0, 1, 1, 1, 1, 1],
            factor: [1, 1.05, 1.1, 1.15, 1.2, 1.25]
        },
        missile: {
            cost: [0, 1, 1, 1, 1, 1],
            factor: [1, 1.05, 1.1, 1.15, 1.2, 1.25]
        }
    },
    /*
        List of lists containing:
        [
            centreX,
            centreY,
            textureNameOrId,  // See Mobs.addDoodad, may also be string?
            scale,
            rotation,
            alpha,
            tint,
            // Below are added by addDoodad
            unknown,       // Set to false by addDoodad
            texture,       // Pixi Texture object
            wasInteger,    // 1 if textureNameOrId was an integer
        ]
    */
    doodads: [[1009, -2308, 1, .9, .2, null, null], [1241, -2490, 4, .5, -.2, null, null], [1157, -2379, 2, .7, -.1, null, null], [622, -2126, 3, .4, null, null, null], [669, -2187, 2, .6, null, null, null], [-392, -1669, 1, 1.1, .1, null, null], [-273, -1746, 4, .5, -.1, null, null], [-252, -1504, 2, 1, null, null, null], [1553, -2016, 2, .4, .2, null, null], [1637, -1972, 1, .5, .1, null, null], [1736, -1922, 2, .5, .7, null, null], [2150, -2406, 2, .6, null, null, null], [2238, -2318, 3, .9, null, null, null], [2364, -2391, 4, .6, 0, null, null], [2491, -2682, 1, .6, -.1, null, null], [2596, -2671, 2, .9, .2, null, null], [-150, -3147, 4, .4, -.4, null, null], [-155, -3044, 2, .7, 0, null, null], [-427, -3600, 2, .4, null, null, null], [-259, -2982, 2, .5, null, null, null], [-379, -3529, 1, .6, .1, 1, null], [-665, -3052, 2, .5, null, null, null], [20, -1816, 4, .5, .3, null, null], [127, -1799, 1, .5, null, null, null], [263, -2572, 3, .4, .4, null, null], [405, -2570, 1, .9, -.2, null, null], [851, -4183, 1, 1, null, null, null], [754, -3971, 2, .9, -.1, 1, null], [1757, -5065, 4, 1.1, null, null, null], [1169, -4453, 3, .9, null, null, null], [2054, -5244, 3, .9, null, null, null], [1631, -4901, 1, .9, 0, null, null], [2305, -5281, 2, .9, .2, 1, null], [1007, -4281, 1, .8, .1, null, null], [2766, -5202, 1, .8, .1, 1, null], [2927, -5204, 2, .7, null, 1, null], [3206, -5218, 2, .3, .6, 1, null], [3099, -5193, 4, .6, .1, 1, null], [1417, -4726, 2, 1, null, null, null], [2844, -1513, 4, .5, .1, null, null], [3206, -1464, 1, 1, .1, 1, null], [2881, -1403, 2, .9, null, null, null], [3804, -2025, 1, .7, -.1, null, null], [4116, -1778, 2, .9, -.3, null, null], [3715, -1508, 3, .6, .1, null, null], [4247, -1126, 1, .6, .1, 1, null], [3860, 268, 1, .5, .5, 1, null], [4334, -1011, 2, 1.1, -.1, null, null], [3849, 349, 3, .6, null, null, null], [3956, 490, 4, .8, -.4, null, null], [4073, 667, 2, .9, -.5, null, null], [3583, -864, 4, .8, .1, .8, 15723705], [4135, 836, 2, 1, -.2, null, null], [4785, -743, 2, 1, .1, null, null], [4993, -839, 1, .9, .3, 1, null], [5224, -482, 3, .7, null, null, null], [5235, -1238, 4, 1.1, null, 1, null], [5419, -1346, 2, .6, -.5, .8, null], [6075, -5099, 1, .8, null, null, null], [5767, -4953, 2, .9, -.3, 1, null], [5896, -4967, 2, .9, .1, 1, null], [5384, -4642, 4, .9, null, null, null], [5704, -4857, 4, .9, null, null, null], [5563, -4697, 2, .9, null, null, null], [5406, -4470, 1, 1.1, null, null, null], [5352, -3964, 3, .9, null, null, null], [5309, -3665, 1, 1.1, null, null, null], [5247, -3464, 4, .9, -.5, null, null], [5300, -3121, 1, .9, null, null, null], [3524, -3340, 1, 1.1, 0, null, null], [3661, -3589, 2, .9, -.7, null, null], [7236, -1376, 2, .6, -.3, null, null], [7624, -1610, 2, .8, null, null, null], [7403, -1555, 2, .7, null, null, null], [7514, -1568, 2, .9, 0, null, null], [3660, -2705, 1, .9, .2, null, null], [3374, -2813, 2, .8, null, null, null], [7347, -1447, 1, .9, .1, null, null], [7236, -775, 4, .5, -.9, null, null], [7207, -631, 2, .9, 0, null, null], [7303, -468, 1, .9, -.3, null, null], [7262, -1263, 4, .9, -.6, null, null], [7404, -350, 2, 1, .6, null, null], [7589, -305, 3, .9, .6, null, null], [7741, -1589, 4, 1, .2, null, null], [7949, -1594, 1, 1, -.2, null, null], [8152, -1599, 2, 1.1, .1, null, null], [8378, -1602, 4, 1.2, 0, null, null], [7873, -321, 2, .6, .3, null, null], [8543, -1661, 1, .7, 0, null, null], [7790, -259, 1, 1, .1, null, null], [8675, -1573, 2, 1, .1, null, null], [8163, -245, 2, .7, .3, null, null], [8329, -311, 2, .7, .5, null, null], [8275, -229, 1, 1, .1, null, null], [8447, -277, 3, 1, 0, null, null], [8824, -1447, 1, .9, -.4, null, null], [7221, -1140, 1, .5, -.2, null, null], [8924, -1273, 2, .9, -.5, null, null], [6844, -950, 3, 1, .1, null, null], [8949, -1060, 3, 1.1, -.3, null, null], [8904, -920, 4, .8, -.7, null, null], [8582, -338, 2, .7, null, null, null], [8963, -803, 1, 1, -.4, null, null], [8680, -322, 4, .9, 0, null, null], [8811, -449, 1, .9, -.3, null, null], [8910, -610, 2, .9, -.4, null, null], [6855, 114, 1, .8, null, null, null], [6971, 241, 2, 1, -.1, null, null], [6852, 656, 2, .5, .3, null, null], [6980, 706, 1, .9, -.4, null, null], [6946, 939, 4, 1, -.2, null, null], [6027, -560, 1, .6, 0, null, null], [7521, 425, 2, .4, .1, null, null], [7599, 389, 1, .5, -.5, null, null], [5863, -431, 2, .9, .1, null, null], [9392, 262, 2, .9, -.1, null, null], [7521, 512, 3, .6, null, null, null], [9807, 1027, 1, .5, -.1, null, null], [9554, 237, 1, 1, -.2, 1, null], [9346, 392, 4, 1.2, -.3, null, null], [9789, 1142, 3, .7, null, null, null], [9747, -532, 4, .8, .2, 1, null], [8591, 347, 4, .6, -.2, null, null], [9951, -509, 1, 1, null, null, null], [9308, 2417, 1, .5, .1, null, null], [10185, -522, 2, .9, null, 1, null], [10330, 2147, 1, .6, 0, null, null], [9350, 2480, 3, .7, null, null, null], [10503, 2124, 2, .9, null, null, null], [12500, 2628, 4, .5, .3, null, null], [13188, 2864, 4, .5, -.1, null, null], [12637, 2659, 2, .7, .1, null, null], [13262, 2899, 1, .5, null, null, null], [13777, 5168, 1, .5, -.3, null, null], [15709, 6399, 1, .4, null, null, null], [13539, 5664, 3, .5, null, 1, null], [15660, 6474, 2, .4, -.3, null, null], [13743, 5248, 2, .7, -.1, null, null], [15482, 6600, 2, .4, -.1, null, null], [15591, 6525, 4, .3, null, null, null], [13487, 5738, 4, .7, null, null, null], [15407, 6702, 1, .6, .1, null, null], [8171, -2568, 2, .5, .1, null, null], [16001, 6015, 3, .6, null, null, null], [16017, 6110, 1, .4, null, 1, null], [6496, -1491, 1, .5, .3, null, null], [6626, -1480, 2, .7, null, null, null], [6190, -1022, 4, .8, null, null, null], [8325, -2615, 2, 1, -.3, null, null], [8222, -2412, 4, 1, null, null, null], [9204, -2288, 1, .9, -.1, null, null], [9279, -2216, 2, 1, null, null, null], [10375, -1558, 2, .8, -.3, null, null], [10309, -1421, 1, .9, null, null, null], [10247, -1216, 4, 1.2, -.5, null, null], [10079, -2310, 4, .9, .3, null, null], [10320, -2330, 3, 1, null, null, null], [10942, -2963, 2, .9, -.3, null, null], [10807, -2778, 4, 1.1, -.5, null, null], [12989, -1929, 3, .6, null, null, null], [12613, -1181, 1, .4, 0, 1, null], [12559, -1120, 2, .5, null, null, null], [11642, -1900, 4, .7, -.5, null, null], [11558, -1692, 1, .9, -.2, null, null], [11509, -1479, 2, .5, null, null, null], [12559, -2673, 1, .8, null, null, null], [12446, -2487, 4, 1, -.5, null, null], [12375, -2303, 3, .9, -.2, null, null], [10363, -3514, 4, .7, -.4, null, null], [10290, -3340, 1, .9, -.2, null, null], [10162, -3207, 2, .7, null, null, null], [9003, -3048, 4, .9, -.1, null, null], [9161, -3119, 1, .6, null, null, null], [14550, -3462, 2, .9, -.2, null, null], [14407, -3335, 4, .9, -.2, null, null], [14366, -4493, 2, .9, .5, null, null], [14477, -4437, 3, 1, null, null, null], [15305, -4230, 4, .9, .1, null, null], [15481, -4283, 2, .9, null, null, null], [15349, -5009, 4, .4, .3, null, null], [11874, -4879, 2, .6, null, null, null], [15453, -4984, 1, .7, null, null, null], [11907, -4742, 4, .8, -.6, null, null], [12440, -4278, 4, .5, .3, null, null], [11980, -4582, 2, .9, null, null, null], [12131, -4387, 1, 1.1, null, null, null], [15681, -4973, 4, 1, null, null, null], [12591, -4252, 1, .8, null, null, null], [12777, -4244, 2, .9, .2, null, null], [12969, -4227, 3, .9, null, null, null], [15897, -5071, 2, .9, -.2, null, null], [13204, -4228, 4, 1, null, null, null], [11592, -5261, 1, .7, .2, null, null], [12743, -4826, 1, .4, .3, null, null], [10102, -5078, 2, .7, .4, null, null], [12854, -4782, 3, .9, .1, null, null], [10191, -5033, 1, .7, null, null, null], [10523, -5133, 2, 1, null, null, null], [10336, -4977, 4, 1.1, -.3, null, null], [10667, -5250, 2, .8, -.1, null, null], [9665, -6403, 4, .7, .3, null, null], [10798, -5379, 1, .5, null, null, null], [9670, -5547, 1, .9, -.1, null, null], [9834, -6369, 3, 1, null, null, null], [9864, -5572, 2, 1.1, -.1, null, null], [11362, -3957, 2, .9, null, 1, null], [11162, -3830, 4, 1, -.1, null, null], [8922, -6173, 4, 1, null, null, null], [9003, -5368, 1, .5, null, null, null], [8453, -6153, 1, .6, .2, null, null], [8954, -5229, 3, .9, -.2, null, null], [8905, -5072, 1, .8, -.3, null, null], [8704, -3873, 3, .9, null, null, null], [8578, -6105, 2, .8, .4, null, null], [8508, -3710, 1, .7, 0, null, null], [8614, -5400, 4, .5, null, null, null], [8788, -4922, 4, 1.1, null, null, null], [8936, -3905, 4, .6, .3, null, null], [9701, -4613, 4, .9, -.1, null, null], [6973, -4776, 2, .6, null, null, null], [7016, -4674, 1, .9, null, null, null], [9124, -3853, 1, .9, .2, null, null], [7253, -4648, 4, .8, .2, null, null], [6602, -4591, 1, .6, .2, null, null], [8510, -5322, 2, .9, null, null, null], [6687, -3810, 4, .7, .3, null, null], [9525, -4492, 3, 1.1, null, null, null], [7461, -4705, 2, .9, null, null, null], [9280, -3812, 2, .8, -.3, null, null], [6467, -2811, 1, .3, null, null, null], [6842, -3820, 1, .8, .3, null, null], [6483, -2725, 4, .6, .3, null, null], [7675, -4864, 1, 1.1, null, null, null], [6991, -2885, 4, .9, .2, null, null], [6610, -2664, 4, .9, null, null, null], [6822, -2736, 2, .9, null, null, null], [6763, -4582, 3, .9, null, null, null], [6509, -2490, 2, .9, -.3, null, null], [7216, -3865, 4, 1.1, .2, 1, null], [7018, -3708, 2, 1, .2, null, null], [2254, -3301, 1, .8, .5, null, null], [6378, -2310, 1, .8, .2, null, null], [7197, -2857, 2, .9, null, null, null], [2609, -3483, 4, .5, null, null, null], [2449, -3385, 2, .9, .3, 1, null], [4585, -2889, 4, .7, -.2, null, null], [4470, -2768, 3, .8, .2, null, null], [4083, -4033, 1, .9, .5, 1, null], [1568, -2869, 1, .4, null, null, null], [4336, -4105, 2, 1.2, null, null, null], [1977, -1678, 2, .5, null, null, null], [1412, -3642, 1, .5, 0, 1, null], [1570, -2792, 4, .6, null, null, null], [1932, -1586, 1, .6, null, null, null], [1310, -3547, 2, .6, 0, null, null], [3611, 1391, 2, 1, null, null, null], [3558, 2174, 2, .9, null, null, null], [3431, 1563, 1, .9, .3, null, null], [3142, 2813, 2, .7, null, null, null], [3330, 2296, 4, 1.1, null, null, null], [3001, 2818, 1, .6, .3, null, null], [3703, 2044, 1, .4, null, null, null], [2872, 3863, 1, .9, -.2, null, null], [3125, 2942, 3, 1.1, null, null, null], [2841, 4018, 4, 1.1, .1, null, null], [2402, 5140, 4, .6, .3, null, null], [2511, 5167, 3, .8, null, null, null], [-14607, -5112, 4, .9, .1, null, null], [-14430, -5180, 1, .9, 0, null, null], [-14197, -5222, 2, 1.2, -.1, null, null], [-14895, -4703, 4, .5, .2, null, null], [-14797, -4728, 2, .4, null, null, null], [-14697, -4739, 1, .4, null, null, null], [-13919, -5281, 1, 1.1, 0, null, null], [-13646, -5170, 3, .7, null, null, null], [-13400, -5068, 2, 1.2, .2, null, null], [-13099, -5108, 4, 1.1, .2, null, null], [-12824, -5092, 1, .9, null, null, null], [-12631, -5044, 2, .9, -.2, null, null], [-12427, -4914, 1, .9, null, null, null], [-12270, -4816, 2, .7, -.3, null, null], [-11772, -4983, 2, .7, 0, null, null], [-11940, -4867, 1, .9, null, null, null], [-12091, -4699, 3, .9, null, null, null], [-12270, -4529, 4, .7, null, null, null], [-12460, -4396, 1, .9, .4, null, null], [-13058, -4252, 1, .9, null, null, null], [-12894, -4096, 4, .7, .2, null, null], [-12738, -4077, 2, .7, null, null, null], [-13546, -4341, 1, .4, null, null, null], [-13428, -4299, 3, .9, null, null, null], [-14679, -4192, 1, .7, -.1, null, null], [-14368, -4308, 4, .7, -.2, null, null], [-14495, -4133, 2, 1.1, -.1, null, null], [-12072, -3824, 2, .8, -.1, null, null], [-11904, -3648, 1, 1, 0, null, null], [-11654, -3569, 3, .7, null, null, null], [-11648, -3357, 4, .9, 0, null, null], [-11420, -3359, 1, .9, null, null, null], [-11296, -3135, 2, .7, null, null, null], [-10782, -2838, 1, .8, -.1, null, null], [-11410, -3039, 1, .3, .6, null, null], [-10581, -2773, 2, 1.1, .1, null, null], [-11118, -5114, 4, .8, .2, null, null], [-10675, -5079, 1, .9, null, null, null], [-10205, -4890, 1, .8, .1, null, null], [-11543, -4164, 4, .8, .3, null, null], [-11287, -4244, 2, .5, null, null, null], [-10018, -4747, 2, 1, -.2, null, null], [-9278, 419, 3, .5, null, null, null], [-9341, 470, 4, .5, .3, null, null], [-9180, 496, 1, .8, .6, null, null], [-11365, -4131, 3, 1, null, null, null], [-9353, 0, 3, .6, .3, null, null], [-8975, 528, 2, 1, .1, null, null], [-9413, 89, 4, .9, null, null, null], [-8230, 770, 1, .4, null, null, null], [-9231, 17, 1, .7, 0, null, null], [-6808, 1667, 3, .5, -.2, null, null], [-6694, 1622, 2, .8, -.4, null, null], [-8285, 855, 3, .6, null, null, null], [-6793, 1796, 2, .8, .4, null, null], [-6865, 1935, 1, .5, -.1, null, null], [-7043, 2222, 3, .6, -.2, null, null], [-7083, 2368, 1, .6, -.2, null, null], [-7103, 2533, 4, .7, -.4, null, null], [-7099, 2721, 2, .8, -.3, null, null], [-7178, 2874, 1, .4, null, null, null], [-6964, 3110, 4, .7, .2, null, null], [-6246, 4191, 1, .6, -.1, null, null], [-6735, 3446, 1, .4, .1, null, null], [-6722, 3537, 4, .7, .4, null, null], [-6396, 3388, 4, .9, null, null, null], [-6787, 3140, 2, .9, null, null, null], [-6227, 4488, 2, .7, -.5, null, null], [-6281, 3953, 1, .6, .2, null, null], [-6530, 3576, 1, 1.1, null, null, null], [-6147, 3994, 3, 1.1, null, null, null], [-6141, 4292, 2, 1.2, -.3, null, null], [-6377, 5578, 2, .7, -.5, null, null], [-6152, 4569, 1, .9, -.2, null, null], [-6222, 4769, 4, .7, -.5, null, null], [-6266, 4956, 1, .6, -.2, null, null], [-6233, 5414, 1, .9, -.4, null, null], [-6347, 5646, 3, .7, -.1, 1, null], [-6400, 6066, 2, .7, -.2, null, null], [-6411, 6261, 1, .8, null, null, null], [-6565, 7043, 1, .6, -.3, null, null], [-6377, 6415, 4, .9, -.3, null, null], [-6440, 6614, 1, .7, -.2, null, null], [-5944, 1954, 3, .5, -.4, null, null], [-6001, 2039, 1, .8, .2, null, null], [-6467, 7070, 3, .9, null, null, null], [-4963, 3608, 1, .6, -.3, 1, null], [-4776, 3510, 2, .4, -.1, 1, null], [-5785, 1998, 2, 1.1, -.2, null, null], [-3708, 3449, 1, .6, -.3, null, null], [-3790, 3582, 1, .9, null, null, null], [-4031, 3697, 4, .7, -.1, null, null], [-4859, 3634, 3, 1, null, null, null], [-3850, 3730, 2, 1, .2, null, null], [-4689, 4605, 4, .9, -.2, null, null], [-3492, 2892, 1, .6, -.2, null, null], [-4507, 4483, 1, .6, null, null, null], [-4829, 2745, 1, .9, -.2, null, null], [-4435, 4273, 2, .9, -.6, null, null], [-3383, 2930, 2, .9, null, null, null], [-4888, 2821, 2, .9, .1, null, null], [-5372, 5172, 1, .5, null, null, null], [-5036, 2981, 4, .9, .3, null, null], [-9895, -1942, 1, 1, .1, null, null], [-9371, -2159, 4, .6, null, null, null], [-9995, -1773, 4, .9, -.5, null, null], [-5280, 5218, 4, .9, 0, null, null], [-5079, 5183, 1, .9, -.3, null, null], [-5149, 3079, 1, .6, .2, null, null], [-9695, -2048, 2, 1, -.1, null, null], [-5063, 5374, 2, .9, -.2, null, null], [-9504, -2059, 1, 1, .2, null, null], [-8948, -2140, 4, .7, .3, null, null], [-9262, -2081, 2, 1.1, .4, null, null], [-9068, -2071, 4, 1, .2, null, null], [-8861, -2045, 2, 1.1, 0, null, null], [-8654, -2083, 1, 1, .3, null, null], [-8473, -2048, 3, 1, 0, null, null], [-8283, -1965, 1, 1, .5, null, null], [-8182, -1863, 2, .9, -.2, null, null], [-10037, -1579, 1, .9, -.4, null, null], [-10063, -1365, 2, .9, -.1, null, null], [-10074, -1190, 1, .9, -.4, null, null], [-8167, -1225, 1, .5, -.7, null, null], [-8188, -1087, 4, .8, -.5, null, null], [-9975, -1022, 1, .9, .3, null, null], [-9835, -910, 2, 1, .1, null, null], [-9709, -848, 4, 1, .3, null, null], [-9532, -792, 2, 1, .1, null, null], [-9348, -779, 1, 1, 0, null, null], [-9131, -784, 2, 1.1, .1, null, null], [-8754, -795, 3, .7, null, null, null], [-8587, -797, 4, 1, 0, null, null], [-8424, -856, 1, .9, null, null, null], [-8246, -921, 2, .9, -.4, null, null], [-8153, -1701, 4, .7, -.7, null, null], [-6447, -2137, 1, .6, -.2, null, null], [-8153, -1591, 1, .5, -.6, null, null], [-7694, -1393, 4, 1, -.1, null, null], [-6541, -2030, 2, .7, null, null, null], [-7135, -1547, 2, .7, .1, null, null], [-5885, -2958, 1, .6, .3, null, null], [-7171, -1440, 1, .8, -.2, null, null], [-5620, -3123, 2, .6, -.4, null, null], [-6631, -1866, 4, .8, null, null, null], [-5882, -3696, 2, .8, -.4, null, null], [-5716, -2944, 3, .9, null, null, null], [-5949, -3528, 1, .5, -.1, null, null], [-6869, -4052, 4, .8, null, null, null], [-7081, -2673, 3, .5, null, null, null], [-6725, -4069, 1, .6, -.2, null, null], [-10487, -2295, 2, .5, .1, 1, null], [-7032, -2749, 2, .6, -.4, null, null], [-10769, -3817, 3, .6, -.2, null, null], [-6607, -4081, 2, .5, null, null, null], [-10849, -1824, 1, .7, .1, null, null], [-10479, -2146, 4, .9, -.1, null, null], [-7003, -2611, 4, .9, -.2, null, null], [-10749, -1511, 2, .6, -.4, null, null], [-10697, -1953, 2, 1, .1, null, null], [-10848, -1330, 3, .9, null, null, null], [-10912, -1220, 4, .5, 0, null, null], [-9843, -2685, 4, .7, null, null, null], [-10823, -3717, 2, .7, null, null, null], [-9697, -2713, 1, .6, .3, null, null], [-10080, -3431, 2, .4, null, null, null], [-10648, -3844, 1, .9, null, null, null], [-9530, -2695, 2, 1, null, null, null], [-2387, -6791, 1, .9, null, null, null], [-8465, -5037, 2, .7, null, null, null], [-2550, -6627, 2, .9, -.1, null, null], [-9325, -2822, 1, .7, -.1, null, null], [-10140, -3346, 1, .8, null, null, null], [-8461, -4908, 4, .9, null, null, null], [8116, -1076, 2, .8, -.3, null, null], [8115, -940, 4, .8, -.3, null, null], [-2503, -6359, 4, 1.4, -.6, null, null], [-9062, -1580, 2, .8, -.5, null, null], [8120, -790, 1, .8, null, null, null], [-9065, -1444, 4, .8, -.3, null, null], [-2615, -6159, 1, 1, null, null, null], [-2744, -5943, 2, 1.1, null, null, null], [-3713, -4955, 3, .9, null, null, null], [-9061, -1292, 1, .8, 0, null, null], [-1551, -4718, 4, .5, null, null, null], [5251, -6249, 1, .5, null, 1, null], [5192, -6181, 2, .4, -.1, null, null], [-2898, -5732, 3, .9, null, null, null], [-1705, -4629, 3, .8, null, null, null], [1618, -7035, 1, .5, null, null, null], [-3829, -4776, 4, .9, null, null, null], [-2851, -5589, 4, 1.1, -.2, null, null], [-2974, -5399, 2, 1.1, null, null, null], [-3952, -4568, 1, .9, null, null, null], [-4135, -4368, 2, 1.1, .1, 1, null], [-3428, -5104, 1, 1.1, null, null, null], [-3167, -5254, 4, .9, .1, null, null], [-3049, -6916, 2, 1, null, null, null], [-3097, -6722, 1, .9, -.3, null, null], [-3190, -6493, 3, 1, null, null, null], [-3318, -6284, 4, 1.1, null, null, null], [-4672, -5861, 1, 1.1, 1, null, null], [-4480, -5668, 1, 1, null, null, null], [-4294, -5548, 2, .9, 1.1, null, null], [-3433, -6072, 1, 1, -.2, null, null], [-3568, -5881, 3, 1, null, null, null], [-3736, -5698, 2, 1.2, null, null, null], [-3978, -7517, 3, .9, .1, null, null], [-3956, -5572, 4, 1, null, null, null], [-4103, -5400, 1, 1, null, null, null], [-4281, -5240, 2, 1, null, null, null], [-4409, -5034, 3, 1, null, null, null], [-4475, -4808, 4, .9, null, null, null], [-2777, -7546, 3, 1, .8, null, null], [-2542, -7502, 2, .9, .4, null, null], [-2398, -7364, 1, .9, -.7, null, null], [-2350, -7151, 2, .9, -.4, null, null], [-2315, -6976, 4, .8, -.8, null, null], [-3749, -7488, 4, 1, null, null, null], [-2995, -7596, 2, 1.2, .5, null, null], [-3253, -7558, 3, 1.1, .3, null, null], [-3468, -7472, 4, 1, null, null, null], [-5028, -6473, 2, 1, .4, null, null], [-3604, -7301, 1, 1.1, null, null, null], [-3678, -7078, 2, 1.1, null, null, null], [-3835, -6826, 3, 1.1, null, null, null], [-3935, -6595, 2, 1, null, null, null], [-5214, -7381, 3, 1, null, null, null], [-4065, -6416, 3, 1.1, null, null, null], [-4174, -6231, 4, .7, null, null, null], [-4556, -6940, 3, 1, null, null, null], [-4663, -6781, 4, 1, null, null, null], [-4748, -6548, 2, 1.3, null, null, null], [-4847, -6257, 2, 1.1, -.4, null, null], [-4806, -6016, 4, .9, 1.2, null, null], [-4950, -7410, 1, 1.4, .2, null, null], [-5470, -7251, 4, 1.3, -.2, null, null], [-5637, -7038, 2, 1, -.3, null, null], [-5593, -6819, 4, 1, null, null, null], [-5406, -6727, 3, 1, .6, null, null], [-5263, -6580, 1, 1, .4, null, null], [-4636, -7476, 2, 1, .2, null, null], [-4399, -7496, 2, .9, -.2, null, null], [-6769, -7571, 2, .9, -.4, null, null], [-6853, -7377, 1, .9, null, null, null], [-8273, -7231, 4, .5, .4, null, null], [-4182, -7512, 4, .9, .1, null, null], [-7525, -5855, 2, .9, null, null, null], [-7495, -6329, 3, .5, null, null, null], [-7297, -6946, 2, .9, null, null, null], [-8148, -7137, 1, .7, null, null, null], [-7030, -7301, 4, .7, null, null, null]],
    walls: [[1009, -2308, 108], [1241, -2490, 60], [1157, -2379, 84], [622, -2126, 48], [669, -2187, 72], [-392, -1669, 132], [-273, -1746, 60], [-252, -1504, 120], [1553, -2016, 48], [1637, -1972, 60], [1736, -1922, 60], [2150, -2406, 72], [2238, -2318, 108], [2364, -2391, 72], [2491, -2682, 72], [2596, -2671, 108], [-150, -3147, 48], [-155, -3044, 84], [-427, -3600, 48], [-259, -2982, 60], [-379, -3529, 72], [-665, -3052, 60], [20, -1816, 60], [127, -1799, 60], [263, -2572, 48], [405, -2570, 108], [851, -4183, 120], [754, -3971, 108], [1757, -5065, 132], [1169, -4453, 108], [2054, -5244, 108], [1631, -4901, 108], [2305, -5281, 108], [1007, -4281, 96], [2766, -5202, 96], [2927, -5204, 84], [3206, -5218, 36], [3099, -5193, 72], [1417, -4726, 120], [2844, -1513, 60], [3206, -1464, 120], [2881, -1403, 108], [3804, -2025, 84], [4116, -1778, 108], [3715, -1508, 72], [4247, -1126, 72], [3860, 268, 60], [4334, -1011, 132], [3849, 349, 72], [3956, 490, 96], [4073, 667, 108], [3583, -864, 96], [4135, 836, 120], [4785, -743, 120], [4993, -839, 108], [5224, -482, 84], [5235, -1238, 132], [5419, -1346, 72], [6075, -5099, 96], [5767, -4953, 108], [5896, -4967, 108], [5384, -4642, 108], [5704, -4857, 108], [5563, -4697, 108], [5406, -4470, 132], [5352, -3964, 108], [5309, -3665, 132], [5247, -3464, 108], [5300, -3121, 108], [3524, -3340, 132], [3661, -3589, 108], [7236, -1376, 72], [7624, -1610, 96], [7403, -1555, 84], [7514, -1568, 108], [3660, -2705, 108], [3374, -2813, 96], [7347, -1447, 108], [7236, -775, 60], [7207, -631, 108], [7303, -468, 108], [7262, -1263, 108], [7404, -350, 120], [7589, -305, 108], [7741, -1589, 120], [7949, -1594, 120], [8152, -1599, 132], [8378, -1602, 144], [7873, -321, 72], [8543, -1661, 84], [7790, -259, 120], [8675, -1573, 120], [8163, -245, 84], [8329, -311, 84], [8275, -229, 120], [8447, -277, 120], [8824, -1447, 108], [7221, -1140, 60], [8924, -1273, 108], [6844, -950, 120], [8949, -1060, 132], [8904, -920, 96], [8582, -338, 84], [8963, -803, 120], [8680, -322, 108], [8811, -449, 108], [8910, -610, 108], [6855, 114, 96], [6971, 241, 120], [6852, 656, 60], [6980, 706, 108], [6946, 939, 120], [6027, -560, 72], [7521, 425, 48], [7599, 389, 60], [5863, -431, 108], [9392, 262, 108], [7521, 512, 72], [9807, 1027, 60], [9554, 237, 120], [9346, 392, 144], [9789, 1142, 84], [9747, -532, 96], [8591, 347, 72], [9951, -509, 120], [9308, 2417, 60], [10185, -522, 108], [10330, 2147, 72], [9350, 2480, 84], [10503, 2124, 108], [12500, 2628, 60], [13188, 2864, 60], [12637, 2659, 84], [13262, 2899, 60], [13777, 5168, 60], [15709, 6399, 48], [13539, 5664, 60], [15660, 6474, 48], [13743, 5248, 84], [15482, 6600, 48], [15591, 6525, 36], [13487, 5738, 84], [15407, 6702, 72], [8171, -2568, 60], [16001, 6015, 72], [16017, 6110, 48], [6496, -1491, 60], [6626, -1480, 84], [6190, -1022, 96], [8325, -2615, 120], [8222, -2412, 120], [9204, -2288, 108], [9279, -2216, 120], [10375, -1558, 96], [10309, -1421, 108], [10247, -1216, 144], [10079, -2310, 108], [10320, -2330, 120], [10942, -2963, 108], [10807, -2778, 132], [12989, -1929, 72], [12613, -1181, 48], [12559, -1120, 60], [11642, -1900, 84], [11558, -1692, 108], [11509, -1479, 60], [12559, -2673, 96], [12446, -2487, 120], [12375, -2303, 108], [10363, -3514, 84], [10290, -3340, 108], [10162, -3207, 84], [9003, -3048, 108], [9161, -3119, 72], [14550, -3462, 108], [14407, -3335, 108], [14366, -4493, 108], [14477, -4437, 120], [15305, -4230, 108], [15481, -4283, 108], [15349, -5009, 48], [11874, -4879, 72], [15453, -4984, 84], [11907, -4742, 96], [12440, -4278, 60], [11980, -4582, 108], [12131, -4387, 132], [15681, -4973, 120], [12591, -4252, 96], [12777, -4244, 108], [12969, -4227, 108], [15897, -5071, 108], [13204, -4228, 120], [11592, -5261, 84], [12743, -4826, 48], [10102, -5078, 84], [12854, -4782, 108], [10191, -5033, 84], [10523, -5133, 120], [10336, -4977, 132], [10667, -5250, 96], [9665, -6403, 84], [10798, -5379, 60], [9670, -5547, 108], [9834, -6369, 120], [9864, -5572, 132], [11362, -3957, 108], [11162, -3830, 120], [8922, -6173, 120], [9003, -5368, 60], [8453, -6153, 72], [8954, -5229, 108], [8905, -5072, 96], [8704, -3873, 108], [8578, -6105, 96], [8508, -3710, 84], [8614, -5400, 60], [8788, -4922, 132], [8936, -3905, 72], [9701, -4613, 108], [6973, -4776, 72], [7016, -4674, 108], [9124, -3853, 108], [7253, -4648, 96], [6602, -4591, 72], [8510, -5322, 108], [6687, -3810, 84], [9525, -4492, 132], [7461, -4705, 108], [9280, -3812, 96], [6467, -2811, 36], [6842, -3820, 96], [6483, -2725, 72], [7675, -4864, 132], [6991, -2885, 108], [6610, -2664, 108], [6822, -2736, 108], [6763, -4582, 108], [6509, -2490, 108], [7216, -3865, 132], [7018, -3708, 120], [2254, -3301, 96], [6378, -2310, 96], [7197, -2857, 108], [2609, -3483, 60], [2449, -3385, 108], [4585, -2889, 84], [4470, -2768, 96], [4083, -4033, 108], [1568, -2869, 48], [4336, -4105, 144], [1977, -1678, 60], [1412, -3642, 60], [1570, -2792, 72], [1932, -1586, 72], [1310, -3547, 72], [3611, 1391, 120], [3558, 2174, 108], [3431, 1563, 108], [3142, 2813, 84], [3330, 2296, 132], [3001, 2818, 72], [3703, 2044, 48], [2872, 3863, 108], [3125, 2942, 132], [2841, 4018, 132], [2402, 5140, 72], [2511, 5167, 96], [-14607, -5112, 108], [-14430, -5180, 108], [-14197, -5222, 144], [-14895, -4703, 60], [-14797, -4728, 48], [-14697, -4739, 48], [-13919, -5281, 132], [-13646, -5170, 84], [-13400, -5068, 144], [-13099, -5108, 132], [-12824, -5092, 108], [-12631, -5044, 108], [-12427, -4914, 108], [-12270, -4816, 84], [-11772, -4983, 84], [-11940, -4867, 108], [-12091, -4699, 108], [-12270, -4529, 84], [-12460, -4396, 108], [-13058, -4252, 108], [-12894, -4096, 84], [-12738, -4077, 84], [-13546, -4341, 48], [-13428, -4299, 108], [-14679, -4192, 84], [-14368, -4308, 84], [-14495, -4133, 132], [-12072, -3824, 96], [-11904, -3648, 120], [-11654, -3569, 84], [-11648, -3357, 108], [-11420, -3359, 108], [-11296, -3135, 84], [-10782, -2838, 96], [-11410, -3039, 36], [-10581, -2773, 132], [-11118, -5114, 96], [-10675, -5079, 108], [-10205, -4890, 96], [-11543, -4164, 96], [-11287, -4244, 60], [-10018, -4747, 120], [-9278, 419, 60], [-9341, 470, 60], [-9180, 496, 96], [-11365, -4131, 120], [-9353, 0, 72], [-8975, 528, 120], [-9413, 89, 108], [-8230, 770, 48], [-9231, 17, 84], [-6808, 1667, 60], [-6694, 1622, 96], [-8285, 855, 72], [-6793, 1796, 96], [-6865, 1935, 60], [-7043, 2222, 72], [-7083, 2368, 72], [-7103, 2533, 84], [-7099, 2721, 96], [-7178, 2874, 48], [-6964, 3110, 84], [-6246, 4191, 72], [-6735, 3446, 48], [-6722, 3537, 84], [-6396, 3388, 108], [-6787, 3140, 108], [-6227, 4488, 84], [-6281, 3953, 72], [-6530, 3576, 132], [-6147, 3994, 132], [-6141, 4292, 144], [-6377, 5578, 84], [-6152, 4569, 108], [-6222, 4769, 84], [-6266, 4956, 72], [-6233, 5414, 108], [-6347, 5646, 84], [-6400, 6066, 84], [-6411, 6261, 96], [-6565, 7043, 72], [-6377, 6415, 108], [-6440, 6614, 84], [-5944, 1954, 60], [-6001, 2039, 96], [-6467, 7070, 108], [-4963, 3608, 72], [-4776, 3510, 48], [-5785, 1998, 132], [-3708, 3449, 72], [-3790, 3582, 108], [-4031, 3697, 84], [-4859, 3634, 120], [-3850, 3730, 120], [-4689, 4605, 108], [-3492, 2892, 72], [-4507, 4483, 72], [-4829, 2745, 108], [-4435, 4273, 108], [-3383, 2930, 108], [-4888, 2821, 108], [-5372, 5172, 60], [-5036, 2981, 108], [-9895, -1942, 120], [-9371, -2159, 72], [-9995, -1773, 108], [-5280, 5218, 108], [-5079, 5183, 108], [-5149, 3079, 72], [-9695, -2048, 120], [-5063, 5374, 108], [-9504, -2059, 120], [-8948, -2140, 84], [-9262, -2081, 132], [-9068, -2071, 120], [-8861, -2045, 132], [-8654, -2083, 120], [-8473, -2048, 120], [-8283, -1965, 120], [-8182, -1863, 108], [-10037, -1579, 108], [-10063, -1365, 108], [-10074, -1190, 108], [-8167, -1225, 60], [-8188, -1087, 96], [-9975, -1022, 108], [-9835, -910, 120], [-9709, -848, 120], [-9532, -792, 120], [-9348, -779, 120], [-9131, -784, 132], [-8754, -795, 84], [-8587, -797, 120], [-8424, -856, 108], [-8246, -921, 108], [-8153, -1701, 84], [-6447, -2137, 72], [-8153, -1591, 60], [-7694, -1393, 120], [-6541, -2030, 84], [-7135, -1547, 84], [-5885, -2958, 72], [-7171, -1440, 96], [-5620, -3123, 72], [-6631, -1866, 96], [-5882, -3696, 96], [-5716, -2944, 108], [-5949, -3528, 60], [-6869, -4052, 96], [-7081, -2673, 60], [-6725, -4069, 72], [-10487, -2295, 60], [-7032, -2749, 72], [-10769, -3817, 72], [-6607, -4081, 60], [-10849, -1824, 84], [-10479, -2146, 108], [-7003, -2611, 108], [-10749, -1511, 72], [-10697, -1953, 120], [-10848, -1330, 108], [-10912, -1220, 60], [-9843, -2685, 84], [-10823, -3717, 84], [-9697, -2713, 72], [-10080, -3431, 48], [-10648, -3844, 108], [-9530, -2695, 120], [-2387, -6791, 108], [-8465, -5037, 84], [-2550, -6627, 108], [-9325, -2822, 84], [-10140, -3346, 96], [-8461, -4908, 108], [8116, -1076, 96], [8115, -940, 96], [-2503, -6359, 168], [-9062, -1580, 96], [8120, -790, 96], [-9065, -1444, 96], [-2615, -6159, 120], [-2744, -5943, 132], [-3713, -4955, 108], [-9061, -1292, 96], [-1551, -4718, 60], [5251, -6249, 60], [5192, -6181, 48], [-2898, -5732, 108], [-1705, -4629, 96], [1618, -7035, 60], [-3829, -4776, 108], [-2851, -5589, 132], [-2974, -5399, 132], [-3952, -4568, 108], [-4135, -4368, 132], [-3428, -5104, 132], [-3167, -5254, 108], [-3049, -6916, 120], [-3097, -6722, 108], [-3190, -6493, 120], [-3318, -6284, 132], [-4672, -5861, 132], [-4480, -5668, 120], [-4294, -5548, 108], [-3433, -6072, 120], [-3568, -5881, 120], [-3736, -5698, 144], [-3978, -7517, 108], [-3956, -5572, 120], [-4103, -5400, 120], [-4281, -5240, 120], [-4409, -5034, 120], [-4475, -4808, 108], [-2777, -7546, 120], [-2542, -7502, 108], [-2398, -7364, 108], [-2350, -7151, 108], [-2315, -6976, 96], [-3749, -7488, 120], [-2995, -7596, 144], [-3253, -7558, 132], [-3468, -7472, 120], [-5028, -6473, 120], [-3604, -7301, 132], [-3678, -7078, 132], [-3835, -6826, 132], [-3935, -6595, 120], [-5214, -7381, 120], [-4065, -6416, 132], [-4174, -6231, 84], [-4556, -6940, 120], [-4663, -6781, 120], [-4748, -6548, 156], [-4847, -6257, 132], [-4806, -6016, 108], [-4950, -7410, 168], [-5470, -7251, 156], [-5637, -7038, 120], [-5593, -6819, 120], [-5406, -6727, 120], [-5263, -6580, 120], [-4636, -7476, 120], [-4399, -7496, 108], [-6769, -7571, 108], [-6853, -7377, 108], [-8273, -7231, 60], [-4182, -7512, 108], [-7525, -5855, 108], [-7495, -6329, 60], [-7297, -6946, 108], [-8148, -7137, 84], [-7030, -7301, 84]],
    groundDoodads: [[-9670, -1470, "doodadField", .5, 0, null, null], [8600, -940, "doodadField", .5, 0, null, null], [920, -2800, "doodadField", .5, 0, null, null]],
    debug: {
        show: true,
        collisions: false
    },
    mobile: false,
    ios: false,
    phone: false,
    tablet: false,
    mouse: false,
    resolution: 1,
    overdrawOptimize: true,
    overdraw: 256,
    scalingFactor: 2500,
    minimapPaddingX: 16,
    minimapPaddingY: 16,
    minimapSize: 240,
    maxChatLines: 50,
    maxScoreboard: 8,
    shadowScaling: 2,
    shadowOffsetX: 20,
    shadowOffsetY: 40,
    ackFrequency: 10,
    bucketSize: 512,
    mapWidth: 32768,
    mapHeight: 16384
};

window.Tools = {};
window.Textures = {};
window.Graphics = {};
window.Network = {};
window.Input = {};
window.Players = {};
window.Mobs = {};
window.Particles = {};
window.UI = {};
window.Games = {};
window.Sound = {};

var scheduleFrame = function(fractionalFramesSinceLastFrame, skipGraphicsRendering) {
    Tools.updateTime(fractionalFramesSinceLastFrame);
    Tools.debugStartFrame();
    if (game.state == Network.STATE.PLAYING) { 
        Input.update();
        Network.detectConnectivity();
        Players.update();
        Mobs.update();
        Particles.update();
        Games.update();
        Sound.update();
    } else if (game.state == Network.STATE.LOGIN) {
        Tools.updateReel();
    } else {
        Sound.update();
    }
    Graphics.update();
    if (!skipGraphicsRendering) {
        Graphics.render();
    }
    Tools.debugEndFrame();
};

var scheduleOccasionalFrameWhileBlurred = function() {
    var msSinceLastFrame = performance.now() - game.time;
    msSinceLastFrame > 450 && !game.focus && scheduleFrame(msSinceLastFrame / 16.666, true)
};

$(function() {
    game.state = Network.STATE.LOGIN,
    Tools.startupMsg(),
    Tools.loadSettings(),
    Tools.detectCapabilities(),
    Tools.setupDebug(),
    Graphics.setup(),
    Tools.initBuckets(),
    Particles.setup(),
    UI.setup(),
    Input.setup(),
    Games.setup(),
    Sound.setup();
    var ticker = new PIXI.ticker.Ticker;
    ticker.add(scheduleFrame),
    ticker.start(),
    setInterval(scheduleOccasionalFrameWhileBlurred, 500);

    let customServerHashPrefix = '#connect#'
    if (DEVELOPMENT && window.location.hash.startsWith(customServerHashPrefix))
    {
        game.playRegion = "custom";
        game.playRoom = "custom";
        game.playInvited = true;
        game.myOriginalName = config.settings.name || Tools.randomID(6);
        game.customServerUrl = window.location.hash.substr(customServerHashPrefix.length);
        Games.start(game.myOriginalName, true);
    }
});
